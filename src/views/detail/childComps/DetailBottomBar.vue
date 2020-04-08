<template>
  <div class="bottom-bar">
    <div class="shop-option">
      <div class="costumer">
        <img src="~assets/img/icons/respond.svg" alt />
        <div>客服</div>
      </div>
      <div class="costumer">
        <img src="~assets/img/icons/mirrorlightctrl.svg" alt />
        <div>店铺</div>
      </div>
      <div class="costumer">
        <img src="~assets/img/icons/mark.svg" alt />
        <div>收藏</div>
      </div>
    </div>
    <div class="shop-cart" @click="addToCart">加入购物车</div>
    <div class="purchase">购买</div>
  </div>
</template>

<script>
export default {
  methods: {
    addToCart() {
      this.$emit("addCart");
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  position: fixed;
  bottom: 0px;
  right: 0;
  left: 0;
  display: flex;
  margin-bottom: -1px;
  text-align: center;
  font-size: 15px;
}
.shop-option {
  padding: 2px;
  flex: 5;
  background: #f7fcf6;
  display: flex;
  justify-content: space-around;
  font-size: 13px;
}
.shop-option div {
  flex: 1;
}
.costumer img {
  width: 25px;
}

.shop-cart {
  flex: 2.5;
  line-height: 49px;
  background-color: #ebcd17;
}
.purchase {
  flex: 2.5;
  line-height: 49px;
  color: #fff;
  background-color: #f27092;
}
</style>
