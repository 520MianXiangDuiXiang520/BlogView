<template>
  <div>
    <div class="context">
      <el-row :gutter="20">
        <el-col :span="20">
          <mavon-editor
            ref="mavon"
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
        </el-col>
        <el-col :span="4">
          <div id="navigation" style="position: fixed;cursor: pointer;height: 70%; overflow: auto"></div>
        </el-col>
      </el-row>

      <div class="talk">
        <Talking></Talking>
      </div>
    </div>
  </div>
</template>

<script>
import Talking from "../talk/Talking.vue";
export default {
  name: "Detail",
  data: () => {
    return {
      articleDetail: {},
      self: this,
    };
  },
  components: {
    Talking,
  },
  computed: {
    prop() {
      let data = {
        subfield: false,
        defaultOpen: "preview",
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        previewBackground: "#fffff",
      };
      return data;
    },
  },
  inject: ["serverIP"],
  mounted() {
    let self = this;
    this.axios({
      method: "post",
      url: self.serverIP + "api/article/detail",
      data: {
        articleId: parseInt(self.$route.params.id),
      },
    }).then(function (response) {
      self.articleDetail = response.data;
      self.$nextTick(() => {
        self.buildNavigation();
      });
    });
  },
  methods: {
    setTocStyle(doc) {
      let tocs = doc.getElementsByClassName("navigator-item");
      tocs.forEach((toc) => {
        toc.style.textAlign = "left";
        toc.style.margin = 1;
        toc.style.fontSize = "16px";
      });
      let toc1 = doc.getElementsByClassName("heading_2");
      toc1.forEach((toc) => {
        toc.style.paddingLeft = "20px";
      });
      let toc3 = doc.getElementsByClassName("heading_3");
      toc3.forEach((toc) => {
        toc.style.paddingLeft = "40px";
      });
      let toc4 = doc.getElementsByClassName("heading_4");
      toc4.forEach((toc) => {
        toc.style.paddingLeft = "60px";
      });
    },
    buildNavigation() {
      let self = this;
      var a = document.getElementById("navigation");
      a.innerHTML = this.$refs.mavon.d_render; // mavmon根据marodown内容生成的dom
      const nodes = a.children;
      var newDoms = [];
      if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          const id =
            nodes[i].children && nodes[i].children.length
              ? nodes[i].children[0].id
              : "";
          judageH(nodes[i], i, nodes, id);
        }
      }
      function judageH(node, i, nodes, domId) {
        const reg = /^H[1-6]{1}$/;
        if (!reg.exec(node.tagName)) {
          // 把不是h标签的都过滤掉
          node.style.display = "none";
        } else {
          node.classList.add("navigator-item");
          const nodeArr = node.innerHTML.split("</a>");
          // const id = nodeArr[0].replace(/[^0-9]+/g, '')
          const id = domId;
          const content = nodeArr[1];
          var childs = node.childNodes;
          for (var index = childs.length - 1; index >= 0; index--) {
            node.removeChild(childs[index]);
          }
          const a = document.createElement("a");
          a.id = id;
          a.innerHTML = content;
          node.appendChild(a);
          // console.log(id, content, node.tagName)
          node.onclick = function () {
            window.location.replace("#" + this.children[0].id);
          };
          newDoms.push(node);
        }
      }
      const sliceDoms = []; // 归类好的节点树
      newDoms.forEach((dom, i) => {
        // 把标题归类 每部分的标题组合到一起
        const level = dom.tagName.substr(1);
        const upLevel = newDoms[i - 1] ? newDoms[i - 1].tagName.substr(1) : "";
        if (upLevel) {
          if (level > upLevel) {
            sliceDoms[sliceDoms.length - 1].push(dom);
          } else if (
            level > sliceDoms[sliceDoms.length - 1][0].tagName.substr(1)
          ) {
            sliceDoms[sliceDoms.length - 1].push(dom);
          } else {
            sliceDoms.push([dom]);
          }
        } else {
          sliceDoms.push([dom]);
        }
      });
      sliceDoms.forEach((doms) => {
        const thisTitleMaxId = doms[0].tagName.substr(1);
        doms.forEach((dom) => {
          const domHeadingLevel = dom.tagName.substr(1) - thisTitleMaxId + 1;
          dom.classList.add("heading_" + domHeadingLevel);
          let child = dom.getElementsByTagName("a")[0];
          var idd = child.getAttribute("id");
          child.setAttribute("id", "toc+" + idd);

          dom.onclick = function () {
            let idd = this.getElementsByTagName("a")[0].getAttribute("id");
            let id = idd.split("+")[1];
            let doc = document.getElementById(id);
            doc.scrollIntoView();
            window.scrollBy(0, -100);
          };
        });
      });
      self.setTocStyle(a);
    },
  },
};
</script>

<style scoped>
.context {
  margin-left: 10%;
  margin-right: 5%;
  z-index: 10;
}
.talk {
  margin-top: 50px;
  margin-right: 20%;
}
.navigation {
  position: fixed;
  top: 0;
  right: 0;
}
</style>