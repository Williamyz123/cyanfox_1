<template>
  <div class="container">
    <div v-show="!isShowLogin">
      <!--<button @click='testWpsApi'>测试</button>-->
      <div class="panel">
        <div class="panel-item">
          模型选择
          <el-select v-model="value" placeholder="请选择剧本类别" size="small">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="panel-item">
          框选文本
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请框选需要生成配图的文本"
              v-model="selected">
          </el-input>
        </div>
        <div class="panel-item">
          翻译生成pronpt
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="点击翻译生成对应promt"
              v-model="translation">
          </el-input>
        </div>
        <div class="panel-item">
          <div class="buttons">
            <el-button @click="translate">翻译</el-button>
            <el-button @click="search">生成图片</el-button>
          </div>

        </div>
      </div>

      <!--<DocItem title="标题1" description="简介1" time="时间1" url="https://www.bilibili.com/" @click="openURL"></DocItem>-->
      <div class="image-container" v-show="isShowImage">
        <img :src="imageData + Base64Data1"/>
        <img :src="imageData + Base64Data2"/>
        <img :src="imageData + Base64Data3"/>
      </div>

    </div>

    <Login v-show="isShowLogin" ref="login"></Login>

  </div>
</template>

<script>
import axios from 'axios'
import taskPane from './js/taskpane.js'
import basicSearch from "@/components/BasicSearch.vue";
import BasicSearch from "@/components/BasicSearch.vue";
import DocItem from "@/components/DocItem.vue";
import Login from "@/components/Login.vue";
import md5 from 'md5';
import $ from 'jquery';

window.$ = $;


const request = axios.create({
  // baseURL: HOST,
  timeout: 5000,
  withCredentials: true
})

export default {
  name: 'TaskPane',
  components: {DocItem, BasicSearch, Login},
  data() {
    return {
      options: [{
        value: 'anything-v5-PrtRE.safetensors [7f96a1a9ca]',
        label: 'anything'
      }, {
        value: 'chilloutmix_NiPrunedFp32Fix.safetensors [fc2511737a]',
        label: 'chilloutmix_NiPrunedFp32Fix'
      }, {
        value: 'sdxlUnstableDiffusers_v9DIVINITYMACHINE.safetensors[05c9e2274a]',
        label: 'sdxlUnstableDiffusers'
      }, {
        value: 'technidrawing_v10.safetensors [582acba7a0]',
        label: 'technidrawing'
      }, {
        value: 'flat2DAnimerge_v40.safetensors [f5e9411b4d]',
        label: 'flat2DAnimerge'
      }],
      value: 'anything-v5-PrtRE.safetensors [7f96a1a9ca]',
      level1: [],
      level2: [],
      level3: [],
      keywords: '',
      search_data: {},
      imageData: "data:image/png;base64,",// 你的Base64图像数据
      Base64Data1: "",
      Base64Data2: "",
      Base64Data3: "",
      resData: "",
      translation: "",
      prompt: "",
      selected: "",
      isShowLogin: true,
      isShowImage:false,
    }
  },
  methods: {

    openURL() {
      alert(222);
    },

    // 这个应该是隔0.5s就监听鼠标
    testWpsApi() {
      alert(this.value)
    },
    async translate() {
      let resdata = "";
      let words = "";

      let content = wps.WpsApplication().Selection.Text;
      content = content.replaceAll(' ', '\n');
      // const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
      let appid = '20230601001697728';
      let key = 'upqadnnem_WMsnZ4Zhul';
      let salt = (new Date).getTime();
      // let query = '苹果';
      let query = content;
      // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
      let from = 'zh';
      let to = 'en';
      let str1 = appid + query + salt + key;
      let sign = md5(str1);

      let that = this
      $.ajax({
        url: '/trans/vip/translate',
        type: 'get',
        dataType: 'jsonp',
        data: {
          q: query,
          appid: appid,
          salt: salt,
          from: from,
          to: to,
          sign: sign
        },
        success: function (data) {
          for (let result of data.trans_result) {
            resdata = resdata + result.dst + ' '
          }
          // alert(resdata)
          that.translation = resdata
        }
      });
    },
    async search(keywords) {
      let url_sd = "/sdapi/v1/txt2img";
      let payload = {
        "prompt": this.translation,
        "steps": 50,
        "batch_size": 3,
        "sampler_index": "DPM++ 2M Karras",
        "override_settings": {
          "sd_model_checkpoint": this.value,
        },
      };

      const response = await axios.post(url_sd, payload);
      // console.log(response.data.images['0']);
      console.log(this.imageData)
      this.Base64Data1 = response.data.images['0'];
      this.Base64Data2 = response.data.images['1'];
      this.Base64Data3 = response.data.images['2'];
      this.isShowImage = true;

    },
    activeWorker() {
      this.selected = wps.WpsApplication().Selection.Text;
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
        // let always = 10
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

    login(data) {
      this.isShowLogin = false;
    }
  },
  mounted() {
    this.activeWorker()
    this.$refs.login.$on('login',this.login)
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

.el-button {
  color: white;
  border: solid 1px;
  background-color: #005c30;
  width: 45%;
}

.panel {
  /*border: 1px red solid;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
}

.panel-item {
  margin-top: 10px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.image-container {
  margin-top: 10px;
}

</style>
