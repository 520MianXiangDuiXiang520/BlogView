<template>
  <div id="app">
    <article-list v-if="articleInfo.length > 0" v-bind:articleInfo="articleInfo" />
    <div v-else class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <split :total="articleTotal" :pageSize="pageSize" :tagID="tagID" />
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
      pageSize: 10,
      fullscreenLoading: true,
      tagID: 0,
    };
  },
  components: {
    ArticleList,
    Split,
  },
  watch: {
    $route() {
      this.updateList();
    },
  },
  mounted() {
    this.updateList();
    // 每秒检查一次缓存是否过期
    this.timer = setInterval(this.clearCacheTimer, 1000);
  },
  inject: ["serverIP"],
  methods: {
    removeArticleCache() {
      let all = storage.getAll();
      for (let key in all) {
        if(key.slice(0, 12) == 'articleList:') {
          storage.remove(key)
        }
      }
    },
    updateList() {
      let self = this;
      self.articleInfo = [];
      self.fullscreenLoading = true;
      let intPage = parseInt(self.$route.params.page);
      self.tagID = parseInt(self.$route.params.tag);
      let cacheKey = "articleList:" + intPage;
      // 最大缓存页数
      let MaxCacheQueueLen = 5;
      let cacheQueue = [];
      if (
        storage.has(cacheKey) &&
        storage.has("articleTotal") &&
        self.tagID == 0
      ) {
        self.articleInfo = storage.get(cacheKey);
        self.articleTotal = storage.get("articleTotal");
        console.log(
          "[ Note ] This data comes from the local cache and may be different from the actual data. " +
            "If you want to pull the latest data from the server again, please clean up the Local Cache."
        );
      } else {
        console.log(self.tagID);
        self
          .axios({
            method: "post",
            url: self.serverIP + "api/article/list",
            data: {
              page: parseInt(self.$route.params.page),
              pageSize: self.pageSize,
              tag: self.tagID,
            },
          })
          .then(function (response) {
            if (self.tagID != 0) {
              self.articleTotal = response.data["total"];
              self.articleInfo = response.data["articleList"];
              return;
            }
            // LRLU
            if (storage.has("cacheQueue")) {
              cacheQueue = storage.get("cacheQueue");
            } else {
              self.removeArticleCache()
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
      self.fullscreenLoading = false;
    },

    // 定时清理 localcache
    clearCacheTimer() {
      // 2 分钟没动作就清空缓存
      let timeout = 1000 * 60 * 2;
      if (new Date().getTime() - storage.get("timer") - timeout >= 0) {
        this.removeArticleCache();
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
