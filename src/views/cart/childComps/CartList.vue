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
    ...mapGetters(["cartList"])
  },
  activated(){
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