<template>
  <div class="main">
    <el-col :span="8" v-for="friend in friends" :key="friend.id" class="mycard">
      <el-card shadow="hover">
        <div class="friendship">
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <div class="block">
                  <el-avatar shape="square" :size="50" :src="friend.imgLink"></el-avatar>
                </div>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple-light">
                <el-link type="primary" :underline="false" class="siteName" :href="friend.link" target="_blank">{{friend.siteName}}</el-link>
                <el-link type="primary" :underline="false" class="intro" :href="friend.link" target="_blank">{{friend.intro}}</el-link>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </div>
  <!-- <div class="friends">
    <el-row :gutter="20">
      <el-col :span="8" v-for="friend in friends" :key="friend.id" class="friend">
        <div class="grid-content bg-purple" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
          
          <br>
          
          <br>
          <el-link type="info" class="friend">{{friend.intro}}</el-link>
        </div>
      </el-col>
    </el-row>
  </div>-->
</template>

<script>
export default {
  name: "Friend",
  data: () => {
    return {
      respError: false,
      friends: [],
      size: "medium",
    };
  },
  mounted() {
    this.getFriendList(this);
  },
  methods: {
    getFriendList: (self) => {
      self
        .axios({
          method: "post",
          url: "http://localhost:8080/api/friendship/list",
          data: {},
        })
        .then(function (response) {
          if (response.data["header"]["code"] != 200) {
            self.respError = true;
          } else {
            self.friends = response.data["friendShipList"];
          }
        });
    },
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
.friendship {
  height: 80px;
}
.siteName {
  font-size: 18px;
}
</style>