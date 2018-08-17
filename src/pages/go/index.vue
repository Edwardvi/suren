<template>
    <div class="container" >
      <midcard></midcard>
      <midcard></midcard>
      <midcard></midcard>
      <midcard></midcard>
    </div>
</template>


<script>
import smcard from '@/components/smcard';
import midcard from '@/components/midcard';

export default {


  components: {
    smcard,
    midcard,
  },
  props: ['text'],
};

</script>

<style scoped>
.container {
  background-color: #261136;
  padding: 20px 0;
  display: flex;
}



</style>
