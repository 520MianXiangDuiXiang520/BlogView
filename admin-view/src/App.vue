<template>
  <div id="app" class="page">
    <div class="logined" v-if="login">
      <el-container>
        <el-aside width="200px">
          <Navs :pros="pros"></Navs>
        </el-aside>
        <el-container>
          <el-main class="main">
            <div class="navbar-brand">
              <nav class="navbar fixed-top navbar-light bg-light my-top">
                <div class="container">
                  <div class="col col-lg-6"></div>
                  <div class="col col-lg-2">
                    <div class="container">
                      <div class="col col-lg-4">
                        <el-link
                          type="info"
                          v-if="user.permiter == 1"
                          @click="openRight('提示', '您正在使用游客账号登录， 所有操作将不会被保存！', 'warning')"
                          class="userinfo"
                        >{{user.username}}</el-link>
                        <el-link
                          type="info"
                          v-else-if="user.permiter == 2"
                          @click="openRight('提示', '您正在以管理员账号登录！', 'success')"
                          class="userinfo"
                        >{{user.username}}</el-link>
                      </div>
                      <div class="col col-lg-4">
                        <el-link type="danger" class="userinfo" @click="logout">登出</el-link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <router-view class="route" v-if="isRouterAlive"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div class="unlogin" v-else>
      <Login></Login>
    </div>
  </div>
</template>

<script>
import Navs from "./components/Navs.vue";
import Login from "./components/login/login.vue";

export default {
  name: "App",
  components: {
    Navs,
    Login,
  },
  provide() {
    return {
      reload: this.reload,
      getExactTime: this.getExactTime,
    };
  },
  data: () => {
    return {
      pros: [
        {
          id: 1,
          name: "文章管理",
          hasChild: true,
          children: [
            {
              id: 10,
              name: "文章列表",
              href: "/list",
            },
            {
              id: 11,
              name: "新建文章",
              href: "/newArticle",
            },
            {
              id: 12,
              name: "文章数据",
              href: "/newArticle",
            },
          ],
        },
        {
          id: 2,
          name: "友链操作",
          hasChild: true,
          children: [
            {
              id: 20,
              name: "添加友链",
              href: "/friendship",
            },
          ],
        },
        {
          id: 3,
          name: "标签管理",
          hasChild: true,
          children: [
            {
              id: 20,
              name: "标签管理",
              href: "/tag",
            },
          ],
        },
      ],
      login: false,
      isRouterAlive: true,
      user: {
        username: "",
        id: 0,
        permiter: 0,
      },
    };
  },
  mounted() {
    let token = this.$cookie.get("SESSIONID");
    this._data.login = token != null && token != "";
    this.getUserInfo();
  },
  methods: {
        getExactTime(time) {
      // var date = new Date(time);
      var date = new Date(time * 1000);
      var year = date.getFullYear() + "-";
      var month =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var dates = date.getDate() + " ";
      var hour = date.getHours() + ":";
      var min = date.getMinutes() + ":";
      var second = date.getSeconds();
      return year + month + dates + hour + min + second;
    },
    openRight(title, msg, type) {
      this.$notify({
        title: title,
        message: msg,
        type: type,
      });
    },
    openMessage(msg, type) {
      this.$message({
        message: msg,
        type: type,
      });
    },
    reload() {
      this.isRouterAlive = false;
      this.login = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
        let token = this.$cookie.get("SESSIONID");
        this.login = token != null && token != "";
      });
    },
    getUserInfo() {
      let self = this;
      this.axios({
        method: "post",
        url: "http://localhost:8080/api/auth/info",
        data: {},
      })
        .then(function (response) {
          if (response.data["header"]["code"] == 401) {
            // 未登录或登录凭证失效， 删除本地 Token
            self.openMessage("登录已失效， 请重新登录！", "warning");
            self.$cookie.delete("SESSIONID");
            self.$router.push("/login");
            self.reload();
          }
          self.user.username = response.data["username"];
          self.user.id = response.data["id"];
          self.user.permiter = response.data["permiter"];
          self.reload();
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
    logout() {
      let self = this;
      this.axios({
        method: "post",
        url: "http://localhost:8080/api/auth/logout",
        data: {},
      }).then(function () {
        self.$cookie.delete("SESSIONID");
        self.$router.push("/login");
        self.reload();
      });
    },
  },
};
</script>

<style>
.userinfo {
  padding-right: 8px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.route {
  margin-top: 70px;
}
.main {
  padding: 0;
}
.my-top {
  margin-left: 200px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.nav {
  float: left;
}
</style>
