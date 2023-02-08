// detail 模块的小仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index.js'
import { setToken, getToken, removeToken } from '@/utils/token.js'
// state: 仓库存储数据的地方
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}

// mutations： 修改state的唯一手段
const mutations = {
  GETCODE (state, code) {
    state.code = code
  },
  USERLOGIN (state, token) {
    state.token = token
  },
  GETUSERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  USERLOGOUT (state) {
    // 帮仓库中先关用户信息清空
    state.token = ''
    state.userInfo = {}
    // 本地存储数据清空
    removeToken()
  }
}

// action: 处理action，可以书写自己的逻辑业务，也可以处理异步
const actions = {
  // 获取验证码
  async getCode ({ commit }, phone) {
    // 获取验证码的这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上【省钱】
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 注册业务
  async userRegister ({ commit }, user) {
    const result = await reqUserRegister(user)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 登录业务
  async UserLogin ({ commit }, data) {
    const result = await reqUserLogin(data)
    if (result.code === 200) {
      // 用户登录成功且获取到token
      commit('USERLOGIN', result.data.token)
      // 持久化储存token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async UseLogout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit('USERLOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
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
