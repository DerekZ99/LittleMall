<template>
  <div class="goods">
    <!-- ↓如果在商品详情页显示该标签，否则隐藏 -->
    <p class="recommend-title" v-if="isRecommend">精品推荐</p>
    <!-- 这里先遍历生成多少个子组件，然后再把当前父亲传来的数据传给子↓ -->
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