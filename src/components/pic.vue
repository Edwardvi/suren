<template>
  <div class="piclist">
    <div class="tu"></div> 
    <div class="tu"></div> 
    <div class="tu"></div> 
    <div class="tu"></div> 
    <a class="tu" @click="upimagetouser">+</a>
  </div>
</template>



<script>
export default {
    
}
</script>





<style>
.piclist {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between
}

.tu {
  display: inline-block;
  width: 24%;
  height: 90px;
  padding: 0.5%;
  background: wheat;
}
</style>
