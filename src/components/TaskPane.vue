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
      value: ''
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
  },
  mounted() {
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
