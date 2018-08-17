<template>
  <div class="container" @click="clickHandle('test click', $event)">
      <div class="overlay">
          <div class="hotel">小嘿嘿民宿</div>
          <div class="address">金水区·郑州</div>
          <div class="shoucang"></div>
      </div>
      <div class="layer">207
          <div class="layer1">有这么多人想去</div>
      </div>

      <div class="layer2">三行情诗
        <div class="layer3">古藤老师欢送</div>
        <div class="layer3">古藤老师欢送</div>
        <div class="layer3">古藤老师欢送1</div>
      </div>

      <pic></pic>
      <div class="bgpic">
        <div class="bgpic-title">xiaoheihei us our good 'statu' . See 'git --help'.
        </div>
        <div class="bgpic-context">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dolorum, dolores voluptas voluptatibus molestiae nesciunt pariatur laboriosam delectus excepturi, adipisci at non sequi facilis iure, nobis quam molestias dolor et.</div>
        <div class="host">
          <div class="host-av"></div>
          <div class="host-n">
            <div class="host-name">杜泽</div>
            <div class="host-yijuhua">要去海边</div>
          </div>
        </div>
        
      </div>
      <div class="dibu">
          <a class="dibucontext">走走走，去他家打工换宿</a>
      </div>


      
  </div>
</template>

<script>
import pic from '@/components/pic';
var APP_ID = '10Ru3WJvNiOIlVYLvHejjqG1-gzGzoHsz';
var APP_KEY = 'SGci4c7EdxJRx2nMc7kRYU4E';
var AV = require('leancloud-storage');

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})

export default {
  components: {
    pic
  },

  methods: {
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
  },
};
</script>


<style scoped>
.container {
  background-color: #261136;
  padding: 0px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content:center;
  align-content:center;
  align-items:center
}

.overlay {
  width: 375px;
  height: 209px;
  opacity: 0.8;
  /* -webkit-filter: blur(5px); */
  /* filter: blur(5px); */
  background-image: linear-gradient(237deg, rgba(118, 118, 118, 0), rgba(0, 0, 0, 0.3) 55%, rgba(0, 0, 0, 0.68));
}

.hotel {
  width: 174px;
  height: 32px;
  font-family: Runda;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.46;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
  margin-top:140px;
  margin-left: 20px; 
}

.address {
  width: 75px;
  height: 15px;
  font-family: Runda;
  font-size: 11px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 3;
  letter-spacing: normal;
  text-align: left;
  color: #aab5e0;
  margin-left: 20px; 

}

.shoucang {
  width: 56px;
  height: 56px;
  background-image: linear-gradient(219deg, #7b1fa2, #7b1fa2);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.6);
  margin-left: 300px; 
  margin-top:14px;

}

.layer {
  width: 122px;
  height: 45px;
  font-family: Runda;
  font-size: 40px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.75;
  letter-spacing: normal;
  text-align: left;
  color: #8bc34a;
  margin: 12px 20px 
}

.layer1 {
  width: 122px;
  height: 17px;
  font-family: Runda;
  font-size: 11px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.73;
  letter-spacing: normal;
  text-align: left;
  color: #8b8b8b;
}

.layer2 {
  display: block;
  font-family: Runda;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.19;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
  margin: 10px 0;
}

.layer3 {
  width: 175px;
  font-family: Runda;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.5;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}

.bgpic {
  width: 335px;
  height: 528.2px;
  align-self: center;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.68), #272727);
}

.bgpic-title {
  margin: 20px;
  font-family: Runda;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.64);
}

.bgpic-context {
  margin: 20px;
  font-family: Runda;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.47;
  letter-spacing: normal;
  text-align: left;
  color: #d8d8d8;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}

.host {
  margin: 20px;
  flex-direction:row;
  justify-content: center;
  align-items: center;

}

.host-av {
  margin-right: 20px;
  width: 50px;
  height: 50px;
  background: #8bc34a;
  display: inline-block;
  
}

.host-n {
  flex-direction:column;
  display: inline-block;
}


.host-name {
  font-family: Runda;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  margin-bottom: 10px;
  text-align: left;
  color: #ffffff;
}

.host-yijuhua {  
  opacity: 0.66;
  font-family: Runda;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  margin-bottom: 6px;
  text-align: left;
  color: #ffffff;
}


.dibu {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content:center;
  width: 100%;
  height: 56px;
  background-image: linear-gradient(82deg, #4527a0, #7b1fa2);
}

.dibucontext{
  color: aliceblue;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
 
}
</style>
