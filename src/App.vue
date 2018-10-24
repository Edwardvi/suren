<script>
import "./weui.css";

export default {
  created() {
    var APP_ID = "10Ru3WJvNiOIlVYLvHejjqG1-gzGzoHsz";
    var APP_KEY = "SGci4c7EdxJRx2nMc7kRYU4E";
    var AV = require("leancloud-storage")
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
    console.log("LC ok!");

    // var user = new AV.User() || [];
    () => {AV.User.loginWithWeapp()
      .then(user => {
        this.globalData.user = user.toJSON();
      })
      .catch(console.error)}
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    console.log("app created and cache logs by setStorageSync");

    
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  /* 决定主轴的方向（即项目的排列方向） */
  flex-direction: row;
  /*  自动换行 */
  flex-wrap: wrap;
  /* 项目在交叉轴上如何对齐。靠主轴原点 */
  align-items: flex-start;
  /* 项目在主轴上的对齐方式 row主轴为从左到右*/
  justify-content: center;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
