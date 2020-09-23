<template>
  <div>
    <div class="context">
      <mavon-editor
        :value="articleDetail.text"
        :subfield="prop.subfield"
        :defaultOpen="prop.defaultOpen"
        :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
        :boxShadow="false"
        :previewBackground="prop.previewBackground"
        class="md"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data: () => {
    return {
      articleDetail: {},
    };
  },
  computed: {
    prop() {
      let data = {
        subfield: false,
        defaultOpen: "preview",
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        previewBackground: "#fffff"
      };
      return data;
    },
  },
  mounted() {
    let self = this;
    console.log(self);
    this.axios({
      method: "post",
      url: "http://localhost:8080/api/article/detail",
      data: {
        articleId: parseInt(self.$route.params.id),
      },
    }).then(function (response) {
      self.articleDetail = response.data;
    });
  },
};
</script>

<style scoped>
.context{
    margin-left: 18%;
    margin-right: 18%;
    z-index: 10;
}
</style>