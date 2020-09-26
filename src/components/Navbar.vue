<template>
  <!-- <nav class="navbar sticky-top navbar-light bg-light">
    <div class="container">
      <router-link
        class="navbar-txt"
        v-for="pro in pros"
        :key="pro.id"
        v-bind:to="pro.href"
      >{{pro.name}}</router-link>
    </div>
  </nav>-->
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Juneblog</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-for="pro in pros" :key="pro.id">
          <a class="nav-link" v-bind:to="pro.href" :href="'#' + pro.href">{{pro.name}}</a>
        </li>
      </ul>
      <!-- <span class="navbar-text">Navbar text with an inline element</span> -->
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    pros: Array,
  },
};
</script>

<style scoped>
.navbar-txt {
  font-size: 22px;
  color: #000;
}
.navbar {
  z-index: 2000;
  /* -webkit-box-shadow: 0px 3px 3px #c8c8c8;
  -moz-box-shadow: 0px 3px 3px #c8c8c8;
  box-shadow: 0px 3px 3px #c8c8c8; */
}
</style>