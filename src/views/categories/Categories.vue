<template>
  <div>
    <h2>分类</h2>
    <!-- wrapper 必须设置高度 并且内部只能放一个标签 -->
    <div class="wrapper">
      <ul class="content">
        <li></li>*1000
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Categories",
  mounted() {
    // 默认情况下BScroll是不可以试试监听滚动位置的
    // probe侦测
    // 0 1 都是不侦测实时位置
    // 2 手指离开时的惯性不侦测
    // 3 只要是滚动都侦测
    const bs = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true
    });
    bs.on("scroll", position => {
      // 实时打印位置
      // console.log(position);
    });
    bs.on("pullingUp", () => {
      console.log("上拉加载更多");
      // 当拉到最底下的时候，发送网络请求，请求更多页的数据

      // 等数据请求完成，并且将新的数据展示出来后
      setTimeout(() => {
        bs.finishPullUp();
      }, 2000);
    });
  }
};
</script>

<style>

</style>
