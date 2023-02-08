<template>
  <div>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.meta.requiresAuth"></Footer>
  </div>
</template>

<script>
// 导入非路由组件
import Header from '@/components/Header/header.vue'
import Footer from '@/components/Footer/footer.vue'

export default {
  name: 'MyApp',
  mounted () {
    // 通知Vuex 发请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>
