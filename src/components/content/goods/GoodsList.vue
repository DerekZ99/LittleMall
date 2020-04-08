<template>
  <div class="goods">
    <p class="recommend-title" v-if="isRecommend">精品推荐</p>
    <goods-list-item v-for="(item, index) in goods" :goods-item="item" :key="index"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },    
    },
    isRecommend:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>

<style scoped>
.recommend-title{
text-align: center;
padding: 20px 0;
}
</style>