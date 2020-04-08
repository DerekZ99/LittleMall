<template>
  <div class="sorry">
    <img
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586370137806&di=c93b9678519c8ff78fbc85507145aa31&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F013a6c57fa1db6a84a0d304f5ef03a.jpg%401280w_1l_2o_100sh.jpg"
      alt
    />
    <div class="message">缺少接口文档，此功能无法实现</div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.sorry {
  height: 100vh;
}
img {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
}
.message {
  position: absolute;
  display: inline-block;
  top: 65%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
