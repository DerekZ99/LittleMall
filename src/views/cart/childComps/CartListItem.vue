<template>
  <div class="cart-list-item">
    <div class="checkbox" @click="checkClick">
      <img :class="{check:product.checked}" src="~assets/img/newicons/checked.svg" alt />
    </div>

    <img class="cart-item-img" :src="product.image" alt />
    <div @click="checkClick">
      <div class="title">{{product.title}}</div>
      <div class="desc">{{product.desc}}</div>
      <div class="price-count">
        <span>¥{{product.price}}</span>
        <span>×{{product.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    checkClick() {
      //监听按钮的点击事件
      this.product.checked = !this.product.checked;
    }
  }
};
</script>

<style scoped>
.cart-list-item {
  box-sizing: border-box;
  display: flex;
  border: 2px solid #ebebeb;
  margin: 7px;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
}
.checkbox {
  width: 15px;
  height: 15px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  border: 2px solid #ff8e97;
  border-radius: 50%;
}
.check {
  width: 100%;
  border-radius: 50%;
  background-color: #ff8e97;
}
.cart-item-img {
  height: 100%;
  border-radius: 8px;
  margin: 0 10px;
}
.title,
.desc {
  width: 240px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title {
  font-size: 14px;
}
.desc {
  font-size: 12px;
  color: #757575;
  padding: 14px 0 18px;
}
.price-count span:first-child {
  color: #f67e44;
}
.price-count span:last-child {
  float: right;
}
</style>