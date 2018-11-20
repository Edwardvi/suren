<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="usermotto">
  
        <div class="userinfo-avatar">
        <open-data type="userAvatarUrl"></open-data>
        </div>
        <div >Hello,<open-data type="userNickName"></open-data></div>

       
        
        <!-- <card :text="user_name"></card> -->
      
    </div>
    <div class="yishuzi" >
      <button v-if="!hasuser" open-type="getUserInfo" lang="zh_CN" @getuserinfo='onGotUserInfo' >
      宿</button>
      <button v-if="!hasuser" open-type="getUserInfo" lang="zh_CN" @getuserinfo='onGotUserInfo' >
      人</button>
      <a v-if="hasuser" href="/pages/go/main" class="counter">
      宿</a>
      <a v-if="hasuser" href="/pages/su/main" class="counter">
      人</a>
      
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
      userInfo: false,
      errMsg: {},
      hasuser: false,
      user_name: [],
      user: ""
    };
  },

  components: {
    card
  },
  computed: {},

  beforeCreate() {
    // 查看是否授权
  },

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
      // this.user_name = user.attributes.username;
      // console.log("用户已加载：", this.user_name);
    },
    onGotUserInfo(e) {
      console.log(5);
      console.log(e);
      this.hasuser = true;
      // if (!this.hasuser) {
      //   this.openSetting();
      // }
    },

    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    // openSetting: function() {
    //   var that = this;
    //   if (wx.openSetting) {
    //     wx.openSetting({
    //       success: function(res) {
    //         console.log(9);
    //         //尝试再次登录
    //         that.login();
    //       }
    //     });
    //   } else {
    //     console.log(10);
    //     wx.showModal({
    //       title: "授权提示",
    //       content:
    //         "小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮"
    //     });
    //   }
    // }
  },

  created() {
    this.sing();
  },

  onshow() {
    if (!this.userInfo.nickName) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.userInfo = res.userInfo;
          console.log(1, this.userInfo.nickName);
        },
        fail: res => {
          console.log(4);
        }
      });
    }
  },
  mounted() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              that.userInfo = res.userInfo;
              that.hasuser = 1;
              console.log("hasuser", res.userInfo);
              console.log("hasuser.value",that.hasuser);
            }
          });
        }
      }
    });
    // wx.login({
    //   success: res => {
    //     var code = res.code;
    //     console.log("code", code, this.userInfo.nickName);
    //     wx.getUserInfo({
    //       success: res => {
    //         console.log(7, res.userInfo);
    //         this.userInfo = res.userInfo;
    //         console.log(8, this.userInfo.nickName);
    //         //平台登录
    //       }
    //     });
    //   }
    // });

    this.getcurrentuser();
  }
};
</script>

<style scoped>
.userinfo-avatar {
  overflow: hidden;
  display: block;
  width: 160rpx;
  height: 160rpx;
  margin: 20rpx;
  margin-top: 160rpx;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.container {
  padding: 0 0;
}
.usermotto {
  display: block;
  justify-content: center;
}

.yishuzi {
  width: 100%;
  display: flex;
  margin-top: 200px;
  justify-content: space-between;
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
