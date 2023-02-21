<template>
  <div>
    <basic-search></basic-search>
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
      DemoSpan: '',
      docName: ''
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

</style>
