<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <basic-search></basic-search>
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
      level1: '',
      level2: '',
      level3: '',

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
    activeWorker() {
      this.selectionChange()
      setTimeout(() => {
        this.activeWorker()
        console.log("以下打印三个level")
        console.log(this.level1, this.level2, this.level3)
      }, 500)
    },
    selectionChange() {
      let res = wps.WpsApplication().Selection
      let selectText = res.Text;
      if (selectText.length > 1) {
        this.selectText = selectText.slice(0, 200)
      } else {
        var level1 = "";
        var level2 = "";
        var level3 = "";
        this.level2 = level2;
        this.level3 = level3;
        this.getHeadingDone = false;
        let paragraph = res.Paragraphs.First;
        // var always = 10
        while (!this.getHeadingDone) {
          if (paragraph.Style.NameLocal.indexOf("标题") !== -1) {
            if (paragraph.Style.NameLocal.indexOf("标题 3") !== -1) {
              if (level3 === "") {
                level3 = paragraph.Range.Text;
                this.level3 = level3;
              }
            } else if (paragraph.Style.NameLocal.indexOf("标题 2") !== -1) {
              if (level2 === "") {
                level2 = paragraph.Range.Text;
                this.level2 = level2;
                if (level3 === "") {
                  level3 = "placeholder";
                }
              }
            } else if (paragraph.Style.NameLocal.indexOf("标题 1") !== -1) {
              if (level1 === "") {
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
