<template>
  <div
    class="bottom"
    style="
    background-color: #F2F6FC;
"
  >
    <div
      class="bottomInner"
      style="
    margin-left: 50px;
    margin-right: 50px;
"
    >
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="column" style="margin-top:75px">
            <el-row :gutter="20">
              <el-col :span="6"
                ><div class="grid-content bg-purple">
                  <el-link
                    href="https://github.com/520MianXiangDuiXiang520"
                    type="info"
                    >GitHub</el-link
                  >
                </div></el-col
              >
              <el-col :span="6">
                <el-link
                  href="https://blog.csdn.net/zjbyough"
                  type="info"
                  >CSDN</el-link
                >
                <div class="grid-content bg-purple"></div
              ></el-col>
              <el-col :span="6">
                <el-link
                  href="mailto:15364968962@163.com"
                  type="info"
                  >Email</el-link
                >
                <div class="grid-content bg-purple"></div
              ></el-col>
              <el-col :span="6">
                <el-link
                  href="https://www.zhihu.com/people/mian-xiang-dui-xiang-class"
                  type="info"
                  >知乎</el-link
                >
                <div class="grid-content bg-purple"></div
              ></el-col>
            </el-row></div
        ></el-col>

        <el-col :span="12"
          ><div class="column" style="font-size:14px; margin-top:50px">
            <el-link href="https://beian.miit.gov.cn" type="info"
              >陇ICP备20000438号</el-link
            >
            
            <br />
            <el-link href="https://github.com/520MianXiangDuiXiang520/JuneGoBlog" type="info">本项目已在GitHub开源，点击查看源码 </el-link>
            <br />
            <el-link type="info">© 2019-{{ year }} JuneBao | Power By Gin, Vue, Element </el-link>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="column">
            <img class="weixin" src="../assets/weixin.png" alt="" />
            <p>微信扫一扫，在移动端浏览</p>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: 2021,
    };
  },
  methods: {
    getYear() {
      var date = new Date();
      this.year = date.getFullYear();
    },
  },
  mounted() {
    this.getYear();
  },
};
</script>

<style scoped>
.buttom {
  background-color: #ebeef5;
}
.buttomInner {
  margin-left: 50px;
  margin-right: 50px;
}
.weixin {
  height: 120px;
  width: 120px;
}
.column {
  width: 100%;
}
</style>
