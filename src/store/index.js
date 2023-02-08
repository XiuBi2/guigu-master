import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart.js'
import user from './user'
import trade from './trade'
// 使用插件一次
Vue.use(Vuex)
// 对外暴露 Store 类的一个实例
export default new Vuex.Store({
  // 实现Vuex仓库模块式开发储存数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})
