<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex()" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId">
                                <!-- 一级分类 -->
                                <h3 @mouseenter="changeIndex(index)" :class="{ cur: index == currentIndex }">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName
                                    }}</a>
                                </h3>
                                <!-- 二三级分类 -->
                                <div class="item-list clearfix"
                                    :style="{ display: index == currentIndex ? 'block' : 'none' }">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// 导入 lodash
// 按需引入：只是引入节流函数，其他的函数没有引入（模块），这样做的好处是，当你打包项目的时候体积会小一些
import throttle from 'lodash/throttle.js'
export default {
  name: 'TypeNav',
  data () {
    return {
      // 拿到索引,当前这个属性决定了到底那个h3身上有类名
      currentIndex: -1,
      show: true
    }
  },
  // 组件挂载完毕，向服务器发送请求
  mounted () {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 右侧为一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state，其实为大仓库中的数据
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    // 用于修改组件实例身上的currentIndex的属性值
    // 当用户鼠标移入到h3身上的时候就会立即出发一次
    changeIndex: throttle(function (index) {
      // 修改当前currentIndex索引值
      // 函数节流:在50MS时间之内只能执行一次
      this.currentIndex = index
    }, 50),
    // 鼠标离开变回
    // 当鼠标离开的时候，让商品分类列表进行隐藏
    leaveIndex () {
      this.currentIndex = -1
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow () {
      this.show = true
    },
    // 路由跳转
    goSearch (event) {
      // event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      const node = event.target
      // 给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      const {
        categoryname,
        category1id,
        category2id,
        category3id
      } = node.dataset
      // 第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      // 当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        // 准备路由跳转的参数对象
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (category1id) {
          // 一定是a标签：一级目录
          query.category1id = category1id
        } else if (category2id) {
          // 一定是a标签：二级目录
          query.category2id = category2id
        } else {
          // 一定是a标签：三级目录
          query.category3id = category3id
        }
        location.query = query
        // 路由跳转
        // 判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params
          // 动态给location配置对象添加query属性
        }
        this.$router.push(location)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27.5px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }

        //过渡动画的样式
        //过渡动画开始状态（进入）
        .sort-enter {
            height: 0px;
        }

        // 过渡动画结束状态（进入）
        .sort-enter-to {
            height: 461px;
        }

        // 定义动画时间、速率
        .sort-enter-active {
            transition: all 0.5s linear;
        }
    }
}
</style>
