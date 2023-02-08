<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav></TypeNav>
    <!--列表-->
    <ListContainer></ListContainer>
    <!--今日推荐-->
    <MyRecommend></MyRecommend>
    <!-- 商品排行 -->
    <MyRank></MyRank>
    <!-- 猜你喜欢 -->
    <MyLike></MyLike>
    <!--楼层-->
    <MyFloor v-for="floor in floorList" :key="floor.id" :list="floor"></MyFloor>
    <!--商标-->
    <MyBrand></MyBrand>
  </div>
</template>

<script>
import ListContainer from './ListContainer/listcontainer.vue'
import MyRecommend from './Recommend/recommend.vue'
import MyRank from './Rank/rank.vue'
import MyLike from './Like/like.vue'
import MyFloor from './Floor/floor.vue'
import MyBrand from './Brand/brand.vue'
import { mapState } from 'vuex'

export default {
  name: 'MyHome',
  components: {
    ListContainer,
    MyRecommend,
    MyRank,
    MyLike,
    MyFloor,
    MyBrand
  },
  mounted () {
    this.$store.dispatch('getFloorList')
    this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      // 右侧为一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state，其实为大仓库中的数据
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style>

</style>
