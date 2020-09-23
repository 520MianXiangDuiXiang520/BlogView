<template>
  <div class="my-table">
    <h1>Friend chain operation</h1>
    <div class="addFri">
      <el-button type="success" round @click="dialogVisible = true">添加</el-button>
    </div>

    <!-- <el-table :data="tableData" style="width: 100%"> -->
    <el-table :data="friends" style="width: 100%">
      <el-table-column label="缩略图" width="180">
        <template slot-scope="scope">
          <el-avatar size="medium" :src="scope.row.imgLink"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="站点名称" width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.siteName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="链接" width="180">
        <template slot-scope="scope">
          <a :href="scope.row.link" target="blank">{{ scope.row.link }}</a>
        </template>
      </el-table-column>
      <el-table-column label="简介" width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.intro }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="180"
        :filters="[{ text: '待通过', value: 1 }, { text: '已通过', value: 2 }, { text: '已拒绝', value: 3 }]"
        :filter-method="filterStatus"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status == 1">待通过</p>
          <p v-else-if="scope.row.status == 2">已通过</p>
          <p v-else-if="scope.row.status == 3">已拒绝</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status != 2" @click="online(scope.row.id)">上线</el-button>
          <el-button size="mini" v-else @click="offline(scope.row.id)">下线</el-button>
          <el-button size="mini" type="danger" @click="deleteFriend(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加友链" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="newFriend" label-width="80px">
        <el-form-item label="站点名称*">
          <el-input v-model="newFriend.siteName"></el-input>
        </el-form-item>
        <el-form-item label="站点链接*">
          <el-input v-model="newFriend.siteLink"></el-input>
        </el-form-item>
        <el-form-item label="图标链接">
          <el-input v-model="newFriend.imgLink"></el-input>
        </el-form-item>
        <el-form-item label="站点简介">
          <el-input v-model="newFriend.intro"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewFriend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Friendship",
  data() {
    return {
      friends: [],
      dialogVisible: false,
      newFriend: {
        siteName: "",
        siteLink: "",
        imgLink: "",
        intro: "",
      },
    };
  },
  inject: ["reload"],
  methods: {
    addNewFriend() {
      let self = this;
      this.dialogVisible = false;
      if (this.newFriend.siteName == "" || this.newFriend.siteLink == "") {
        this.openMessage("请填写站点名称和站点链接", "warning");
      } else {
        this.axios({
          method: "post",
          url: "http://localhost:8080/api/friendship/application",
          data: {
            siteName: self.newFriend.siteName,
            siteLink: self.newFriend.siteLink,
            imgLink: self.newFriend.imgLink,
            intro: self.newFriend.intro,
          },
        })
          .then(function (response) {
            if (response.data["header"]["code"] != 200) {
              self.openMessage(
                "啊！出错了(" + response["header"]["code"] + ")",
                "warning"
              );
            } else {
              self.openMessage("已添加，请手动上线", "success");
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
      }
    },
    openMessage(msg, type) {
      this.$message({
        message: msg,
        type: type,
      });
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    // 上线
    online(id) {
      let self = this;
      this.axios({
        method: "post",
        url: "http://localhost:8080/api/friendship/approval",
        data: {
          id: id,
          result: 2,
        },
      })
        .then(function (response) {
          if (response.data["header"]["code"] != 200) {
            self.openMessage(
              "啊！出错了(" + response["header"]["code"] + ")",
              "warning"
            );
          } else {
            self.openMessage("已上线", "success");
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
    // 下线
    offline(id) {
      let self = this;
      this.axios({
        method: "post",
        url: "http://localhost:8080/api/friendship/approval",
        data: {
          id: id,
          result: 3,
        },
      })
        .then(function (response) {
          if (response.data["header"]["code"] != 200) {
            self.openMessage(
              "啊！出错了(" + response["header"]["code"] + ")",
              "warning"
            );
          } else {
            self.openMessage("已下线", "success");
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
    // 请求正常展示的友链列表
    getFriendList() {
      let self = this;
      this.axios({
        method: "post",
        url: "http://localhost:8080/api/friendship/list",
        data: {},
      })
        .then(function (response) {
          if (response.data["header"]["code"] != 200) {
            self.openMessage(
              "啊！出错了(" + response["header"]["code"] + ")",
              "warning"
            );
          } else {
            self.friends = response.data["friendShipList"];
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

    // 请求不展示的友链列表
    getUnShowList() {
      let self = this;
      this.axios({
        method: "post",
        url: "http://localhost:8080/api/friendship/unshow",
        data: {},
      })
        .then(function (response) {
          if (response.data["header"]["code"] != 200) {
            self.openMessage(
              "啊！出错了(" + response["header"]["code"] + ")",
              "warning"
            );
          } else {
            for (let i = 0; i < response.data["friendShipList"].length; i++) {
              self.friends.push(response.data["friendShipList"][i]);
            }
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

    // 删除友链
    deleteFriend(id) {
      let self = this;
      this.axios({
        method: "post",
        url: "http://localhost:8080/api/friendship/delete",
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
            self.openMessage("已删除", "success");
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
  mounted() {
    this.getFriendList();
    this.getUnShowList();
  },
};
</script>

<style scoped>
.addFri {
  float: right;
  margin-right: 50px;
}
.my-table {
  text-align: center;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>