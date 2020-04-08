<template>
  <div id="detail">
    <detail-nav-bar ref="detailNavBar" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgRefresh="imgRefresh"></detail-goods-info>
      <detail-params-info :paramInfo="paramInfo" ref="paramsInfo"></detail-params-info>
      <detail-comment-info ref="commentInfo" :goodsComment="goodsComment"></detail-comment-info>
      <goods-list ref="recommendTop" :goods="recommendList" :isRecommend="true"></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backTopClick"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/common/backTop/BackTop";
// import Toast from "components/common/toast/Toast"

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
    // Toast
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      goodsComment: {},
      recommendList: [],
      paramsOffsetTop: 0,
      commentOffsetTop: 0,
      recommendOffsetTop: 0,
      isShowBackTop: false
      // message:'',
      // show:false
    };
  },
  methods: {
    imgRefresh() {
      this.$refs.scroll.refresh();
      // 当scroll组件刷新高度的时候获取个个组件在页面中的高度
      this.paramsOffsetTop = this.$refs.paramsInfo.$el.offsetTop - 44;
      this.commentOffsetTop = this.$refs.commentInfo.$el.offsetTop - 44;
      this.recommendOffsetTop = this.$refs.recommendTop.$el.offsetTop - 44;
    },
    titleClick(index) {
      switch (index) {
        case 0:
          this.$refs.scroll.scrollTo(0, 0);
          break;
        case 1:
          this.$refs.scroll.scrollTo(0, -this.paramsOffsetTop);
          break;
        case 2:
          this.$refs.scroll.scrollTo(0, -this.commentOffsetTop);
          break;
        case 3:
          this.$refs.scroll.scrollTo(0, -this.recommendOffsetTop);
          break;
      }
    },
    // 返回顶部执行
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    contentScroll(position) {
      // 判断顶部tabbar联动
      const currentY = -position.y;
      const paramsY = this.paramsOffsetTop;
      const commentY = this.commentOffsetTop;
      const recommendY = this.recommendOffsetTop;
      if (currentY >= 0 && currentY < paramsY) {
        this.$refs.detailNavBar.curIndex = 0;
      } else if (currentY >= paramsY && currentY < commentY) {
        this.$refs.detailNavBar.curIndex = 1;
      } else if (currentY >= commentY && currentY < recommendY) {
        this.$refs.detailNavBar.curIndex = 2;
      } else {
        this.$refs.detailNavBar.curIndex = 3;
      }
      // 判断回到顶部是否显示
      if (-position.y > 950) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },
    addToCart() {
      // 1 获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2 将商品添加到购物车里
      this.$store.dispatch("addCart", product).then(res => {
        
        this.$toast.show(res, 2000);
      });
    }
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;

    // 根据iid请求详细数据
    getDetail(this.iid).then(res => {
      // 获取顶部图片的轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //  创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 获取参数的信息
      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );

      if (data.rate.cRate !== 0) {
        // 获取评论的数据
        this.goodsComment = data.rate.list[0];
      }
    });

    getRecommend().then(res => {
      this.recommendList = res.data.list;
    });
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
}
.content {
  height: calc(100% - 93px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>