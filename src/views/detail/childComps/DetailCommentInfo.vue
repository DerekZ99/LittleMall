<template>
  <div class="detail-comment-info" v-if="goodsComment.user">
    <div class="title">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="comment-area">
      <div class="user-info">
        <img :src="goodsComment.user.avatar" alt />
        <div>{{goodsComment.user.uname}}</div>
      </div>
      <div class="user-comment">{{goodsComment.content}}</div>
      <div class="comment-img" v-for="(item, index) in goodsComment.images" :key="index">
        <img :src="item" alt />
      </div>
      <div class="review-info">
        {{goodsComment.created | formatDate}}
        
        {{goodsComment.style}}
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  props: {
    goodsComment: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    formatDate(time) {
      time = time * 1000;
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style scoped>
.detail-comment-info {
  padding: 0 10px;
  border-top: 6px solid #f8f8fa;
}
.title {
  padding: 12px 0;
  border-bottom: 1px solid rgb(221, 219, 219);
}
.title span:last-child {
  float: right;
}
.comment-area {
  padding-top: 15px;
  padding-bottom: 28px;
  border-bottom: 4px solid #fafafa;
}
.user-info div {
  display: inline-block;
  position: relative;
  bottom: 12px;
}
.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #fafafa;
  margin-right: 10px;
}
.user-comment {
  padding: 12px 0;
  color: #50556b;
}
.review-info {
  color: #666;
  font-size: 14px;
}
.comment-img {
  display: inline-block;
  border: 3px solid #ffffff;
  width: 50px;
  height: 50px;
}

.comment-img img {
  width: 100%;
}
</style>