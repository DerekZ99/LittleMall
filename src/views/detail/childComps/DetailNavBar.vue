<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/icons/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          class="title-item"
          :class="{active:index == curIndex}"
          @click="titleClick(index)"
          :key="index"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      curIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.curIndex = index;
      this.$emit('titleClick',index)
    },
    backClick(){ //执行返回上一页
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 15px;
}
.title-item {
  flex: 1;
}
.active {
  color: #ff8e97;
}
.back {
  margin-top: 8px;
  margin-left:18px ;
  width: 30px;
}

.back img{
  width: 100%;
}
</style>