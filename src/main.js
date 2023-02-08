import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { MessageBox } from 'element-ui'
// 全局注册组件
import TypeNav from '@/components/TypeNav/typenav.vue'
import Pagination from '@/components/Pagination/pagination.vue'
// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'
// 导入mock
import '@/mock/mockServe.js'
// 导入store仓库
import store from './store'
// 导入轮播图样式
import 'swiper/css/swiper.css'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'
Vue.use(VueLazyload, {
  loading: atm
})
// 声明全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
// Vue.use(MessageBox)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.config.productionTip = false

new Vue({
  router,
  store,
  // 全局事件总线$bus配置
  beforeCreate () {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App)
}).$mount('#app')
