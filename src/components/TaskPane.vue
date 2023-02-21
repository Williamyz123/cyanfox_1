<template>
  <div>
    <basic-search></basic-search>
  </div>
</template>

<script>
import axios from 'axios'
import taskPane from './js/taskpane.js'
import basicSearch from "@/components/BasicSearch.vue";
import BasicSearch from "@/components/BasicSearch.vue";

export default {
  name: 'TaskPane',
  components: {BasicSearch},
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
