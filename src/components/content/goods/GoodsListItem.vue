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
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
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