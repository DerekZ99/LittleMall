<template>
  <div id="home">
    <!-- 顶部bar↓ -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 导航栏部分↓ -->
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <!-- 滑动部分↓ -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></swiper>
      <home-recommend-view :recommonds="recommonds"></home-recommend-view>
      <feature></feature>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 返回顶部组件↓ -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 公共组件↓
import NavBar from "components/common/navbar/NavBar";
import Swiper from "components/common/swiper/Swiper";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/common/backTop/BackTop";
// 导入子组件↓
import HomeRecommendView from "./childComps/HomeRecommendView";
import Feature from "./childComps/Feature";
// 导入响应请求的函数↓
import { getHomeData } from "network/home";
import { getHomeGoods } from "network/home";
// 导入防抖函数↓
import { debounce } from "common/utils";
// 导入混入函数↓
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    HomeRecommendView,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [], //轮播图数据容器
      recommonds: [], //推荐区数据容器
      goods: {
        //获取商品数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      curType: "pop", //当前用户选中的商品数据类型 默认为pop
      isShowBackTop: false, //判断是否显示返回顶部
      tabOffsetTop: 0, //tabbar距离顶部的高度
      isTabFixed: false, //判断tabbar是否固定（做吸顶效果）
      saveY: 0, //用户离开时的页面高度
      Tab0CurPosition: -577,
      Tab1CurPosition: -577,
      Tab2CurPosition: -577,
      tabCurIndex: 0
    };
  },
  computed: {
    showGoods() {
      //发送对应的商品数据类型给子组件
      return this.goods[this.curType].list;
    }
  },
  minins: [itemListenerMixin], //引入混入
  created() {
    this.getHomeData();

    // 请求商品的数据↓
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  activated() {
    //当组件处于活跃的时候刷新页面并快速滚动到保存的位置
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //当离开首页之后
    // 保存Y值↓
    this.saveY = this.$refs.scroll.getScrollY();

    // 取消全局时间的监听↓
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    // 下面是事件监听的相关方法
    loadMore() {
      //加载更多数据，调用加载函数
      this.getHomeGoods(this.curType);
    },
    tabClick(index) {
      //当tabbar发送了点击自定义事件过来之后，拿到index
      switch (
        index //根据index 显示对应的商品数据类型
      ) {
        case 0:
          this.curType = "pop";
          // 跳转到用户上次浏览的位置
          this.$refs.scroll.scrollTo(0, this.Tab0CurPosition, 100);
          break;
        case 1:
          this.curType = "new";
          this.$refs.scroll.scrollTo(0, this.Tab1CurPosition, 100);
          break;
        case 2:
          this.curType = "sell";
          this.$refs.scroll.scrollTo(0, this.Tab2CurPosition, 100);
          break;
      }
      // 保持两个tabbar的index同步↓
      this.$refs.tabControl1.curIndex = index;
      this.$refs.tabControl2.curIndex = index;
      this.tabCurIndex = index; //保存当前tabbar的索引
    },
    backClick() {
      //点击了返回顶部之后，返回顶部
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //当屏幕发生了滚动
      // 1 判断BackTop是否显示↓
      this.isShowBackTop = -position.y > 1000;
      // 2 决定tabControl是否吸顶（position:fix）↓
      this.isTabFixed = -position.y > this.tabOffsetTop;

      // 3 根据当前索引的不同，保存用户当前浏览商品的的高，
      if (this.tabCurIndex === 0) {
        this.Tab0CurPosition = position.y;
      } else if (this.tabCurIndex === 1) {
        this.Tab1CurPosition = position.y;
      } else {
        this.Tab2CurPosition = position.y;
      }
    },
    swiperImageLoad() {
      //轮播图图片加载完成之后取到tabbar的顶部高度
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 下面都是网络请求相关的方法
    getHomeData() {
      getHomeData().then(res => {
        //当数据请求成功的时候
        // 把请求过来的数据存进data里面↓
        this.banners = res.data.banner.list;
        this.recommonds = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //给用户默认展示第一页的内容
      const page = this.goods[type].page + 1;
      //  请求成功，拿到res值，根据type和page值存入不同类型商品数据
      getHomeGoods(type, page).then(res => {
        // 当要加载更多的时候把更多数据Push进data容器中↓
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1; // 把page多加一页

        // 完成加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: #ff8e97;
  color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: 100%; */

  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
