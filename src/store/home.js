// home 模块的小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
// state: 仓库存储数据的地方
const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}

// mutations： 修改state的唯一手段
const mutations = {
  CATEGORYLIST (state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST (state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST (state, floorList) {
    state.floorList = floorList
  }
}

// action: 处理action，可以书写自己的逻辑业务，也可以处理异步
const actions = {
  async categoryList ({ commit }) {
    // 通过API 的接口请求，向服务器发请求，获取服务器的数据
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  async getBannerList ({ commit }) {
    const result = await reqGetBannerList()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  async getFloorList ({ commit }) {
    const result = await reqGetFloorList()
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}

// getters: 理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
