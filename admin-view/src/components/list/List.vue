<template>
  <div id="app">
    <article-list v-bind:articleInfo="articleInfo" />
    <split :total="articleTotal" :pageSize="pageSize" />
  </div>
</template>

<script>
import ArticleList from "./ArticleList.vue";
import Split from "../Split.vue";
import storage from "good-storage";

export default {
  name: "List",
  data: () => {
    return {
      articleInfo: [],
      articleTotal: 0,
      pageSize: 5,
    };
  },
  components: {
    ArticleList,
    Split,
  },
  watch: {
    $route() {
      this.updateList(this);
    },
  },
  mounted() {
    this.updateList(this);
    // 每秒检查一次缓存是否过期
    this.timer = setInterval(this.clearCacheTimer, 1000);
  },
  methods: {
    updateList: (self) => {
      let intPage = parseInt(self.$route.params.page);
      let cacheKey = "articleList:" + intPage;
      let MaxCacheQueueLen = 10; // 最大缓存页数
      let cacheQueue = [];
      if (storage.has(cacheKey) && storage.has("articleTotal")) {
        self.articleInfo = storage.get(cacheKey);
        self.articleTotal = storage.get("articleTotal");
        console.log(
          "[ Note ] This data comes from the local cache and may be different from the actual data. " +
            "If you want to pull the latest data from the server again, please clean up the Local Cache."
        );
      } else {
        self
          .axios({
            method: "post",
            url: "http://localhost:8080/api/article/list",
            data: {
              page: parseInt(self.$route.params.page),
              pageSize: self.pageSize,
            },
          })
          .then(function (response) {
            // LRLU
            if (storage.has("cacheQueue")) {
              cacheQueue = storage.get("cacheQueue");
            } else {
              storage.clear();
            }

            if (cacheQueue.length >= MaxCacheQueueLen) {
              let removePage = cacheQueue.shift();
              console.log(cacheQueue);
              storage.remove("articleList:" + removePage);
              cacheQueue.push(parseInt(self.$route.params.page));
            } else {
              cacheQueue.push(intPage);
            }
            storage.set("cacheQueue", cacheQueue);
            storage.set(cacheKey, response.data["articleList"]);
            storage.set("articleTotal", response.data["total"]);
            storage.set("timer", new Date().getTime());
            self.articleTotal = response.data["total"];
            self.articleInfo = response.data["articleList"];
          });
      }
    },

    // 定时清理 localcache
    clearCacheTimer: () => {
      // 30s 没动作就清空缓存
      let timeout = 1000 * 30
      if(new Date().getTime() - storage.get("timer") - timeout >= 0){
            storage.clear();
        }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4a4b4d;
}
</style>
