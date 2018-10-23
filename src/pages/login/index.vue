<template>
  <div class="container" @click="clickHandle('test click', $event)">

      <div class="step">1/2 step</div> 
      <div class="layer">我们承诺决不向任何第三方透露信息 </div>

      <input class="layer" v-model="message" placeholder="暱称">
      <input class="layer" v-model="message" placeholder="密码">
      <input class="layer" v-model="message" placeholder="邮箱">
      <div class="layer">Message is: {{ message }}</div>
      <div class="dibu">
          <a class="dibucontext">注册</a>
      </div>
   
  </div>
</template>

<script>

var APP_ID = '10Ru3WJvNiOIlVYLvHejjqG1-gzGzoHsz';
var APP_KEY = 'SGci4c7EdxJRx2nMc7kRYU4E';
var AV = require('leancloud-storage');




  // 新建 AVUser 对象实例
  // var user = new AV.User();
  // // 设置用户名
  // user.setUsername('Tom');
  // // 设置密码
  // user.setPassword('cat!@#123');
  // // 设置邮箱
  // user.setEmail('echoxi@qq.com');
  // user.signUp().then(function (loggedInUser) {
  //     console.log(loggedInUser);
  // }, function (error) {
  // });


  // // 声明类型
  // var TodoFolder = AV.Object.extend('TodoFolder');
  // // 新建对象
  // var todoFolder = new TodoFolder();
  // // 设置名称
  // todoFolder.set('name','工作');
  // // 设置优先级
  // todoFolder.set('priority',1);
  // todoFolder.save().then(function (todo) {
  //   console.log('objectId IS ' + todo.id);
  // }, function (error) {
  //   console.error(error);
  // });



export default {
  components: { 
  },
  data () {
    return {
      massage: 'jjjj',
      user: '',
    }},
  methods: {
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
  },
};

AV.User.loginWithWeapp().then(user => {
  this.globalData.user = user.toJSON();
}).catch(console.error);

// 假设已经通过 AV.User.loginWithWeapp() 登录
// 获得当前登录用户
const user = AV.User.current();
// 调用小程序 API，得到用户信息
wx.getUserInfo({
  success: ({userInfo}) => {
    // 更新当前用户的信息
    user.set(userInfo).save().then(user => {
      // 成功，此时可在控制台中看到更新后的用户信息
      this.globalData.user = user.toJSON();
    }).catch(console.error);
  }
});
</script>


<style scoped>
.container {
  background-color: #d8d8d8;
  padding: 0px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content:center;
  align-content:center;
  align-items:center
}

.step {
  width: 100%;
  margin-top: 20px;
  font-family: Georgia;
  font-size: 40px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.15;
  letter-spacing: normal;
  text-align: center;
  color: #2699fb;
}
.layer {
  width: 100%;
  margin: 20px;
  font-family: Arial;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #2699fb;
}

.dibu {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content:center;
  width: 100%;
  height: 56px;
  background-image: linear-gradient(82deg, #4527a0, #7b1fa2);
}

.dibucontext{
  color: aliceblue;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
 
}
</style>
