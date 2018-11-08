<template>
    <a :href="detailUrl" class="userinfo"  >
      <ul class="Base-Chip-for-User"  >
        <div class="Avatar" > 
        </div>
        <li class="Nora-Bravo" >{{u.username}}
          <card :text="motto"></card>
        </li>
        <div class="yijuhua">{{u.email}}
        </div>    
      </ul>
    </a>
</template>

<script>
import card from "@/components/card";
var AV = require("leancloud-storage");
export default {
  props: ['u', "username"],
  data() {
    return {
      motto: [],
      username: [],
      list: [],
      uid: []
    };
  },

  components: {
    card
  },

  methods: {

  },
  computed: {
    detailUrl() {


      // return "/pages/rendetail/main?id=" + this.username;
      console.log("111",this.username)
    }
  },
  mounted() {
    
  },
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
