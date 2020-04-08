<template>
  <div class="shop-info">
    <div class="shop-title">
      <div>
        <img :src="shop.logo" alt />
      </div>
      <p>{{shop.name}}</p>
    </div>
    <div class="info-detail">
      <div class="sells-info">
        <div>
          <div class="sells-info-num">{{getPower}}</div>
          <div class="sells-info-text">总销量</div>
        </div>
        <div>
          <div class="sells-info-num">{{shop.goodsCount}}</div>
          <div class="sells-info-text">全部宝贝</div>
        </div>
      </div>
      <div class="review-info">
        <table>
          <tr class="view-info-item" v-for="(item, index) in shop.score" :key="index">
            <td class="view-info-item-text">{{item.name}}</td>
            <td class="turnRed" :class="{turnGreen:item.score<5?true:false}">{{item.score}}</td>
            <td>
              <div
                class="betterTurnGreen"
                :class="{betterTurnRed:item.isBetter}"
              >{{item.isBetter? '高' : '低'}}</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <a :href="shop.url">
      <div class="into-shop">进店逛逛</div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      sellsNum: 0
    };
  },
  computed: {
    getPower() {
      this.sellsNum = this.shop.sells;
      if (this.sellsNum / 10000 > 1) {
        return (this.sellsNum / 10000).toFixed(1) + "万";
      } else if (this.sellsNum / 1000 > 1) {
        return Math.round(this.sellsNum / 1000) + "千+";
      } else if (this.sellsNum / 100 > 1) {
        return Math.round(this.sellsNum / 100) + "百+";
      } else {
        return this.sellsNum;
      }
    }
  }
};
</script>

<style>
.shop-info {
  padding: 26px 10px 0;
}
.shop-title {
  overflow: hidden;
  padding-bottom: 20px;
}
.shop-title div {
  width: 45px;
  border: 1px solid #eaeaea;
  border-radius: 50%;
  overflow: hidden;
  float: left;
}
.shop-title div img {
  width: 100%;
}
.shop-title p {
  float: left;
  margin-top: 20px;
  margin-left: 15px;
  font-size: 18px;
}
.info-detail {
  display: flex;
}
.info-detail div {
  flex: 1;
}
.sells-info {
  border-right: 1px solid #eaeaea;
  text-align: center;
  display: flex;
}
.sells-info div {
  flex: 1;
}
.sells-info-num {
  font-size: 24px;
  margin: 15px 0 12px;
}
.sells-info-text {
  font-size: 14px;
}
.turnGreen {
  color: #709359 !important;
}
.turnRed {
  color: #e54d49;
}
.betterTurnRed,
.betterTurnGreen {
  color: #ffffff;
  border-radius: 4px;
}
.betterTurnRed {
  background-color: #e54d49 !important;
}
.betterTurnGreen {
  background-color: #709359;
}
.view-info-item td {
  padding: 0 10px 15px;
  font-size: 14px;
}
.into-shop {
  width: 140px;
  height: 30px;
  border-radius: 20px;
  line-height: 30px;
  text-align: center;
  background-color: #F1F5FA;
  color: #898D93;
  margin: 16px auto 24px;
}
</style>