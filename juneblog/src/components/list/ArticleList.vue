<template>
  <div class="article-list">
    <div v-for="article in articleInfo" :key="article.id">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="title">
              <el-link
                class="title-font"
                type="primary"
                :href="routeURL + article.id"
              >{{article.title}}</el-link>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="abstract">
              <span>{{article.abstract}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div class="another">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="ctime">{{getExactTime(article.createTime)}}</p>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple">
                    <span class="tag" v-for="tag in article.tags" :key="tag.id">
                      <el-divider direction="vertical"></el-divider>
                      {{tag.name}}
                    </span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <hr class="line">
      <!-- <el-divider></el-divider> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data: () => {
    return {
      routeURL: "#/detail/",
    };
  },
  props: {
    articleInfo: Array,
  },
  methods: {
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
  },
};
</script>

<style scoped>
.line {
  margin-top: 3px;
  margin-bottom: 6px;
}
.tag {
  float: left;
  font-size: 14px;
  color: #767677;
}
.ctime {
  float: left;
  font-size: 14px;
  color: #767677;
}
.title {
  float: left;
  color: #303133;
  margin-bottom: 5px;
  margin-top: 23px;
}
.title-font {
  font-size: 18px;
}
.abstract {
  float: left;
  text-align: left;
  color: #303133;
  font-size: 15px;
  margin-bottom: 10px;
}
.another {
  float: left;
  width: 100%;
}
.article-list {
  margin-top: 50px;
  margin-left: 20%;
  margin-right: 20%;
}
</style>