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
        // 商品已经存在，把这个商品发送到mutation的add_counter方法处理
        context.commit(ADD_COUNTER, oldProduct)
        resolved('当前的商品数量+1')
      } else { //添加了新的商品
        payload.count = 1
        //把新拿到商品（之前没选的）发送到mutaion的add_counter方法中处理
        context.commit(ADD_TO_CART, payload)
        resolved('添加了新的商品')
      }
    })
  }
}