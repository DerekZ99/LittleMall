<template>
  <div class="recommond">
    <div v-for="(item, index) in recommonds" :key="index" class="recommond-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommonds: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.recommond {
  padding: 10px 0 20px;
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  border-bottom: 8px solid #eee;
}
.recommond-item {
  flex: 1;
}
.recommond-item div {
  color: #666;
}
.recommond-item img {
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>