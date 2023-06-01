<template>
  <div class="container">
    <!--<button @click='testWpsApi'>测试</button>-->
    <el-select v-model="value" placeholder="请选择" size="small">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <basic-search :keywords="keywords" v-on:search="search"></basic-search>
    <DocItem title="标题1" description="简介1" time="时间1" url="https://www.bilibili.com/" @click="openURL"></DocItem>
    <img :src="imageData + Base64Data" />
  </div>
</template>

<script>
import axios from 'axios'
import taskPane from './js/taskpane.js'
import basicSearch from "@/components/BasicSearch.vue";
import BasicSearch from "@/components/BasicSearch.vue";
import DocItem from "@/components/DocItem.vue";
import {forEach} from "core-js/stable/dom-collections";

const request = axios.create ({
  // baseURL: HOST,
  timeout: 5000,
  withCredentials: true
})

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
      search_data:{},
      imageData: "data:image/png;base64,",// 你的Base64图像数据
      Base64Data: "",
    }
  },
  methods: {
    async sendPostRequest() {
      let url = "/sdapi/v1/txt2img";
      let payload = {
        "prompt": "puppy dog",
        "steps": 5
      };

      const response = await axios.post(url, payload);
      // console.log(response.data.images['0']);
      console.log(this.imageData)
      this.Base64Data = response.data.images['0'];

    },
    openURL() {
      alert(222);
    },

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
    async search(keywords) {
      let url = "/sdapi/v1/txt2img";
      let payload = {
        "prompt": "puppy dog",
        "steps": 5
      };

      const response = await axios.post(url, payload);
      // console.log(response.data.images['0']);
      console.log(this.imageData)
      this.Base64Data = response.data.images['0'];
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
      setTimeout(() => {
        this.activeWorker()
      }, 500)
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
      if (selectText.length > 200) {
        this.selectText = selectText.slice(0, 200)
      } else {
        // 若不是主推送文档，则不需要进行按章节推送
        let level1 = '';
        let level2 = '';
        let level3 = '';
        let para_last = res.Paragraphs.Last;
        let count = res.Range.Paragraphs.Count;
        // var always = 10
        // while (!this.getHeadingDone) {
        while (count !== 0) {
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
          count--;
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

.container {
  /*background-color: #ececec;*/
}
.el-icon-arrow-down {
  font-size: 12px;
}
img {
  width: 100%;
}
</style>
