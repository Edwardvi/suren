<template>
    <a class="nathan" href="/pages/sudetail/main" >
      <div class="dibu">
        <div class="Brew"> 嘿嘿的民宿{{text}}
        </div>
        <div class="COFFEE">莎莎屋主{{text1}}
        </div>    
      </div>
    </a>
</template>

<script>
export default {
      props: ['text','text1'],
}
</script>





<style scoped>
.nathan {
  width: 48%;
  height: 200px;
  border-radius: 2px;
  box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.16);
  background: pink;
  display: flex;
  flex-flow: row wrap-reverse;
  margin: 3px;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  
}

.dibu {
  width: 100%;
  height: 58px;
  
  background-color: #ffffff;
  box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.16);
}

.Brew {
  font-family: Runda;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  padding-left: 10px;
  padding-top: 10px;
  letter-spacing: normal;
  text-align: left;
  color: #454545;
}

.COFFEE {
  font-family: Runda;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  padding-left: 10px;
  letter-spacing: 1px;
  text-align: left;
  color: #8e8e8e;
}


</style>

