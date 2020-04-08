<template>
  <div class="block">
    <el-carousel trigger="click" height="150px" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad" alt />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banners: Array
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true
      }
    }
  }
};
</script>

<style scoped>
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
</style>
