// detail 模块的小仓库
import { reqAddressInfo, reqOrderInfo } from '@/api/index.js'
// state: 仓库存储数据的地方
const state = {
  address: [],
  orderInfo: {}
}

// mutations： 修改state的唯一手段
const mutations = {
  ADDRESSINFO (state, address) {
    state.address = address
  },
  GETORDERINFO (state, orderInfo) {
    state.orderInfo = orderInfo
  }
}

// action: 处理action，可以书写自己的逻辑业务，也可以处理异步
const actions = {
  // 获取用户地址
  async getUserAddress ({ commit }) {
    const result = await reqAddressInfo()
    if (result.code === 200) {
      // 返回的是成功的标记
      console.log(result)
      commit('ADDRESSINFO', result.data)
      return 'ok'
    } else {
      // 返回的是失败的标记
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取商品清单数据
  async getOrderInfo ({ commit }) {
    const result = await reqOrderInfo()
    if (result.code === 200) {
      commit('GETORDERINFO', result.data)
    }
  }
}

// getters: 理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}
