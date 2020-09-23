<template>
  <div id="app">
    <Navbar :pros="pros"></Navbar>
    <router-view></router-view>
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
    };
  },
};
</script>

<style>
</style>
