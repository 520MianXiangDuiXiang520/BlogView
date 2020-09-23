<template>
  <div class="article-list">
    <div class="article" v-for="article in articleInfo" :key="article.id">
      <router-link :to="routeURL + article.id">
        <div class="title">
          <h3>{{article.title}}</h3>
        </div>
      </router-link>

      <h6>
        <span v-for="tag in article.tags" :key="tag.id" class="badge badge-secondary">{{tag.name}}</span>
      </h6>
      <router-link :to="routeURL + article.id">
        <p class="ctime">{{Date(parseInt(article.createTime) * 1000).toLocaleString()}}</p>
        <div class="abstract">{{article.abstract}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data: () => {
    return {
      routeURL: "/detail/",
    };
  },
  props: {
    articleInfo: Array,
  },
};
</script>

<style scoped>
.article-list {
  margin-top: 50px;
  margin-left: 20%;
  margin-right: 20%;
}
.article {
  margin-bottom: 40px;
}
.ctime {
  font-size: 14px;
  color: #8f8f8f;
  margin-bottom: 0px;
}
.abstract {
  font-size: 15px;
  color: #8f8f8f;
}
.badge {
  margin-right: 5px;
}
</style>