<template>
  <div class="container">
    <div class="Top">
      <div class="zuoxia">
        <div class="name">{{username}}</div>
        <div class="dizhi">{{live}}</div>
        <div class="sixin">
          <a class="center" href>私信</a>
        </div>
      </div>zheshi ge piaoliang de img
      <img src alt>
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
        <pic></pic>

        <button style="margin:30rpx;" @click="chooseimage">获取图片</button>
        <img :src="tempFilePaths" mode="aspecFill" style="width: 100%; height: 450rpx">
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
  props: ["u"],
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
      tempFilePaths: ""
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
    chooseImg() {
      let that = this;
      wx.chooseImage({
        count: 9 - that.tempFilePathsArr.length, // 默认最多一次选择9张图
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 支持多图上传
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            // 验证格式
            if (!/.(jpg|jpeg|png)$/i.test(res.tempFilePaths[i])) {
              console.log(
                "第" + (i + 1) + "图片格式不对，格式必须是jpeg,jpg,png中的一种"
              );
              return;
            }
            // 显示消息提示框
            wx.showLoading({
              title: "图片上传中...",
              mask: true
            });
            // 参数： 上传的图片临时文件路径、签名、成功回调、失败回调
            uploadImage(
              res.tempFilePaths[i],
              that.sign,
              function(result) {
                console.log("======上传成功图片地址为：", result);
                // 做你具体的业务逻辑操作
                that.tempFilePathsArr.push(result);
                console.log(that.tempFilePathsArr);
                wx.hideLoading();
              },
              function(result) {
                console.log("======上传失败======", result);
                // 做你具体的业务逻辑操作
                wx.hideLoading();
              }
            );
          }
        }
      });
    },
    deleteImg(index) {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "确定删除这张照片吗？",
        confirmColor: "#c6ae6c",
        success(res) {
          if (res.confirm) {
            that.tempFilePathsArr.splice(index, 1);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    // 小程序图片预览
    previewImage: function(e, item) {
      console.log("item" + JSON.stringify(item));
      wx.previewImage({
        current: item, // 当前显示图片的http链接
        urls: this.tempFilePathsArr // 需要预览的图片http链接列表
      });
    },
    // 提交审核
    toUpload() {
      if (this.tempFilePathsArr.length === 0) {
        wx.showToast({
          title: "请上传图片",
          icon: "none",
          duration: 2000
        });
        return false;
      }
      // 接下来做自己的操作
      // this.tempFilePathsArr 图片数组
    },
    chooseimage() {
    
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths
          wx.setStorageSync("TempFilePaths", tempFilePaths);
          var tempFilePath = res.tempFilePaths[0];
          new AV.File("file-name", {
            blob: {
              uri: tempFilePath
            }
          })
            .save()
            .then(file => console.log(file.url()))
            .catch(console.error);
        }
      });
    }
  },
  mounted() {
    
  },
  onShow() {
    try {
      var value = wx.getStorageSync("Cname"); //拿到存储的数据，使用同步的概念,奇怪的是必须用大写字母开头的命名
      var id = wx.getStorageSync("Cid");
      console.log("Cname", value);
      console.log("Cid", id);
      // 第一个参数是 className，第二个参数是 objectId
      var todo = AV.Object.createWithoutData("_User", id);

      todo
        .fetch()
        .then(todo => {
          console.log("当前user：", todo.toJSON());
          this.live = todo.toJSON().live[2];
          this.wantgo = todo.toJSON().wantgo[2];
          this.oneword = todo.toJSON().oneword;
          this.playtime = todo.toJSON().play.substring(0, 10); //截取时间的前11位
          this.borntime = todo.toJSON().born.substring(0, 10);

          console.log("live", this.live);
        })
        .catch(function(error) {
          // 异常处理
          console.error(error);
        });

      if (value) {
        this.username = value;
        console.log("Cid", id);
      }
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
  background-image: linear-gradient(
    to bottom,
    rgba(87, 87, 87, 0),
    rgba(2, 2, 2, 0.93)
  );
}

.zuoxia {
  margin-top: 60%;
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
  background-color: #431c60;
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
img {
  width: 80rpx;
  height: 80rpx;
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
