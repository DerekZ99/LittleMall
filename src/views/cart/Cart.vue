<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表↓ -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

import { mapGetters } from "vuex"; //引入getters 为了拿到里面的方法

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // ...mapGetters(["cartLength", "cartList"])
    ...mapGetters({ //拿到getters里面的计算购物车长度的方法（返回值）
      length:'cartLength'
    })
  }
};
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar {
  background-color: #ff8e97;
  color: #fff;
}
</style>