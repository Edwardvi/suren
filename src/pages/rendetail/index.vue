<template>
  <div class="container">
    <div class="Top">
      <img id="touxiang" :src="avatar" mode="aspectFill" style="  background-color: #eeeeee;">
      <!-- aspecFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 -->
      <div class="zuoxia">
        <div class="name">{{username}}</div>
        <div class="dizhi">{{live}}</div>
        <div class="sixin">
          <!-- <a class="center" href>私信</a> -->
        </div>
      </div>
      <button id="youshang" @click="upimagetouser">改</button>
    </div>
    <div class="bar">
      <block v-for="(item,index) in tabs" :key="index">
        <div
          :id="index"
          :class="{'weui-bar__item_on':activeIndex == index}"
          class="weui-navbar__item"
          @click="tabClick"
        >
          <div class="weui-navbar__title">{{item}}</div>
        </div>
      </block>
      <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
    </div>

    <div class="weui-tab__panel">
      <div class="weui-tab__content" :hidden="activeIndex != 0">
        <pic :id='id'></pic>

        
      </div>
      <div class="weui-tab__content" :hidden="activeIndex != 1">
        <div class="mid">
          <midcard></midcard>
          <midcard></midcard>
          <midcard></midcard>
          <midcard></midcard>
        </div>
      </div>
      <div class :hidden="activeIndex != 2">
        <div>生日:{{borntime}}</div>
        <div>心情:{{oneword}}</div>
        <div>想去:{{wantgo}}</div>
        <div>空闲时间:{{playtime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import pic from "@/components/pic";
import midcard from "@/components/midcard";
const AV = require("leancloud-storage");

export default {

  components: {
    pic,
    midcard
  },
  data() {
    return {
      tabs: ["相册", "收藏的宿", "过往"],
      activeIndex: 0,
      fontSize: 30,
      username: "",
      live: "",
      borntime: "",
      oneword: "",
      wantgo: "",
      playtime: "",
      avatar: "",
      id:"",
    };
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return "weui-navbar__slider_0";
      }
      if (this.activeIndex == 1) {
        return "weui-navbar__slider_1";
      }
      if (this.activeIndex == 2) {
        return "weui-navbar__slider_2";
      }
    }
  },
  methods: {
    tabClick(e) {
      console.log(e);
      this.activeIndex = e.currentTarget.id;
    },

    upimagetouser() {
      let that = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.avatar = res.tempFilePaths;
          let tempFilePath = res.tempFilePaths[0];
          const avatarfile = new AV.File(that.username, {
            blob: {
              uri: tempFilePath
            } //Blob 对象表示一个不可变、原始数据的类文件对象？这里不懂
          });
          wx.setStorageSync("Avatar", avatarfile);
          avatarfile
            .save()
            .then(file => {
              const user = AV.User.current();
              user.set("avatar", file);
              user.save();
              console.log(user);
            })
            .catch(console.error);
        }
      });
    }
  },
  mounted() {},
  onShow() {
    try {
      this.id = wx.getStorageSync("Cid"); //拿到存储的数据，使用同步的概念,奇怪的是必须用大写字母开头的命名
      // 第一个参数是 className，第二个参数是 objectId
      var todo = AV.Object.createWithoutData("_User", this.id);
      todo
        .fetch()
        .then(todo => {
          console.log("当前user：", todo.toJSON());
          this.username = todo.toJSON().username;
          this.live = todo.toJSON().live[2];
          this.avatar = todo.toJSON().avatar.url;
          console.log(this.avatar);
          this.wantgo = todo.toJSON().wantgo[2];
          this.oneword = todo.toJSON().oneword;
          this.playtime = todo.toJSON().play.substring(0, 10); //截取时间的前11位
          this.borntime = todo.toJSON().born.substring(0, 10);
        })
        .catch(function(error) {
          console.error(error);
        });
    } catch (e) {
      console.log("U X!", e);
    }
  }
};
</script>
<style   scoped>
.container {
  padding: 0;
}
.weui-tab__content {
  width: 100%;
}

.mid {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
}

.Top {
  width: 100%;
  height: 320px;
  /* position: relative; */

  /* background-image: linear-gradient(
    to bottom,
    rgba(87, 87, 87, 0),
    rgba(2, 2, 2, 0.93)
  ); */
}

#youshang {
  width: 26px;
  height: 26px;
  border-radius: 2px;
  background-color: #431c60;
  padding: 0%;
  margin-top: -75%;
  margin-right: 6%;
  line-height: 26px; /*与height 相等时，可以垂直剧中此元素中的内容*/
  text-align: center;
  color: #fff;
}

#touxiang {
  width: 100%;
  height: 320px;
}

.zuoxia {
  margin-top: -30%;
  margin-left: 6%;
}

.name {
  width: 100%;
  height: 24px;
  font-family: Runda;
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.85;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}
.dizhi {
  width: 100%;
  height: 12px;
  font-family: Runda;
  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 3.7;
  letter-spacing: 1px;
  text-align: left;
  color: #ffffff;
  margin-bottom: 1px;
}
.sixin {
  width: 68px;
  height: 26px;
  border-radius: 2px;
  /* background-color: #431c60; */
  margin-top: 5%;
  line-height: 26px; /*与height 相等时，可以垂直剧中此元素中的内容*/
  text-align: center;
  color: #fff;
}

.bar {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;

  z-index: 500;

  width: 100%;
  border-bottom: 1rpx solid #ccc;
  background-color: #431c60;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}

.weui-navbar__title {
  color: #a648eb;
}

.text {
  width: 100%;
  height: 16px;
  font-family: Runda;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 3.2;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
}

.weui-tab__panel {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.weui-navbar__slider_0 {
  left: 29rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 29rpx;
  transform: translateX(250rpx);
}
.weui-navbar__slider_2 {
  left: 29rpx;
  transform: translateX(500rpx);
}

.imgContent {
  width: 630rpx;
  margin: 0 auto;
}
.imgDiv {
  width: 200rpx;
  height: 200rpx;
  margin: 10rpx 10rpx 0 0;
  position: relative;
}

.deleteImg {
  position: absolute;
  right: -8rpx;
  top: -20rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: #fff;
  display: inline-block;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconfont {
  font-size: 32rpx;
  color: #c6ae6c;
}

.chooseImg {
  width: 200rpx;
  height: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(245, 245, 245, 1);
  border-radius: 2px;
  margin: 10rpx 10rpx 0 0;
}

.uploadDiv {
  margin-top: 80rpx;
  text-align: center;
}
.uploadBtn {
  display: inline-block;
  width: 360rpx;
  height: 100rpx;
  line-height: 100rpx;
  background: rgba(198, 174, 108, 1);
  border-radius: 2px;
  font-size: 28rpx;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
</style>
