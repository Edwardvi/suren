<template>
  <div class="container">
    <div class="Top">
      <div class="zuoxia">
        <div class="name">嘿嘿</div>
        <div class="dizhi">长安城，宋朝</div>
        <div class="sixin">
          <a class='center' href="">私信</a>
        </div>
      </div>

    </div>
    <div class="bar">
      <block v-for="(item,index) in tabs" :key="index">
        <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
          <div class="weui-navbar__title">{{item}}</div>
        </div>
      </block>
      <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
    </div>
    
    <div class="weui-tab__panel">
      <div class="weui-tab__content" :hidden="activeIndex != 0">
          <pic></pic>
      </div>
      <div class="weui-tab__content"  :hidden="activeIndex != 1">
        <div class="mid">
          <midcard ></midcard>
          <midcard></midcard>
          <midcard></midcard>
          <midcard></midcard>
        </div>

      </div>
      <div class="" :hidden="activeIndex != 2">选项三的内容</div>
    </div>
  </div>
</template>

<script>
import pic from '@/components/pic';
import midcard from '@/components/midcard';

export default {
  components: {
    pic,
    midcard
  },
  data(){
    return{
      tabs: ["相册", "收藏的宿", "过往"],
      activeIndex: 0,
      fontSize: 30
    }
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex == 2) {
        return 'weui-navbar__slider_2'
      }
    }
  },
  methods: {
    tabClick(e) {
      console.log(e);
      this.activeIndex = e.currentTarget.id;
    }
  },

  
}
</script>
<style scoped>
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
  width: 100%
}

.Top {
  width: 100%;
  height: 320px;
  background-image: linear-gradient(to bottom, rgba(87, 87, 87, 0), rgba(2, 2, 2, 0.93));
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
  flex-flow:row wrap;
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
  color: #a648eb
  
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
  justify-content: center
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
  left:29rpx;
  transform: translateX(500rpx);
}
</style>
