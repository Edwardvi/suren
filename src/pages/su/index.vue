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
import card from '@/components/card';
import smcard from '@/components/smcard';

export default {


  components: {
    card,
    smcard,
  },

  methods: {
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
  },
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
