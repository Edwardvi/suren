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
      motto: "",
      // userInfo: {},
      user_name: []
    };
  },

  components: {
    card
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    // getcurrentuser() {

    // },

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
    const user = AV.User.current();
    // this.user = ;
    var user_name ;
    console.log(user);
    console.log(user_name);
    this.motto = 1111;
    // this.getcurrentuser();
    var getinfo = AV.Object.createWithoutData("_User", user.id);
    getinfo.fetch().then(
      function() {
        var user_name = todo.get("username"); // 读取 username
      },
      function(error) {
        // 异常处理
      }
    );
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
