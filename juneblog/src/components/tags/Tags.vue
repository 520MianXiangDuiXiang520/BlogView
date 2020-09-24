<template>
  <div class="main">
    <el-col :span="8" class="mycard" v-for="i in tags" :key="i.id">
      <el-card shadow="hover" @click="toList(i.id)">
        <div @click="toList(i.id)">
          <el-row>
            <el-col :span="24">
              <div  class="grid-content bg-purple-dark">{{i.name}}</div>
            </el-col>
          </el-row>
          <br />
          <el-row class="buttom">
            <el-col :span="6">
              <div class="grid-content bg-purple-dark">文章数: {{i.article_total}}</div>
            </el-col>

            <el-col :span="18">
              <div class="grid-content bg-purple-dark">创建时间: {{getExactTime(i.create_time)}}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Tags",
  inject: ["openMessage", "getExactTime", "reload"],
  data() {
    return {
      tags: [],
      tagsTotal: 0,
    };
  },
  methods: {
    toList(id) {
      console.log(this);
      this.$router.push("/index/1/" + id);
      this.reload();
    },
    getAllTags() {
      let self = this;
      this.axios({
        method: "post",
        url: "http://localhost:8080/api/tag/list",
        data: {},
      })
        .then(function (response) {
          self.tags = response.data["tags"];
          self.tagsTotal = response.data["total"];
        })
        .catch((error) => {
          self.openMessage(
            "[ " + error.response.status + " ] 获取标签列表失败！",
            "warning"
          );
        });
    },
  },

  mounted() {
    this.getAllTags();
  },
};
</script>

<style scoped>
.main {
  margin-left: 10%;
  margin-right: 10%;
}
.mycard {
  padding: 10px;
}
.buttom {
  font-size: 13px;
}
</style>