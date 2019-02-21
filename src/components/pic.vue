<template>
  <div class="piclist">
    <div class="tu" :key="index" v-for="(i, index) in xiangce">
      <img class="Avatar" :src="i" mode="aspectFill" style="background-color: #eeeeee;">
    </div>
    <a class="tu" @click="upimagestouser">+</a>
  </div>
</template>



<script>
const AV = require("leancloud-storage");

export default {
  props: ["id"],
  data() {
    return {
      user: "",
      xiangce: ""
    };
  },
  methods: {
    upimagestouser() {
      let that = this;
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          res.tempFilePaths
            .map(tempFilePath => () =>
              new AV.File("tupianwenjian", {
                blob: {
                  uri: tempFilePath
                }
              }).save()
            )
            .reduce(
              (m, p) => m.then(v => AV.Promise.all([...v, p()])),
              AV.Promise.resolve([])
            )
            .then(files => {
              const user = AV.User.current();
              files.map(file => {
                user.set("xiangce", file);
                user.save();
                console.log(user);
              });
              that.xiangce = files.map(file => file.url());
              console.log(xiangce);
            })
            .catch(console.error);
        }
      });
    }
  },
  mounted() {
    var query = new AV.Query("_User");
    query.get(this.id).then(u => {
      // this.xiangce = u.xiangce.map(file => file.url());
      console.log('xiangce',u);
    });
  }
};
</script>





<style>
.piclist {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  /* justify-content: space-between; */
}

.tu {
  display: inline-block;
  width: 24.25%;
  height: 90px;
  padding: 0.6% 0.6% 0 0;
  background: wheat;
}
</style>
