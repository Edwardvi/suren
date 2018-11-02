<template>
  <div class="container" @click="clickHandle('test click', $event)">
    
   <smcard></smcard>

   

  </div>
</template>

<script>
import card from "@/components/card";
import smcard from "@/components/smcard";
var AV = require("leancloud-storage");
// var query = new AV.Query("_User");
// query.get("5b9a0eea1579a3003a4154d3").then(
//   function(todo) {
//     // 成功获得实例
//     console.log(todo);
//     // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
//   },
//   function(error) {
//     // 异常处理
//   }
// );

export default {
  components: {
    card,
    smcard
  },
  data() {
    return {
      list: []
    };
  },

  methods: {
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    fetchTodos: function(user) {
      console.log("uid", user.id);
      const query = new AV.Query(Todo)
        .equalTo("user", AV.Object.createWithoutData("User", user.id))
        .descending("createdAt");
      const setTodos = this.setTodos.bind(this);
      return AV.Promise.all([query.find().then(setTodos), query.subscribe()])
        .then(([todos, subscription]) => {
          this.subscription = subscription;
          if (this.unbind) this.unbind();
          this.unbind = bind(subscription, todos, setTodos);
        })
        .catch(error => console.error(error.message));
    }
  },

  created() {
    // query.select(["username", "email"]);
    // query.first().then(
    //   function(todo) {
    //     console.log(todo.get("username")); // √ 此段代码为获取特定属性
    //     console.log(todo.get("email")); // √
    //     console.log(todo.get("location")); // undefined
    //   },
    //   function(error) {
    //     // 异常处理
    //   }
    // );
  }
};
</script>


<style scoped>
.container {
  background-color: #261136;
  padding: 20px 0;
  display: flex;
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
