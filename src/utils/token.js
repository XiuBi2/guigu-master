// 存储 token
export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}

// 获取 token
export const getToken = () => {
  return localStorage.getItem('TOKEN')
}

// 删除本地存储的 token
export const removeToken = () => {
  localStorage.removeItem('TOKEN')
}
