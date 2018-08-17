<template>
  <div class="container">
    <div class="Top"></div>
    <div class="bar">
      <div class="GALLERY">GALLERY</div>
      <div class="GALLERY">FAV</div>
      <div class="GALLERY">HOST</div>
    </div>
    <div class="xx">
      <pic>
      </pic>
    </div>
  </div>

</template>

<script>
import pic from '@/components/pic';

export default {
  components: {
    pic
  },

  
}
</script>
<style scoped>
.container {
  padding: 0;
}

.xx {
  margin-top: 2px;
  height: 356px;
  
}

.Top {
  width: 100%;
  height: 356px;
  background-image: linear-gradient(to bottom, rgba(87, 87, 87, 0), rgba(2, 2, 2, 0.93));
}

.bar {
  display: flex;
  flex-flow:row nowrap;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  background-color: #431c60;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}

.GALLERY {
  width: 100%;
  height: 16px;
  font-family: Runda;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 3.2;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
}
</style>
