<template>
  <div class="bottom-bar">
    <div @click="checkAllClick" class="checkbox">
      <img :class="{check:isCheckAll}" src="~assets/img/newicons/checked.svg" alt />
    </div>
    <span @click="checkAllClick" class="select-all">全选</span>
    <span class="clear-cart" @click="clearClick">删除选中</span>
    <span class="total-price">合计:{{totalPrice}}</span>
    
    <span class="calculate" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    clearClick() { //购物车删除选中功能
      this.$store.state.cartList = this.cartList.filter(item => !item.checked)
    },
    checkAllClick() {
      if (this.isCheckAll) {
        //全部选中的情况之下
        // 让checkList里面所有item的checked属性为false （实现全部不选中）
        this.cartList.forEach(item => (item.checked = false));
      } else {
        //部分或全部都不选中的情况下
        // 让cartList里面所有的item的checked属性为true （实现全部选中）
        this.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {}
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter(item => {
            //先过滤掉没有被选中的商品
            return item.checked;
          })
          .reduce((preValue, item) => {
            //剩下的商品 每个都用count * 价格 再加上上一次的结果
            let tPrice = preValue + item.price * item.count;
            // 修复数字乱掉的bug
            return Math.round(tPrice * 100) / 100;
          }, 0)
      );
    },
    checkLength() {
      // ↓拿到被选中的商品的总件数
      return this.cartList.filter(item => item.checked).length;
    },
    isCheckAll() {
      // 判断购物车内部的总件数，是否等于被选中的总件数的长度 如果是代表全选了
      return this.checkLength == this.cartLength && this.cartLength != 0;
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  border-top: 1px solid #eaeaea;
  height: 40px;
  background-color: #ededed;
  position: relative;
  left: 0;
  right: 0;
  line-height: 40px;
  vertical-align: middle;
}
.checkbox {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  border: 2px solid #ff8e97;
  border-radius: 50%;
  line-height: 0px;
}
.check {
  width: 100%;
  border-radius: 50%;
  background-color: #ff8e97;
}
.select-all {
  margin-left: 35px;
  font-size: 14px;
}
.total-price {
  margin-left: 10px;
  font-size: 14px;
}
.clear-cart {
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
  padding: 0 5px;
  background-color: #f9cc9d;
}
.calculate {
  padding: 0 20px;
  float: right;
  font-size: 14px;
  background-color: #ff5001;
  color: #fff;
}
</style>