<template>
  <div id="app">
    <el-container>
      <el-header class="paddingZero" style="padding:0"><Navbar :pros="pros"></Navbar></el-header>
      <el-main class="paddingZero" style="padding:0;height:auto; min-height:600px;"><router-view v-if="isRouterAlive"></router-view></el-main>
      <el-footer class="paddingZero" style="padding:0; buttom:0px"><Buttom></Buttom></el-footer>
    </el-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Buttom from "./components/Bottom.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Buttom,
  },
  data() {
    return {
      pros: [
        {
          id: 0,
          name: "首页",
          href: "/",
        },
        {
          id: 1,
          name: "友链",
          href: "/friend",
        },
        {
          id: 2,
          name: "标签",
          href: "/tag",
        },
      ],
      isRouterAlive: true,
      // serverIP: "http://127.0.0.1:8080/",
      serverIP: "https://junebao.top:8888/",
    };
  },
  provide() {
    return {
      openMessage: this.openMessage,
      getExactTime: this.getExactTime,
      reload: this.reload,
      serverIP: this.serverIP,
      sleep: this.sleep,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.login = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    openMessage(msg, type) {
      this.$notify({
        title: "提示",
        message: msg,
        type: type,
      });
    },
    getExactTime(time) {
      // var date = new Date(time);
      var date = new Date(time * 1000);
      var year = date.getFullYear() + "-";
      var month =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";

      var dates =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";

      var hour =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";

      var min =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";

      var second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return year + month + dates + hour + min + second;
    },
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
  },
};
</script>

<style scoped>
.paddingZero{
  padding: 0;
}
</style>
