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
    imageLoad() { //当页面加载完成之后发送一个事件出去
      if (!this.isLoad) { //这里的作用是强制只发送一次自定义事件
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
