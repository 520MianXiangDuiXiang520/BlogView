<template>
  <el-row>
    <el-dialog title="您的信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="80px">
        <el-form-item label="邮箱*">
          <el-input v-model="newTalk.email"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="newTalk.username"></el-input>
        </el-form-item>
        <!-- <el-form-item label="站点链接">
          <el-input v-model="newTalk.siteLink"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>

        <el-button type="primary" @click="addTalk">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="您的信息" :visible.sync="dialogFormVisible2">
      <el-form ref="form" label-width="80px">
        <el-form-item label="邮箱*">
          <el-input v-model="newTalk.email"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="newTalk.username"></el-input>
        </el-form-item>
        <!-- <el-form-item label="站点链接">
          <el-input v-model="newTalk.siteLink"></el-input>
        </el-form-item> -->
      </el-form>
      <el-input
        type="textarea"
        class="input"
        placeholder="请输入内容"
        v-model="newTalk.talk"
        maxlength="255"
        show-word-limit
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>

        <el-button type="primary" @click="addTalk">确 定</el-button>
      </div>
    </el-dialog>
    <el-col class="head" :span="24">
      <el-link type="primary" class="title">评论</el-link>
    </el-col>
    <el-link type="primary" class="reply" @click="dialogFormVisible = true"
      >评论</el-link
    >
    <el-link type="primary" class="reply">清空</el-link>
    <el-input
      type="textarea"
      class="input"
      placeholder="请输入内容"
      v-model="newTalk.talk"
      maxlength="255"
      show-word-limit
    >
    </el-input>
    <el-col
      class="talk"
      :span="24"
      v-for="i in talks"
      :key="i.id"
      :id="'talk' + i.id"
    >
      <el-row>
        <el-col :span="2">
          <div>
            <el-avatar class="img"> {{ i.username[0] }} </el-avatar>
          </div>
        </el-col>
        <el-col :span="22">
          <el-row>
            <el-col :span="24">
              <el-link type="primary" class="author" v-if="i.type == 1">{{
                i.username
              }}</el-link>
              <el-link
                type="primary"
                class="author"
                v-else
                @click="jump('talk' + i.pTalkID)"
                >{{ i.username }} 回复 {{ getParentName(i.pTalkID) }}</el-link
              >
              <p class="time">{{ getExactTime(i.createTime) }}</p>
              <el-link
                type="primary"
                class="reply"
                @click="appendTalk(i.id)"
                >回复</el-link
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p class="text">
                {{ i.text }}
              </p></el-col
            >
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-link type="primary" v-if="hasNext" @click="getMore">加载更多</el-link>
  </el-row>
</template>

<script>
export default {
  name: "Talking",
  data() {
    return {
      talks: [],
      page: 1,
      pageSize: 10,
      hasNext: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      newTalk: {
        email: "",
        username: "",
        siteLink: "",
        talk: "",
        pTalkID: 0,
        type: 1,
      },
    };
  },
  inject: ["reload", "serverIP", "getExactTime", "sleep", "openMessage"],
  methods: {
    appendTalk(pTalkID) {
        console.log(pTalkID)
      this.dialogFormVisible2 = true;
      this.newTalk.pTalkID = pTalkID;
      this.newTalk.type = 2;
    },
    addTalk() {
      let self = this;
      if (this.newTalk.email == "" || this.newTalk.talk == "") {
        self.openMessage("您需要输入评论和正确的邮箱", "warning");
        return;
      }
      this.axios({
        method: "post",
        url: self.serverIP + "api/talking/add",
        data: {
          articleID: parseInt(self.$route.params.id),
          text: self.newTalk.talk,
          username: self.newTalk.username,
          email: self.newTalk.email,
          type: self.newTalk.type,
          pTalkID: self.newTalk.pTalkID,
        },
      }).then(function (response) {
        if (response.data["header"] != null) {
          if (response.data["header"]["code"] == 200) {
            self.openMessage("评论成功", "success");
          }
        } else {
        self.openMessage("评论失败[" + response.data["code"] + "]", "warning");
        }



        self.dialogFormVisible = false;
        self.reload();
      });
      this.newTalk.pTalkID = 0;
      this.newTalk.type = 1;
    },
    jump(id) {
      let doc = document.getElementById(id);
      doc.scrollIntoView();
      window.scrollBy(0, -100);
    },
    getParentName(pID) {
      for (let i = 0; i < this.talks.length; i++) {
        if (this.talks[i]["id"] == pID) {
          return this.talks[i]["username"];
        }
      }
    },
    getMore() {
      this.page++;
      this.getTalks();
    },
    getTalks() {
      let self = this;
      this.axios({
        method: "post",
        url: self.serverIP + "api/talking/list",
        data: {
          articleID: parseInt(self.$route.params.id),
          page: self.page,
          pageSize: self.pageSize,
        },
      }).then(function (response) {
        self.talks = self.talks.concat(response.data["talks"]);
        self.hasNext = response.data["hasNext"];
      });
    },
  },
  mounted() {
    this.getTalks();
  },
};
</script>

<style scoped>
.title {
  font-size: 20px;
  float: left;
}
.input {
  margin-top: 5px;
  margin-bottom: 20px;
}
.shareTalk {
  background-color: #aaaa;
}
.img {
  float: left;
}
.author {
  float: left;
}
.text {
  float: left;
  text-align: left;
}
.reply {
  float: right;
  margin-right: 40px;
}
.time {
  float: left;
  margin-left: 10px;
  font-size: 15px;
  color: #767677;
  margin-bottom: 2px;
}
.talk {
  margin: 10px;
  float: left;
}
</style>