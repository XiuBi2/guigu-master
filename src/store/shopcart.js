// home 模块的小仓库
import { reqCartList, reqUpdateCheckedByid, reqDeleteCartById } from '@/api'
// state: 仓库存储数据的地方
const state = {
  cartList: []
}

// mutations： 修改state的唯一手段
const mutations = {
  GETCARTLIST (state, cartList) {
    state.cartList = cartList
  }
}

// action: 处理action，可以书写自己的逻辑业务，也可以处理异步
const actions = {
  // 获取购物车列表数据
  async getCartList ({ commit }) {
    const result = await reqCartList()
    if (result.code === 200) {
      // console.log(result)
      commit('GETCARTLIST', result.data)
    }
  },
  // 修改购物车某一个产品的选中状态
  async updateCheckedById ({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改全部产品的状态
  updateAllCartIsChecked ({ dispatch, state }, isChecked) {
    // 数组
    const promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      const promise = dispatch('updateCheckedById', {
        skuId: item.skuId,
        isChecked
      })
      promiseAll.push(promise)
    })
    // 最终返回结果
    return Promise.all(promiseAll)
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId ({ commit }, skuId) {
    const result = await reqDeleteCartById(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart ({ dispatch, getters }) {
    // context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    // 获取购物车中全部的产品（是一个数组）
    const PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      const promise =
        item.isChecked === 1
          ? dispatch('deleteCartListBySkuId', item.skuId)
          : ''
      // 将每一次返回的Promise添加到数组当中
      PromiseAll.push(promise)
    })
    // 只要全部的p1|p2....都成功，返回结果即为成功
    // 如果有一个失败，返回即为失败结果
    return Promise.all(PromiseAll)
  }
}

// getters: 理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
  // 简化数据
  cartList (state) {
    return state.cartList[0] || {}
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
