<template>
  <div id="app">
    <el-container>
      <el-header class="paddingZero" style="padding:0"
        ><Navbar :pros="pros"></Navbar
      ></el-header>
      <el-main
        class="paddingZero"
        style="padding:0;height:auto; min-height:600px;"
        ><router-view v-if="isRouterAlive"></router-view
      ></el-main>
      <el-footer class="paddingZero" style="padding:0; buttom:0px"
        ><Buttom></Buttom
      ></el-footer>
    </el-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Buttom from "./components/Bottom.vue";
import { getLunar } from "chinese-lunar-calendar";

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

    // colored egg

    color_egg() {
      let date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m == 1 && d == 1) {
        document.getElementsByTagName("title")[0].innerText = "元旦快乐";
        return;
      }

      if (m == 5 && d == 1) {
        document.getElementsByTagName("title")[0].innerText =
          "不要说我们一无所有,我们要做天下的主人!";
        return;
      }

      if (m == 5 && d == 4) {
        document.getElementsByTagName("title")[0].innerText =
          "这世界是你们的，但终将是我们的!";
        return;
      }

      if (m == 10 && d == 1) {
        let n = date.getFullYear() - 1949;
        document.getElementsByTagName("title")[0].innerText =
          "热烈庆祝中华人民共和国成立" + n + "周年！";
        return;
      }

      if (m == 12 && d == 13) {
        document.getElementsByTagName("title")[0].innerText =
          "祀我国殇,山河无恙";
        document.getElementsByTagName("body")[0].style.filter = "grayscale(1)";
        return;
      }
      let ldate = getLunar(date.getFullYear(), m, d);
      let lm = ldate.lunarMonth;
      let ld = ldate.lunarDate;

      if (lm == 1 && ld == 15) {
        document.getElementsByTagName("title")[0].innerText =
          "今年元夜时，月与灯依旧";
        return;
      }

      if (lm == 3 && ld == 5) {
        document.getElementsByTagName("title")[0].innerText =
          "燕子来时新社,梨花落后清明";
        return;
      }

      if (lm == 5 && ld == 5) {
        document.getElementsByTagName("title")[0].innerText =
          "碧艾香蒲处处忙。谁家儿共女，庆端阳";
        return;
      }

      if (lm == 12 && ld == 30) {
        document.getElementsByTagName("title")[0].innerText =
          "千门万户曈曈日，总把新桃换旧符";
        return;
      }


      console.log(
        `

       ___      ___          ___          ___          ___         ___  ___          ___     
      /\\  \\    /\\__\\        /\\__\\        /\\  \\        /\\  \\       /\\__\\/\\  \\        /\\  \\    
      \\:\\  \\  /:/  /       /::|  |      /::\\  \\      /::\\  \\     /:/  /::\\  \\      /::\\  \\   
  ___ /::\\__\\/:/  /       /:|:|  |     /:/\\:\\  \\    /:/\\:\\  \\   /:/  /:/\\:\\  \\    /:/\\:\\  \\  
 /\\  /:/\\/__/:/  /  ___  /:/|:|  |__  /::\\~\\:\\  \\  /::\\~\\:\\__\\ /:/  /:/  \\:\\  \\  /:/  \\:\\  \\ 
 \\:\\/:/  / /:/__/  /\\__\\/:/ |:| /\\__\\/:/\\:\\ \\:\\__\\/:/\\:\\ \\:|__/:/__/:/__/ \\:\\__\\/:/__/_\\:\\__\\
  \\::/  /  \\:\\  \\ /:/  /\\/__|:|/:/  /\\:\\~\\:\\ \\/__/\\:\\~\\:\\/:/  |:\\  \\:\\  \\ /:/  /\\:\\  /\\ \\/__/
   \\/__/    \\:\\  /:/  /     |:/:/  /  \\:\\ \\:\\__\\   \\:\\ \\::/  / \\:\\  \\:\\  /:/  /  \\:\\ \\:\\__\\  
             \\:\\/:/  /      |::/  /    \\:\\ \\/__/    \\:\\/:/  /   \\:\\  \\:\\/:/  /    \\:\\/:/  /  
              \\::/  /       /:/  /      \\:\\__\\       \\::/__/     \\:\\__\\::/  /      \\::/  /   
               \\/__/        \\/__/        \\/__/        ~~          \\/__/\\/__/        \\/__/    

        `
      );

      console.log(
        "\n \n今天是 " +
          date.getFullYear() +
          " 年 " +
          m +
          " 月 " +
          d +
          " 日 \n\n农历 " +
          ldate.lunarYear +
          ldate.dateStr
      );
    },
  },
  mounted() {
    this.color_egg();
  },
};
</script>

<style scoped>
.paddingZero {
  padding: 0;
}
</style>
