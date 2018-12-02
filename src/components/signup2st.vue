<template>
  <div>
    <div class="weui-cell weui-cell_input">
      <div class="weui-cell__hd">
        <div class="weui-label">空闲时间/招工时间</div>
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
    <div class="weui-cell weui-cell_select">
      <div class="weui-cell__hd weui-cell__hd_in-select-after">
        <div class="weui-label">期望地/招募地</div>
      </div>
      <div class="weui-cell__bd">
        <picker class="weui-btn" mode="region" :value="region" @change="CityChange">
          <div class="weui-select weui-select_in-select-after" type="default">{{city}}</div>
        </picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "09:01",
      date: "",
      playtime: "",
      userInfo: {},
      region: ["广东省", "广州市", "海珠区"],
      city: [],
      isAgree: true,
      toggle: true,
      Password: "",
      Username: "",
      Email: "",
      mobilePhoneNumber: "",
      oneword: "",
      next: false,
      born: ""
    };
  },
  methods: {
    bindplaytimeChange(e) {
      this.playtime = e.mp.detail.value;
      this.play = new Date(this.playtime);
    },
    CityChange(e) {
      this.city = e.mp.detail.value;
      console.log("you want：" + e.mp.detail.value);
    }
  }
};
</script>

<style>
</style>
