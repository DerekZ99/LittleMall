<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-logo" src="~assets/img/tabbar/shouye.png" />
      <img
        slot="item-icon-activated"
        src="~assets/img/tabbar/shouye_1.png"
        alt
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/categories">
      <img slot="item-logo" src="~assets/img/tabbar/gengduo.png" />
      <img
        slot="item-icon-activated"
        src="~assets/img/tabbar/gengduo (2).png"
        alt
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-logo" src="~assets/img/tabbar/lihe.png" />
      <img
        slot="item-icon-activated"
        src="~assets/img/tabbar/lihe (2).png"
        alt
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-logo" src="~assets/img/tabbar/shequ.png" />
      <img
        slot="item-icon-activated"
        src="~assets/img/tabbar/shequ_1.png"
        alt
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// 导入tabbar
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style></style>
