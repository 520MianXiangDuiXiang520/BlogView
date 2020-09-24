<template>
  <div class="article-list">
    <div v-for="article in articleInfo" :key="article.id">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="title">
              <el-link
                class="title-font"
                type="primary"
                :href="routeURL + article.id"
                >{{ article.title }}</el-link
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="abstract">
              <span>{{ article.abstract }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="another">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="ctime">{{ getExactTime(article.createTime) }}</p>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="grid-content bg-purple">
                    <span class="tag" v-for="tag in article.tags" :key="tag.id">
                      <el-divider direction="vertical"></el-divider>
                      {{ tag.name }}
                    </span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" plain @click="openDelete(article.id)">删除</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <hr class="line" />
      <!-- <el-divider></el-divider> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  inject: ["getExactTime"],
  data: () => {
    return {
      routeURL: "/detail/",
    };
  },
  props: {
    articleInfo: Array,
  },
  methods: {
    openDelete(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteArticle(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消!",
          });
        });
    },
    deleteArticle(id) {
      let self = this;

      this.axios({
        method: "post",
        url: "http://localhost:8080/api/article/delete",
        data: {
          id: id,
        },
      })
        .then(function (response) {
          if (response.data["header"]["code"] != 200) {
            self.openMessage(
              "啊！出错了(" + response["header"]["code"] + ")",
              "warning"
            );
          } else {
            self.$message({
            type: 'success',
            message: '删除成功!'
          });
            self.reload();
          }
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            self.$cookie.delete("SESSIONID");
            self.$router.push("/login");
            self.reload();
          }
        });
    },
  },
};
</script>

<style scoped>
.line {
  margin-top: 3px;
  margin-bottom: 6px;
}
.tag {
  float: left;
  font-size: 14px;
  color: #767677;
}
.ctime {
  float: left;
  font-size: 14px;
  color: #767677;
}
.title {
  float: left;
  color: #303133;
  margin-bottom: 5px;
  margin-top: 23px;
}
.title-font {
  font-size: 18px;
}
.abstract {
  float: left;
  text-align: left;
  color: #303133;
  font-size: 15px;
  margin-bottom: 10px;
}
.another {
  float: left;
  width: 100%;
}
.article-list {
  margin-top: 50px;
  margin-left: 20%;
  margin-right: 20%;
}
</style>