<template>
  <div>
    <div class="title">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input
            placeholder="请输入文章标题"
            v-model="title"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="success"
            size="medium"
            class="button"
            @click="getTags()"
            >提交</el-button
          >
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="发布文章"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
    >
      <div class="choiseTag">
        <el-row :gutter="20">
          <el-col :span="4">
            <span>文章标签</span>
          </el-col>
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col
                :span="4"
                v-for="(tag, index) in choiseTags"
                :key="'has' + tag.id"
              >
                <div
                  class="grid-content bg-purple tag"
                  @click="deleteTag(index)"
                >
                  <el-tag>{{ tag.name }}</el-tag>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <hr />
      <div class="choiseTag">
        <el-row :gutter="20">
          <el-col :span="4">
            <span>选择标签</span>
          </el-col>
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col
                :span="4"
                v-for="(tag, index) in tags"
                :key="'choise' + index"
              >
                <div
                  @click="choiseTag(index)"
                  class="grid-content bg-purple tag"
                >
                  <el-tag>{{ tag.name }}</el-tag>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <hr />
      <div class="newTag">
        <el-row :gutter="20">
          <el-col :span="4">
            <span>新建标签</span>
          </el-col>
          <el-col :span="16">
            <el-input
              placeholder="请输入标签名"
              v-model="newTag"
              clearable
            ></el-input>
          </el-col>

          <el-col :span="4">
            <el-button type="success" size="medium" @click="newTag"
              >确定</el-button
            >
          </el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="release()">确 定</el-button>
      </span>
    </el-dialog>

    <div class="mavonEditor">
      <mavon-editor
        :toolbars="markdownOption"
        v-model="handbook"
        toolbarsBackground="#8f8f8f"
        :scrollStyle="scrollStyle"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  inject: ["reload", "serverIP"],
  data: () => {
    return {
      markdownOption: {
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      handbook: "", // 博客内容
      scrollStyle: true, // 滚动
      title: "", // 文章标题
      centerDialogVisible: false, // 提交模态窗展示
      newTag: "", // 新建的Tag
      tags: [], // 已有的全部 Tag
      tagsTotal: 0, // 已有的 tag 数
      choiseTags: [], // 本文的 Tag
      choiseTagsID: [], // 已选择的 Tag ID, 用于请求
    };
  },
  methods: {
    addTag() {
      let self = this;
      this.axios({
        method: "post",
        url: self.serverIP + "api/tag/add",
        data: {
          name: self.newTag,
        },
      })
        .then(function (response) {
          if (response.data["header"]["code"] == 401) {
            self.openMessage("登录失效， 请重新登录", "warning");
            // 未登录或登录凭证失效， 删除本地 Token
            self.$cookie.delete("SESSIONID");
            self.$router.push("/login");
            self.reload();
          }
          if (response.data["header"]["code"] == 200) {
            self.openMessage("新建成功", "success");
            self.reload();
          } else {
            self.openMessage(
              "发生错误啦！code = " + response.data["header"]["code"],
              "success"
            );
            self.reload();
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            self.openMessage("登录失效， 请重新登录", "warning");
            self.$cookie.delete("SESSIONID");
            self.$router.push("/login");
            self.reload();
          } else {
            self.openMessage(
              "[ " + error.response.status + " ] 发生错误啦！",
              "warning"
            );
          }
        });
    },
    openMessage(msg, type) {
      this.$message({
        message: msg,
        type: type,
      });
    },
    // 删除标签
    deleteTag(index) {
      let t = this.choiseTags.splice(index, 1)[0];
      this.choiseTagsID.splice(index, 1);
      this.tags.push(t);
    },
    // 获取文章详情
    getDetail() {
      let self = this;
      this.axios({
        method: "post",
        url: self.serverIP + "api/article/detail",
        data: {
          articleId: parseInt(self.$route.params.id),
        },
      })
        .then(function (response) {
          self.handbook = response.data["text"];
          self.title = response.data["title"];
        })
        .catch((error) => {
          self.openMessage(
            "[ " + error.response.status + " ] 获取文章详情失败！",
            "warning"
          );
        });
    },
    // 获取本文 tags
    getArticleTags() {
      let self = this;
      this.axios({
        method: "post",
        url: self.serverIP + "api/article/tags",
        data: {
          articleID: parseInt(self.$route.params.id),
        },
      })
        .then(function (response) {
          self.choiseTags = response.data["tags"];
          for (let i = 0; i < response.data["tags"].length; i++) {
            self.choiseTagsID[i] = response.data["tags"][i].id;
          }
        })
        .catch((error) => {
          self.openMessage(
            "[ " + error.response.status + " ] 获取文章标签失败！",
            "warning"
          );
        });
    },
    // 提交更新
    release() {
      let self = this;
      this.axios({
        method: "post",
        url: self.serverIP + "api/article/update",
        data: {
          title: this.title,
          text: this.handbook,
          tags: this.choiseTagsID,
          id: parseInt(self.$route.params.id),
        },
      })
        .then(function (response) {
          if (response.data["header"]["code"] == 401) {
            // 未登录或登录凭证失效， 删除本地 Token
            self.openMessage("登录已失效， 请重新登录！", "warning");
            self.$cookie.delete("SESSIONID");
            self.$router.push("/login");
          }
          if (response.data["header"]["code"] == 200) {
            self.openMessage("更新成功", "success");
            self.reload();
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            self.openMessage("登录已失效， 请重新登录！", "warning");
            self.$cookie.delete("SESSIONID");
            self.$router.push("/login");
            self.reload();
          }
        });
    },
    // 获取所有标签
    getTags() {
      this.centerDialogVisible = true;
      let self = this;
      this.axios({
        method: "post",
        url: self.serverIP + "api/tag/list",
        data: {},
      })
        .then(function (response) {
          self.tags = response.data["tags"];
          self.tagsTotal = response.data["total"];

          for (let i = 0; i < self.tags.length; i++) {
            for (let j = 0; j < self.choiseTags.length; j++) {
              if (self.tags[i].id == self.choiseTags[j].id) {
                self.tags.splice(j, 1);
                break;
              }
            }
          }
        })
        .catch((error) => {
          self.openMessage(
            "[ " + error.response.status + " ] 获取标签列表失败！",
            "warning"
          );
        });
    },
    choiseTag(index) {
      this.choiseTags.push(this.tags[index]);
      this.choiseTagsID.push(this.tags[index].id);
      this.tags.splice(index, 1);
    },
  },
  mounted() {
    this.getDetail();
    this.getArticleTags();
  },
};
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
.title {
  padding-bottom: 20px;
}
.button {
  padding-left: 36px;
  padding-right: 36px;
}
.tag {
  margin-bottom: 10px;
}
</style>