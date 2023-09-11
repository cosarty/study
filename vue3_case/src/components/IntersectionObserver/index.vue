<template>
  <div class="intersection-demo">

    <UseElementVisibility v-for="num in 10" class="sub" :key="num" #default="{ isVisible, nowDate }">
      <div :class="{ active: isVisible, }" :style="{transitionDelay:nowDate <= 100?`${num*0.2}s`:'0.3s'}">
        {{ num }}:{{ isVisible }}:{{ nowDate <= 100 }} </div>
    </UseElementVisibility>
    <!-- <div ></div> -->
  </div>
</template>

<script setup lang="ts">

import { useIntersectionObserver, UseElementVisibility } from '@/composables/useIntersectionObserver'



// nextTick(() => {
//   useIntersectionObserver(document.querySelector('.intersection-demo .sub:nth-child(7)')!, ([{ isIntersecting }], el) => {

//     console.log('el: ', el);
//     console.log('isIntersecting: ', isIntersecting);

//   })
// })


</script>

<style scoped lang="scss">
.intersection-demo {
  width: 800px;
  margin: 0 auto;

  // height: 400px;
  // overflow-y: scroll;

  .sub {
    >div {
      height: 200px;
      margin-bottom: 25px;
      background-color: skyblue;
      transform: translateX(-50%);
      opacity: 0;
      transition: all .5s ease 0.3s;

      &.show {
        transition: none;

      }

      &.active {

        opacity: 1;
        transform: translateX(0);
      }
    }

  }
}
</style>
