<template>
  <div class="mynav">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu v-for="pro in pros" :key="pro.id" :index="'' + pro.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{pro.name}}</span>
            </template>
            <el-menu-item-group v-if="pro.hasChild">
              <el-menu-item :index="'' + child.id" v-for="child in pro.children" :key="child.id">
                <a :href="'#' + child.href">{{child.name}}</a>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Navs",
  props: {
    pros: Array,
    stand: Number,
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.mynav{
  height: 100%;
}
</style>