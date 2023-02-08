// 导入路由组件、

export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/views/Home/myhome.vue'), meta: { requiresAuth: true } },
  { path: '/detail/:skuId', component: () => import('@/views/Detail/mydetai.vue'), meta: { requiresAuth: true } },
  { path: '/login', component: () => import('@/views/Login/mylogin.vue'), meta: { requiresAuth: false } },
  { path: '/register', component: () => import('@/views/Register/myregister.vue'), meta: { requiresAuth: false } },
  { path: '/search/:keyword?', component: () => import('@/views/Search/mysearch.vue'), meta: { requiresAuth: true }, name: 'search' },
  { path: '/addCartSuccess', component: () => import('@/views/AddCartSuccess/addCartSuccess.vue'), meta: { requiresAuth: true }, name: 'addcartsuccess' },
  { path: '/shopcart', component: () => import('@/views/ShopCart/shopcart.vue'), meta: { requiresAuth: true }, name: 'shopcart' },
  {
    path: '/trade',
    component: () => import('@/views/Trade/mytrade.vue'),
    meta: { requiresAuth: true },
    name: 'trade', /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter (to, from, next) {
      // eslint-disable-next-line eqeqeq
      if (from.path === '/shopcart' || from.path == '/') {
        next()
      } else {
        next('/shopcart')
      }
    }
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay/mypay.vue'),
    meta: { requiresAuth: true },
    name: 'pay',
    beforeEnter: (to, from, next) => {
    // reject the navigation
      // eslint-disable-next-line eqeqeq
      if (from.path == '/trade' || from.path == '/') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess/paysuccess.vue'),
    meta: { requiresAuth: true },
    name: 'paysuccess', /* 只有从支付界面, 才能跳转到支付成功的界面 */
    beforeEnter (to, from, next) {
      // eslint-disable-next-line eqeqeq
      if (from.path == '/pay' || from.path == '/') {
        next()
      } else {
        next('/pay')
      }
    }
  },
  {
    path: '/center',
    component: () => import('@/views/Center/center.vue'),
    name: 'center',
    children: [{ path: 'myorder', component: () => import('@/views/Center/myOrder/myorder.vue') }, { path: 'mygrouporder', component: () => import('@/views/Center/groupOrder/grouporder.vue') }, { path: '', redirect: 'myorder' }]
  }
]
