import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) { //让以存在的商品数量+1
    payload.count++
  },
  [ADD_TO_CART](state, payload) {  
    payload.checked = true // 给这个商品附一个check属性和值
    state.cartList.push(payload) //把这个商品添加进store的数组里面
  }
}