<template>
  <div>
    <div class="weui-cells__title">带*为必填</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">昵称*</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="Username" :placeholder="userInfo.nickName">
        </div>
      </div>
      <div class="weui-cell weui-cell_input weui-cell_vcode">
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
      <div class="weui-cell weui-cell_input">
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
            <div class="weui-input">{{date}}</div>
          </picker>
        </div>
      </div>
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__hd weui-cell__hd_in-select-after">
          <div class="weui-label">故乡</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="region" :value="region" @change="CityChange">
            <div class="weui-select weui-select_in-select-after" type="default">{{city}}</div>
          </picker>
        </div>
      </div>
      <div class="weui-cells__title">一句话介绍*</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class v-model="oneword" placeholder="向这个世界表达你的心情与观点" style="height: 3.3em"/>
            <!-- <div class="weui-textarea-counter">0/200</div> -->
          </div>
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
  </div>
</template>
      
<script>
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
      born: null
    };
  },
  methods: {

    CityChange(e) {
      this.city = e.mp.detail.value;
      console.log("you live：" + e.mp.detail.value);
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
      this.date = e.mp.detail.value;
      this.born = new Date(this.date);
      console.log(this.date);
      console.log(this.born);
    },

    bindTimeChange(e) {
      this.time = e.mp.detail.value;
      console.log(e.mp.detail.value);
    }
  }
};
</script>
      
<style>
</style>
      