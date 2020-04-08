<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="(item, index) in topImages" class="detail-item" :key="index">
      <img :src="item" alt />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.el-carousel__indicator--horizontal {
  display: inline-block;
  /* padding: 12px 2px; */
  margin: 0 6px;
}
.el-carousel__button {
  width: 15px;
}
.el-carousel__indicator {
  width: 5px;
}
.detail-item img {
  width: 100%;
}
</style>