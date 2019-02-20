<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <smcard :key="index" v-for="(u, index) in ulist" :u="u"></smcard>
    <!-- @click="getrendetail" -->
    <a id="login" href="../ren/main">我也要出现在上面</a>
  </div>
</template>

<script>
import card from "@/components/card";
import smcard from "@/components/smcard";
var AV = require("leancloud-storage");

export default {
  components: {
    card,
    smcard
  },
  data() {
    return {
      ulist: [],
      user: [],
      username: ""
    };
  },

  methods: {
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
    // gorendetail(username) {
    //   var query = new AV.Query("_User");
    //   query.equalTo("username", username);
    //   query
    //     .find()
    //     .then(results => {
    //       this.user = results;
    //       console.log("user:", this.user);
    //     })
    //     .catch(function(error) {
    //       console.error(error);
    //     });
    //   // href="/pages/rendetail/main"
    // },
    // fetchTodos: function(user) {
    //   console.log("uid", user.id);
    //   const query = new AV.Query(Todo)
    //     .equalTo("user", AV.Object.createWithoutData("User", user.id))
    //     .descending("createdAt");
    //   const setTodos = this.setTodos.bind(this);
    //   return AV.Promise.all([query.find().then(setTodos), query.subscribe()])
    //     .then(([todos, subscription]) => {
    //       this.subscription = subscription;
    //       if (this.unbind) this.unbind();
    //       this.unbind = bind(subscription, todos, setTodos);
    //     })
    //     .catch(error => console.error(error.message));
    // }
  },
  mounted() {
    var query = new AV.Query("_User");
    var now = new Date();
    query.lessThanOrEqualTo("createdAt", now);
    // query.include("avatar");
    query.limit(10);
    query
      .find()
      .then(results => {
        this.ulist = results;
        console.log(results[0]);

        for (let u of this.ulist) {
          // this.username = u.attributes.username;
          // this.oneword = u.get("oneword");
          console.log("ulist", this.u);
        }
        // console.log("uname", this.username);
      })
      .catch(function(error) {
        // catch 方法写在 Promise 链式的最后，可以捕捉到全部 error
        console.error(error);
      });
    // console.log("ulist", );
  },
  created() {}
};
</script>


<style scoped>
.container {
  background-color: #261136;
  padding: 20px 0;
  display: flex;
}
#login {
  color: aliceblue;
}
.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 10px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
