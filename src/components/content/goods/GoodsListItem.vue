<template>
  <div v-if="goodsItem.show||goodsItem.image" class="goods-item" @click="itemClick">
    <img :src="showImg" alt @load="imageLoad" :key="showImg" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImg() { //根据传来的数据判断显示哪个（有多个父级组件复用这个组件）
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad() { //当图片加载完成时
      this.$bus.$emit("itemImageLoad"); //利用事件总站发送事件
    },
    itemClick() {  //页面跳转
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-item {
  width: 50%;
  display: inline-block;
  box-sizing: border-box;
  font-size: 15px;
  margin-bottom: 20px;
  padding: 0 10px;
}

.goods-item p {
  margin-bottom: 10px;
}

.price {
  color: deeppink;
  margin-left: 30px;
}

.collect {
  margin-left: 10px;
}

.collect::before {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url("~assets/img/icons/like.svg");
  background-size: 15px 15px;
}

.goods-item img {
  width: 100%;
  border-radius: 10px;
}
</style>