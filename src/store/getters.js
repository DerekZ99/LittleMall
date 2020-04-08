export default {
  cartLength(state) { //拿到购物车内容的长度
    return state.cartList.length
  },
  cartList(state) { //拿到购物车中的内容
    return state.cartList
  }
}