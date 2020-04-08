<template>
  <div class="params-info" v-if="paramInfo.sizes && paramInfo.infos">
    <div class="size-info" v-for="(item, index) in paramInfo.sizes[0]" :key="index">
      <span>{{item[0]}}</span>
      <span>{{item[1]}}</span>
      <span>{{item[2]}}</span>
      <span>{{item[3]}}</span>
    </div>
    <div class="company-info" v-for="(item) in paramInfo.infos">
      <span>{{item.key}}</span>
      <span>{{item.value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.params-info {
  padding: 12px 14px 0;
  font-size: 15px;
}
.company-info {
  text-align: center;
}
.size-info {
  border-bottom: 2px solid #f1f1f1;
  display: flex;
}
.size-info span:first-child {
  padding: 10px;
}
.size-info span:nth-child(n + 2) {
  flex: 1;
  padding: 10px;
  text-align: center;
}
.company-info {
  border-bottom: 2px solid #F1F1F1;
  display: flex;
}
.company-info span:first-child {
  padding: 10px;
  width: 32px;
}
.company-info span:last-child {
  flex: 1;
  padding: 10px;
  color: deeppink;
  text-align: center;
}
</style>