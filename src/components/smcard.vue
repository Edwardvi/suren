<template>
    <a class="userinfo" href="/pages/rendetail/main" >
      <div class="Base-Chip-for-User"  :key="index" v-for="(users, index) in list">
        <div class="Avatar"> 
        </div>
        <div class="Nora-Bravo" >{{user.attributes.email}}<card :text="motto"></card>
        </div>
        <div class="yijuhua">{{usersemail}}
        </div>    
      </div>
    </a>
</template>

<script>
import card from "@/components/card";
var AV = require("leancloud-storage");
export default {
  data() {
    return {
      motto: [],
      users: [],
      list: []
    };
  },

  components: {
    card
  },
  props: ["usersemail", "usersemail"],
  methods: {
    qq() {
      var query = new AV.Query("_User");
      var now = new Date();
      query.lessThanOrEqualTo("createdAt", now);
      query.limit(5);
      query
        .find()
        .then(results => {
          this.list = results;
          console.log(this.list);
          console.log(this.users);
        })
        .catch(function(error) {
          // catch 方法写在 Promise 链式的最后，可以捕捉到全部 error
          console.error(error);
        });
    }
  },
  mounted() {
    this.qq();
    
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
