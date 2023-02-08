// search 模块的小仓库
import { reqGetSearchInfo } from '@/api/index.js'
// state: 仓库存储数据的地方
const state = {
  searchList: {}
}

// mutations： 修改state的唯一手段
const mutations = {
  GETSEARCHLIST (state, searchList) {
    state.searchList = searchList
  }
}

// action: 处理action，可以书写自己的逻辑业务，也可以处理异步
const actions = {
  async getSearchList ({ commit }, params = {}) {
    // 通过API 的接口请求，向服务器发请求，获取服务器的数据
    const result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}

// getters: 理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
  goodsList (state) {
    return state.searchList.goodsList || []
  },
  trademarkList (state) {
    return state.searchList.trademarkList
  },
  attrsList (state) {
    return state.searchList.attrsList
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
