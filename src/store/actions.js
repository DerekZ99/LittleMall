import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolved, rejected) => {
      // 1 查找之前数组是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2 判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolved('当前的商品数量+1')
      } else { //添加了新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolved('添加了新的商品')
      }



    })
  }
}