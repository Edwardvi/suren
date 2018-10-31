<template>
  <div class="container" @click="clickHandle('test click', $event)">
    

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
        <card :text="user_name"></card>
        <div class="yishuzi">
          <a href="/pages/go/main" class="counter">宿</a>
          <a href="/pages/su/main" class="counter">人</a>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
var AV = require("leancloud-storage");

export default {
  data() {
    return {
      motto: "hello",
      // userInfo: {},
      user_name: [],
      user: ""
    };
  },

  components: {
    card
  },
  computed: {},

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },

    sing: function() {
      return AV.Promise.resolve(AV.User.current())
        .then(
          user =>
            user
              ? user.isAuthenticated().then(authed => (authed ? user : null))
              : null
        )
        .then(user => (user ? user : AV.User.loginWithWeapp()))
        .catch(error => console.error(error.message));
    },

    getcurrentuser() {
      const user = AV.User.current();
      this.user_name = user.attributes.username;
      console.log('用户已加载：',this.user_name);
    },

    // getUserInfo() {
    //   // 调用登录接口
    //   wx.login({
    //     success: () => {
    //       wx.getUserInfo({
    //         success: (res) => {
    //           this.userInfo = res.userInfo;
    //         },
    //       });
    //     },
    //   });
    // },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getcurrentuser();
    this.sing();

  }
};
</script>

<style scoped>
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  flex: auto;
  color: #aaa;
}

.usermotto {
  display: block;
  flex-direction: column;
  justify-content: flex-start;
  flex: auto;
}

.yishuzi {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 300px;
  flex-direction: row;
  justify-content: space-around;
}

.counter {
  margin: 10px auto;
  padding: 5px 10px;
  color: black;
  border: 1px solid black;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
