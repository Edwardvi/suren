<template>
  <div class="piclist">
    <div class="tu" :key="index" v-for="(i, index) in xiangce">
      <img class="Avatar" :src="i" :data-src="i" mode="aspectFill" @click="look">
    </div>
    <div class="tu" @click="upimagestouser">
      <a class="Avatar">+
        <br>上传照片
        <br>最多九张
      </a>
    </div>
  </div>
</template>

<script>
const AV = require("leancloud-storage");

export default {
  props: ["id"],
  data() {
    return {
      user: "",
      xiangce: "",
      isShow: true
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
              new AV.File("pengyouquan", {
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
    },
    look(e) {
      this.isShow = false //用全局变量控制返回时不重载，但是没成功
      const currentpic = e.currentTarget.dataset.src;
      wx.previewImage({
        current: currentpic, // 当前显示图片的http链接
        urls: this.xiangce // 需要预览的图片http链接列表
      });
    }
  },
  mounted() {
    if (this.isShow) {
      var query = new AV.Query("_File");
      query.equalTo("metaData", { owner: this.id });
      query.find().then(u => {
        this.xiangce = u.map(i => i.attributes.url);
        console.log("xiangce", this.xiangce);
      });
    } else {
      this.isShow = true;
      return;
    }
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
  width: 25%;
  height: 90px;
  margin-top: 1%;

  /* background: wheat; */
}
.Avatar {
  margin: auto;
  /* justify-content: center; */
}
</style>
