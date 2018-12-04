import Vue from 'vue';
import App from './App';
import './css/app.css';
import './weui.css';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
Vue.prototype.globalData = getApp().globalData //把vue原型下的globalData等于小程序原生的getApp().globalData。

//将小程序的全局变量，挂载在Vue的原型上，这样我们在不同的页面就都可以获取到全局数据了 不同页面使用 this.globalData获取或者添加修改既可

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '宿人',
      navigationBarTextStyle: 'black',
    },
  },
};
