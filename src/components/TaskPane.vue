<template>
  <div>
    <button @click='testWpsApi'>测试</button>
    <el-select v-model="value" placeholder="请选择">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <basic-search :keywords="keywords"></basic-search>
    <DocItem></DocItem>
    <DocItem></DocItem>

  </div>
</template>

<script>
import axios from 'axios'
import taskPane from './js/taskpane.js'
import basicSearch from "@/components/BasicSearch.vue";
import BasicSearch from "@/components/BasicSearch.vue";
import DocItem from "@/components/DocItem.vue";

export default {
  name: 'TaskPane',
  components: {DocItem, BasicSearch},
  data() {
    return {
      options: [{
        value: '选项1',
        label: '计算机'
      }, {
        value: '选项2',
        label: '思政'
      }, {
        value: '选项3',
        label: '英语学习'
      }, {
        value: '选项4',
        label: '艺术哲学'
      }, {
        value: '选项5',
        label: '文化历史'
      }],
      value: '',
      level1: "",
      level2: "",
      level3: "",
      keywords:'',

    }
  },
  methods: {
    // onbuttonclick(id){
    //     return taskPane.onbuttonclick(id)
    // },
    // onDocNameClick(){
    //     this.docName = taskPane.onbuttonclick('getDocName')
    // },
    // onOpenWeb(){
    //     taskPane.onbuttonclick('openWeb', this.DemoSpan)
    // }
    // 这个应该是隔0.5s就监听鼠标
    testWpsApi() {
      this.level1 = ""
      // alert("函数之前level1为" + this.level1)
      this.level2 = ""
      this.level3 = ""
      this.selectionChange()
      // alert("函数之后level1为" + this.level1)
      // alert(this.level1)
      this.keywords = `${this.level1} ${this.level2} ${this.level3}`
      // this.keywords = "ffvgxcbfbnsddb"
    },
    activeWorker() {
      this.level1 = ""
      this.level2 = ""
      this.level3 = ""
      this.selectionChange()
      this.keywords = `${this.level1} ${this.level2} ${this.level3}`
      setTimeout(() => {
        this.activeWorker()
      }, 500)
    },
    // 用于监测鼠标选取内容的变化
    selectionChange() {
      let res = wps.WpsApplication().Selection
      let selectText = res.Text;
      // alert("选中的文本为" + res.Text)
      if (selectText.length > 200) {
        this.selectText = selectText.slice(0, 200)
      } else {
        // 若不是主推送文档，则不需要进行按章节推送
        var level1 = "";
        var level2 = "";
        var level3 = "";
        this.level2 = level2;
        this.level3 = level3;
        this.getHeadingDone = false;
        let para_first = res.Paragraphs.First;
        let paragraph = res.Paragraphs.Last;
        // var always = 10
        while (!this.getHeadingDone) {
          if (paragraph.Style.NameLocal.indexOf("标题") !== -1) {
            if (paragraph.Style.NameLocal.indexOf("标题 3") !== -1) {
              if (level3 == "") {
                level3 = paragraph.Range.Text;
                this.level3 = level3;
              }
            } else if (paragraph.Style.NameLocal.indexOf("标题 2") != -1) {
              if (level2 == "") {
                level2 = paragraph.Range.Text;
                this.level2 = level2;
                if (level3 == "") {
                  level3 = "placeholder";
                }
              }
            } else if (paragraph.Style.NameLocal.indexOf("标题 1") != -1) {
              if (level1 == "") {
                level1 = paragraph.Range.Text;
                this.level1 = level1;
                this.getHeadingDone = true;
              }
            }
          }
          paragraph = paragraph.Previous();
          // always--"selectionchange"
        }
      }
      // alert("走出了循环")
    },
  },
  mounted() {
    this.activeWorker()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #005c30;
}
.el-icon-arrow-down {
  font-size: 12px;
}

</style>
