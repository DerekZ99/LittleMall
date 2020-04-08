<template>
  <div class="base-info" v-if="goods.columns&&goods.services">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span>{{goods.newPrice}}</span>
      <span>{{goods.oldPrice}}</span>
      <span>{{goods.discount}}</span>
    </div>
    <div class="information">
      <span v-if="goods.colunms">{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length -1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.base-info {
  padding: 10px 10px 0px;
  border-bottom: 1px solid #eaeaea;
}
.info-title {
  font-size: 16px;
}
.info-price {
  position: relative;
  margin-top: 14px;
}
.info-price span {
  margin-right: 8px;
}
.info-price span:nth-child(1) {
  color: #f17d8f;
  font-size: 24px;
}
.info-price span:nth-child(2) {
  color: #666;
  font-size: 16px;
  text-decoration: line-through;
}
.info-price span:nth-child(3) {
  position: absolute;
  top: 2px;
  border-radius: 10px;
  font-size: 16px;
  padding: 1px 5px;
  color: #fff;
  background-color: #ee818e;
}
.information {
  display: flex;
  text-align: center;
  padding: 22px 0 10px;
  border-bottom: 1px solid #eaeaea;
}
.information span {
  flex: 1;
  justify-content: space-between;
  color: #666;
}
.information span:first-child {
  text-align: left;
}
.information span:last-child {
  text-align: right;
}
.info-service{
  display: flex;
  font-size: 13px;
  text-align: center;
  padding: 23px 0;
}
.info-service img {
  width: 14px;
}
.info-service-item{
  flex: 1;
}


</style>