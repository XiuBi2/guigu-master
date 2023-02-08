// detail 模块的小仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index.js'
import { getUUID } from '@/utils/uuid_token'
// state: 仓库存储数据的地方
const state = {
  goodsinfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}

// mutations： 修改state的唯一手段
const mutations = {
  GETGOODSINFO (state, goodsinfo) {
    state.goodsinfo = goodsinfo
  }
}

// action: 处理action，可以书写自己的逻辑业务，也可以处理异步
const actions = {
  // 获取产品信息的action
  async getGoodsInfo ({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code === 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
    // 发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    // 不需要在三连环（仓库存储数据了）
    // 注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code === 200) {
      // 返回的是成功的标记
      return 'ok'
    } else {
      // 返回的是失败的标记
      return Promise.reject(new Error('faile'))
    }
  }
}

// getters: 理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
  // 路径导航简化的数据
  categoryView (state) {
    // 比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    // 当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了。
    return state.goodsinfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo (state) {
    return state.goodsinfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  skuSaleAttrValueList (state) {
    return state.goodsinfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
