<template>
  <div class="container" @click="clickHandle('test click', $event)">
   <smcard></smcard>
   <smcard></smcard>
   <smcard></smcard>
   <smcard></smcard>
   <smcard></smcard>
   <smcard></smcard>
   <smcard></smcard>
   <smcard></smcard>
   <smcard></smcard>
   <smcard></smcard>

  </div>
</template>

<script>
import card from "@/components/card";
import smcard from "@/components/smcard";
var AV = require("leancloud-storage");
var query = new AV.Query("_User");
query.get("5b9a0eea1579a3003a4154d3").then(
  function(todo) {
    // 成功获得实例
    console.log(todo);
    // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
  },
  function(error) {
    // 异常处理
  }
);




export default {
  components: {
    card,
    smcard
  },

  methods: {
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    // qq() {
    //   var query = new AV.Query("_User");
    //   var now = new Date();
    //   query.lessThanOrEqualTo("createdAt", now).then(
    //     function(todo) {},
    //     function(error) {
    //       // 异常处理
    //     }
    //   ); //查询今天之前创建的 Todo
    //   query.limit(10); // 最多返回 10 条结果
    //   console.log(todo);
    //   console.log("11122");
    // }
  },
  cerated() {
//     async qq => {
//   var query = new AV.Query("_User");
//   var now = new Date();
//   ss => query.lessThanOrEqualTo("createdAt", now);
//   const zz = await  ss();
//   return 
//     console.log(zz);
// };
//     qq();
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
