import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import toast from "components/common/toast";
import FastClick  from 'fastclick'

Vue.config.productionTip = false
Vue.use(ElementUI);

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')