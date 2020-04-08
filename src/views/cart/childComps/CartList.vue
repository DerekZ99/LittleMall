<template>
  <div class="cartList">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";

export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    // ↓拿到购物车中的内容（从store中拿）
    ...mapGetters(["cartList"])
  },
  activated(){ //切到当前页面的时候进行刷新
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cartList {
  height: calc(100% - 133px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>