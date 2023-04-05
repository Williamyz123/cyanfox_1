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
import {forEach} from "core-js/stable/dom-collections";

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
      }],
      value: '',
      level1: [],
      level2: [],
      level3: [],
      keywords: '',

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
      console.log(111)
      // this.level1 = ""
      // this.level2 = ""
      // this.level3 = ""
      this.selectionChange()
      this.level1.forEach(value => {
        this.keywords += value;
      })
      this.level2.forEach(value => {
        this.keywords += value;
      })
      this.level3.forEach(value => {
        this.keywords += value;
      })
      // this.keywords = `${this.level1} ${this.level2} ${this.level3}`
    },
    activeWorker() {
      this.level1 = [];
      this.level2 = [];
      this.level3 = [];
      this.keywords = '';
      this.selectionChange()
      this.level1.forEach(value => {
        this.keywords += value;
      })
      this.level2.forEach(value => {
        this.keywords += value;
      })
      this.level3.forEach(value => {
        this.keywords += value;
      })
      // this.keywords = `${this.level1} ${this.level2} ${this.level3}`
      // setTimeout(() => {
      //   this.activeWorker()
      // }, 500)
    },
    // 用于监测鼠标选取内容的变化
    selectionChange() {
      this.level1 = [];
      this.level2 = [];
      this.level3 = [];
      this.keywords = '';
      let res = wps.WpsApplication().Selection
      let selectText = res.Text;
      // 它这个如果不框选一个范围，那么selectText就是空
      // alert("selectText: " + selectText);
      // alert("res: " + res);
      if (selectText.length > 200) {
        this.selectText = selectText.slice(0, 200)
      } else {
        // 若不是主推送文档，则不需要进行按章节推送
        let level1 = '';
        let level2 = '';
        let level3 = '';
        // this.level2 = level2;
        // this.level3 = level3;
        this.getHeadingDone = false;
        let para_first = res.Paragraphs.First;
        let para_last = res.Paragraphs.Last;
        // alert("para_first" + para_first.Range.Text)
        // alert("para_last" + para_last.Range.Text)
        let test = res.Range.Paragraphs.Count;
        // var always = 10
        // while (!this.getHeadingDone) {
        while (test !== 0) {
          if (para_last.Style.NameLocal.indexOf("标题") !== -1) {
            if (para_last.Style.NameLocal.indexOf("标题 3") !== -1) {
              // alert("level3" + level3);
              level3 = para_last.Range.Text;
              if (level3 !== "") this.level3.push(level3 + ' ');
            } else if (para_last.Style.NameLocal.indexOf("标题 2") !== -1) {
              level2 = para_last.Range.Text;
              if (level2 !== "") this.level2.push(level2 + ' ');
            } else if (para_last.Style.NameLocal.indexOf("标题 1") !== -1) {
              level1 = para_last.Range.Text;
              if (level1 !== "") this.level1.push(level1 + ' ');
            }
          }
          para_last = para_last.Previous();
          test--;
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
