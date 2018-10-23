<template>
  <div class="container" @click="clickHandle('test click', $event)">
    

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
        <card :text="userInfo.nickName"></card>
        <div class="yishuzi">
          <a href="/pages/go/main" class="counter">宿</a>
          <a href="/pages/su/main" class="counter">人</a>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card';



export default {
  data() {
    return {
      motto: 'hello',
      userInfo: {},
    };
  },

  components: {
    card,
  },

  methods: {
    bindViewTap() {
      const url = '../logs/main';
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo;
            },
          });
        },
      });
    },
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  },
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
  flex:auto;
  color: #aaa;
}

.usermotto {
  display: block;
  flex-direction: column;
  justify-content: flex-start;
  flex:auto;
  
}

.yishuzi{
  display: flex;
  flex-wrap: nowrap;
  margin-top: 300px;
  flex-direction: row;
  justify-content:space-around;
  
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
