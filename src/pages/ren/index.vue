<template>
  <div class="page">
    <div class="page__hd" v-if="step1==0">
      <div class="page__title">STEP 1/2</div>
      <div class="page__desc">旅行，从这一步开始</div>
    </div>
    <div class="page__hd" v-if="step1 == 1">
      <div class="page__title">STEP 2/2</div>
      <div class="page__desc">马上开始！</div>
    </div>
    <div class="page__bd">
      <div class="weui-cells__title">带*为必填</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input" v-if="step1==0">
          <div class="weui-cell__hd">
            <div class="weui-label">昵称*</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="Username" :placeholder="Username">
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode" v-if="step1==0">
          <div class="weui-cell__hd">
            <div class="weui-label">手机*</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="mobilePhoneNumber">
          </div>
          <!-- <div class="weui-cell__ft">
                <div class="weui-vcode-btn">获取验证码</div>
          </div>-->
        </div>
        <div class="weui-cell weui-cell_input" v-if="step1==0">
          <div class="weui-cell__hd">
            <div class="weui-label">生日*</div>
          </div>
          <div class="weui-cell__bd">
            <picker
              mode="date"
              value="born"
              start="1900-09-01"
              end="2046-09-01"
              @change="bindDateChange"
            >
              <div class="weui-input">{{bornraw}}</div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_select" v-if="step1 == 0">
          <div class="weui-cell__hd weui-cell__hd_in-select-after">
            <div class="weui-label">故乡</div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="region" value="home" @change="HomeChange">
              <div class="weui-select weui-select_in-select-after" type="default">{{home}}</div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_select" v-if="step1 == 1">
          <div class="weui-cell__hd weui-cell__hd_in-select-after">
            <div class="weui-label">想去/招募地点</div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="region" value="city" @change="CityChange">
              <div class="weui-select weui-select_in-select-after" type="default">{{city}}</div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input" v-if="step1 == 1">
          <div class="weui-cell__hd">
            <div class="weui-label">打工/招募时间</div>
          </div>
          <div class="weui-cell__bd">
            <picker
              mode="date"
              value="playtime"
              start="1900-09-01"
              end="2046-09-01"
              @change="bindplaytimeChange"
            >
              <div class="weui-input" placeholder>{{playtime}}</div>
            </picker>
          </div>
        </div>
        <!-- <div class="weui-cell weui-cell_input">
                        <div class="weui-cell__hd">
                            <div class="weui-label">时间</div>
                        </div>
                        <div class="weui-cell__bd">
                            <picker mode="time" value="time" start="09:01" end="21:01" @change="bindTimeChange">
                                <div class="weui-input">{{time}}</div>
                            </picker>
                        </div>
        </div>-->
        <!-- <div class="weui-cell weui-cell_input weui-cell_vcode">
                        <div class="weui-cell__hd">
                            <div class="weui-label">验证码</div>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" placeholder="请输入验证码" />
                        </div>
                        <div class="weui-cell__ft">
                            <image class="weui-vcode-img" src="/static/images/vcode.jpg" style="width: 108px" />
                        </div>
        </div>-->
      </div>
      <div class="weui-cells__title" v-if="step1==0">一句话介绍*</div>
      <div class="weui-cells weui-cells_after-title" v-if="step1==0">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class v-model="oneword" placeholder="向这个世界表达你的心情与观点" style="height: 3.3em"/>
            <!-- <div class="weui-textarea-counter">0/200</div> -->
          </div>
        </div>
      </div>
      <button href @click="login" class="weui-btn" type="primary">NEXT</button>
      <checkbox-group @click="bindAgreeChange">
        <label class="weui-agree" for="weuiAgree">
          <div class="weui-agree__text">
            <checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" checked="isAgree"/>
            <!-- <div class="weui-agree__checkbox-icon">
              <icon
                class="weui-agree__checkbox-icon-check"
                type="success_no_circle"
                size="9"
                v-if="isAgree"
              ></icon>
            </div>-->
            点击下一步即代表您同意我们的
            <navigator url class="weui-agree__link">《服务条款》</navigator>
          </div>
        </label>
      </checkbox-group>
    </div>
  </div>
