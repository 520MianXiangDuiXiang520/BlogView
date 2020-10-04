<template>
  <div id="app">
    <Navbar :pros="pros"></Navbar>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "app",
  components: {
    Navbar,
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
      serverIP: "http://127.0.0.1:8080/",
      // serverIP: "http://39.106.168.39:8888/"
    };
  },
  provide() {
    return {
      openMessage: this.openMessage,
      getExactTime: this.getExactTime,
      reload: this.reload,
      serverIP: this.serverIP,
      sleep: this.sleep
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.login = false;
      this.$nextTick(function () {
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
      var dates = date.getDate() + " ";
      var hour = date.getHours() + ":";
      var min = date.getMinutes() + ":";
      var second = date.getSeconds();
      return year + month + dates + hour + min + second;
    },
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
  },
};
</script>

<style>
</style>
