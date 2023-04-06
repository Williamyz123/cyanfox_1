import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// 完整引入，main.js写入以下代码
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

const routerCfg= [
  {
    path: '/', 
    name: '默认页',
    component:()=>import('./components/Root.vue')
  },{
    path: '/taskpane', 
    name: '任务窗格',
    component:()=>import('./components/TaskPane.vue')
  }
]

new Vue({
  render: h => h(App),
  router: new VueRouter({routes:routerCfg}),
  created: function () {
    //
  }
}).$mount('#app')
