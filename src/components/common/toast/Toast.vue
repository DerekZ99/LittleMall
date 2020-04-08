<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message, duration=2000){
      this.isShow = true;
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  padding: 8px 10px;
  z-index:99;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 5px;
}
</style>