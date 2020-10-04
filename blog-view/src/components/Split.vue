<template>
  <div class="split">
    <nav aria-label="...">
      <ul class="pagination justify-content-center">

        <!-- <li v-if="thisPage == 1" class="page-item disabled">
          <span class="page-link">Previous</span>
        </li>
        <li v-else class="page-item">
          <span class="page-link">Previous</span>
        </li> -->

        <li v-for="page in Math.ceil(total / pageSize)" :key="page" class="page-item">
          <span v-if="page == thisPage" class="page-link active thisPage">
            {{page}}
            <span class="sr-only">(current)</span>
          </span>
          <a v-else class="page-link" :href="'#/index/'+ page + '/' + tagID" @click="reload(page)">{{page}}</a>
        </li>

        <!-- <li v-if="thisPage === Math.ceil(total / pageSize)" class="page-item disabled">
          <a class="page-link" href="#">Next</a>
        </li>
        <li v-else class="page-item">
          <a class="page-link" :href="'#/index/'+ (thisPage + 1)" @click="reload(page)">Next</a>
        </li> -->
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Split",
  data: () => {
    return {
      thisPage: 0,
    };
  },
  props: {
    total: Number,
    pageSize: Number,
    tagID: Number
  },
  mounted() {
      this.thisPage = parseInt(this.$route.params.page)
  },
  methods: {
    getNext(page) {
      return page + 1
    },
      reload (page) {
        this.thisPage = parseInt(page)
      }
  }
};
</script>
<style scoped>
.split {
  text-align: center;
}
.thisPage{
  background-color:#007bff;
  color: #fff;
}
</style>