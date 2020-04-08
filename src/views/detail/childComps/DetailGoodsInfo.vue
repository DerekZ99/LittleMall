<template>
  <div class="detail-goods-info" v-if="detailInfo.detailImage">
    <div class="detail-info-title">
      <div class="decoration"></div>
      <p>{{detailInfo.desc}}</p>
      <div class="decoration2"></div>
      <p>{{detailInfo.detailImage[0].key}}</p>
    </div>
    <div>
      <ul
        class="detail-goods-list"
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
      >
        <li>
          <img :src="item" @load="imgLoad" alt />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      counter: 0,
      imgLength: 0
    };
  },
  methods:{
    imgLoad(){
      this.counter++
      if(this.counter === this.imgLength){  
        this.$emit('imgRefresh')
      }
    }
  },
  watch: {
    detailInfo() {
      this.imgLength = this.detailInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style>
.detail-goods-info {
  border-top: 4px solid #eeeeee;
}
.detail-info-title {
  background-color: #ffffff;
  padding: 10px;
}
.detail-info-title p {
  margin-left: 5px;
  margin: 15px 0;
  color: #252526;
}
.detail-info-title p:last-child {
  color: #000000;
}
.decoration::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border: 1px solid #666;
  background-color: black;
  border-radius: 3px;
}
.decoration::after {
  content: "";
  display: inline-block;
  width: 83px;
  border: 1px solid #666;
}
.decoration2 {
  position: relative;
  height: 8px;
}
.decoration2::before {
  position: absolute;
  right: 0;
  bottom: 0;
  display: inline-block;
  content: "";

  width: 83px;
  border: 1px solid #666;
}
.decoration2::after {
  position: absolute;
  right: 0;
  bottom: 0;
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;

  border: 1px solid #666;
  background-color: black;
  border-radius: 3px;
}
.detail-goods-list li img {
  width: 100%;
}
</style>