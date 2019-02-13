<template>
    <a :href="detailUrl" class="userinfo" :data-current="this.u" @click="ddd" >
      <ul class="Base-Chip-for-User"  >
        <div class="Avatar" > 
        </div>
        <li class="Nora-Bravo" >{{uuname}}
          <card :text="motto"></card>
        </li>
        <div class="yijuhua">{{uuoneword}}
        </div>    
      </ul>
    </a>
</template>

<script>
import card from "@/components/card";
var AV = require("leancloud-storage");
export default {
  props: ["u", ""],
  data() {
    return {
      motto: [],
      uuname: [],
      uuoneword: [],
      uid: []
    };
  },

  components: {
    card
  },

  methods: {
    ddd(e) {
      let current = e.currentTarget.dataset.current;
      console.log("333", e.currentTarget.dataset.current);

      console.log(this.u);
    
      const currentUname = this.u.attributes.username; //mac下用这行可以获得username，同时在html里把u变为this.u
      const currentUid = this.u.id; 
      try {
        wx.setStorageSync("Cname", currentUname);//把用户名存入本地。
        wx.setStorageSync("Cid", currentUid);//把用户id存入本地。
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    detailUrl() {
      return "/pages/rendetail/main?id=" + this.u;
      console.log("111", this.u);
    }
  },
  mounted() {
    this.uuname = this.u.attributes.username;
    this.uuoneword = this.u.attributes.oneword;  
  }
};
</script>

<style>
.userinfo {
  display: flex;
  margin: 4px;
}

.Base-Chip-for-User {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
  background-color: #f08bc3;
  width: 164px;
  height: 180px;
  mix-blend-mode: undefined;
  border-radius: 2px;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: #ffffff;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.55);
}

.Avatar {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  mix-blend-mode: undefined;
  background: pink;
}

.Nora-Bravo {
  display: block;
  width: 138px;
  height: 15px;
  mix-blend-mode: undefined;
  font-size: 15px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.93;
  letter-spacing: normal;
  text-align: center;
  color: #454545;
}

.yijuhua {
  display: block;
  width: 136.9px;
  height: 47.7px;
  mix-blend-mode: undefined;
  font-family: Runda;
  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.3;
  letter-spacing: normal;
  text-align: center;
  color: #8b8b8b;
}
</style>
