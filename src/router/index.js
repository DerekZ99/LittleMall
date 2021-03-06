import Vue from 'vue'
import vueRouter from 'vue-router'

// 懒加载
const Home = () => import("../views/home/Home");
const Categories = () => import("../views/categories/Categories");
const Cart = () => import("../views/cart/Cart");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail")

Vue.use(vueRouter)

const routes = [{ //配置映射关系
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/categories",
    component: Categories
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: '/detail/:iid',  //要传的路由id
    component: Detail
  }
]

const router = new vueRouter({
  routes,
  mode: 'history'
})

export default router