<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
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
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Swiper from "components/common/swiper/Swiper";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/common/backTop/BackTop";

import HomeRecommendView from "./childComps/HomeRecommendView";
import Feature from "./childComps/Feature";

import { getHomeData } from "network/home";
import { getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import {itemListenerMixin} from "common/mixin"

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
      banners: [],
      recommonds: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      curType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.curType].list;
    }
  },
  minins:[itemListenerMixin],
  created() {
    this.getHomeData();

    // 请求商品的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

  },
  mounted() {},
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() { //当离开首页之后
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    
    // 取消全局时间的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    // 下面是事件监听的相关方法
    loadMore() {
      this.getHomeGoods(this.curType);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.curType = "pop";
          break;
        case 1:
          this.curType = "new";
          break;
        case 2:
          this.curType = "sell";
          break;
      }
      this.$refs.tabControl1.curIndex = index;
      this.$refs.tabControl2.curIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2 决定tabControl是否吸顶（position:fix）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 下面都是网络请求相关的方法
    getHomeData() {
      getHomeData().then(res => {
        // 把请求过来的数据存进data里面
        this.banners = res.data.banner.list;
        this.recommonds = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

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
