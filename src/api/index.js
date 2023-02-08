// 导入后台数据的请求
import requests from './ajax.js'
// 导入mock数据的请求
import mockRequests from './mockAjax'
// 请求三联组件
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
// 请求 Banner 数据
export const reqGetBannerList = () => mockRequests.get('/banner')
// 请求 Floor 数据
export const reqGetFloorList = () => mockRequests.get('/floor')
// 请求search 数据
export const reqGetSearchInfo = (params) => requests.post('/list', params)
// 获取商品详细信息
// export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
export const reqGoodsInfo = (skuId) => requests.get(`/item/${skuId}`)
// 添加到购物车
// export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 获取购物车
export const reqCartList = () => requests.get('/cart/cartList')
// 修改商品的选中状态
// URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
// 删除购物产品的接口
// URL:/api/cart/deleteCart/{skuId}   method:DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
// 获取验证码
// URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)
// export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 注册
// url:/api/user/passport/register  method:post    phone code password
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })
// 登录
// URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })
// 获取用户信息【需要带着用户的token向服务器要用户信息】
// URL:/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
// 退出登录
// URL:/api/user/passport/logout  get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
// 获取用户地址信息
export const reqAddressInfo = () => requests.get('/user/userAddress/auth/findUserAddressList')
// 获取商品清单
// URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
// 提交订单的接口
// URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
// 获取支付信息
// URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
// 获取支付订单状态
// URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
// 获取个人中心的数据
// api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
