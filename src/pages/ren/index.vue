<template>
  <div class="page">
    <div class="page__hd" v-if="true">
      <div class="page__title">STEP 1/2</div>
      <div class="page__desc">旅行，从这一步开始</div>
    </div>
    <div class="page__bd">
      <signup1st v-if="!next"></signup1st>
      <signup2st v-if="next"></signup2st>
      <button href @click="login" class="weui-btn" type="primary">NEXT</button>
      <checkbox-group @click="bindAgreeChange">
        <label class="weui-agree" for="weuiAgree">
          <div class="weui-agree__text">
            <!-- <checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" checked="isAgree" /> -->
            <!-- <div class="weui-agree__checkbox-icon"> -->
            <!-- <icon class="weui-agree__checkbox-icon-check" type="success_no_circle" size="9" v-if="isAgree"></icon> -->
            <!-- </div> -->
            点击下一步即代表您已阅读并同意
            <navigator url class="weui-agree__link">《相关条款》</navigator>
          </div>
        </label>
      </checkbox-group>
    </div>
  </div>
</template>


<script>
import signup1st from "@/components/signup1st";
import signup2st from "@/components/signup2st";
var AV = require("leancloud-storage");

export default {
  data() {
    return {
      
      date: "",
      playtime: "",
      userInfo: {},
      region: ["广东省", "广州市", "海珠区"],
      city: [],
      Password: "",
      Username: "",
      Email: "",
      mobilePhoneNumber: "",
      oneword: "",
      next: false,
    
    };
  },
  methods: {
    login() {
      const user = AV.User.current();
      console.log(user);
      
      // user.setPassword(this.Password);
      user.setUsername(this.Username);
      user.set("live", this.city);
      user.set("liveprovince", this.city[0]);
      user.set("livecity", this.city[1]);
      user.set("liveregion", this.city[2]);
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
        })
        .catch(console.error);
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
    // this.getUserInfo();
  },
  components: {
    signup1st,
    signup2st
  },
  computed: {}
};
</script>

<style scoped>
