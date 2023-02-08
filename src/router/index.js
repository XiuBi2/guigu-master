import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from '@/store'
Vue.use(VueRouter)

// 获取原型对象上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  // 第一个形参：路由跳转的配置对象（query|params）
  // 第二个参数：undefined|箭头函数（成功的回调）
  // 第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    // push方法传递第二个参数|第三个参数（箭头函数）
    // originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject)
  } else {
    // push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})

// 全局前置守卫的回调函数中接收三个形参，格式为：
router.beforeEach(async (to, from, next) => {
  // to 是将要访问的路由的信息对象
  // from 是将要离开的路由的信息对象
  // next 是一个函数，调用 next() 表示放行，允许这次路由导航
  next()
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  // 用户登录了
  if (token) {
    // 用户登录了不能访问登录页面和注册页面
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      // 已经登陆了,访问的是非登录与注册
      // 登录了且拥有用户信息放行
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch {
          await store.dispatch('UserLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    // 未登录去上面这些路由-----登录
    const toPath = to.path
    // eslint-disable-next-line eqeqeq
    if (toPath.indexOf('/pay') != -1 || toPath.indexOf('/trade') != -1 || toPath.indexOf('/center') != -1) {
      // 把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect=' + toPath)
    } else {
      // 去的不是上面这些路由（home|search|shopCart）---放行
      next()
    }
  }
})
export default router