</template>


<script>
var AV = require("leancloud-storage");

export default {
  data() {
    return {
      step1: 0,
      date: "",
      playtime: "",
      userInfo: {},
      region: ["广东省", "广州市", "海珠区"],
      home: ["西藏自治区", "林芝地区", "墨脱县"],
      city: ["西藏自治区", "林芝地区", "墨脱县"],
      isAgree: true,
      toggle: true,
      Password: "",
      Username: "",
      Email: "",
      mobilePhoneNumber: "15538297592",
      oneword: "",
      bornraw: "",
      born: ""
    };
  },
  methods: {
    login() {
      // try {
      //   let value = wx.getStorageSync("Cname"); //拿到存储的数据，使用同步的概念,奇怪的是必须用大写字母开头的命名
      //   if (value) {
      //     // this.isShow = false; // 判断订单也是否有数据，没有数据则用v-show引用一个组件去渲染页面
      //     this.username = value;
      //     console.log("cname", value);
      //     //数据渲染页面
      //   }
      // } catch (e) {
      //   console.log(e);
      // }
      const user = AV.User.current();
      // user.setPassword(this.Password);
      user.setUsername(this.Username);
      user.set("live", this.home);
      // user.set("liveprovince", this.home[0]);
      // user.set("livecity", this.home[1]);
      // user.set("liveregion", this.home[2]);
      user.set("wantgo", this.city);
      // user.set("wantgoprovince", this.city[0]);
      // user.set("wantgocity", this.city[1]);
      // user.set("wantgoregion", this.city[2]);
      user.set("oneword", this.oneword);
      user.set("born", this.born);
      user.set("play", this.play);
      user.setMobilePhoneNumber(this.mobilePhoneNumber);
      // user.setEmail(this.Email);
      user
        .save()
        .then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息
          this.globalData.user = user.toJSON();
          console.log(user);
        })
        .catch(error => {
          wx.showModal({
            content: "请检查您输入内容格式是否正确",
            showCancel: false,
            success: res => {
              if (res.confirm) {
                this.step1 = this.step1 - 1;
                console.log("用户点击确定");
              }
            }
          });
          console.log(1, error);
        });
      this.step1 = this.step1 + 1;
      if (this.step1 == 2) {
        wx.showToast({
          title: "成功",
          icon: "success",
          duration: 2000
        });
        wx.navigateTo({url: '../rendetail/main'});
      }
    },

    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({
        url
      });
    },
    // getUserInfo() {
    //   // 调用登录接口
    //   wx.login({
    //     success: () => {
    //       wx.getUserInfo({
    //         success: res => {
    //           this.userInfo = res.userInfo;
    //         }
    //       });
    //     }
    //   });
    // },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    bindDateChange(e) {
      this.bornraw = e.mp.detail.value;
      this.born = new Date(e.mp.detail.value);
      console.log(e.mp.detail.value);
      console.log(this.born);
    },
    bindplaytimeChange(e) {
      this.playtime = e.mp.detail.value;
      this.play = new Date(this.playtime);
    },
    bindTimeChange(e) {
      this.time = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    CityChange(e) {
      this.city = e.mp.detail.value;
      console.log("you wantgo：" + e.mp.detail.value);
    },
    HomeChange(e) {
      this.home = e.mp.detail.value;
      console.log("you live：" + e.mp.detail.value);
    },
    bindAgreeChange(e) {
      this.isAgree = !this.isAgree;
    },
    onGotUserInfo(e) {
      // console.log(e.detail.errMsg);
      // console.log(e.detail.userInfo);
      // console.log(e.detail.rawData);
    },
    tog(e) {
      this.toggle = !this.toggle;
      console.log(this.toggle);
    }
  },
  created() {
    const user = AV.User.current();
    this.Username = user.attributes.username;
    console.log(this.Username);

    // this.getUserInfo();
  },
  computed: {}
};
</script>

<style scoped>
