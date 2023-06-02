<script setup lang="ts">


</script>

<template>
  <div
    class="selection:bg-fuchsia-300 selection:text-fuchsia-900 space-y-2 max-w-max mx-auto focus-within:border-indigo-700 focus-within:border-2">

    <div v-for="num in 5" :key="num" class=" first-of-type:text-amber-600 first-of-type:bg-yellow-100">{{ num }}</div>

    <h1 class="text-3xl font-bold underline text-red-600">
      Hello world!
    </h1>

    <h2 class="h2">fffff</h2>

    <button
      class="hover:bg-sky-700 bg-blue-500  text-white font-bold py-2 px-4 rounded-3xl focus:ring-violet-300 focus:ring">按钮</button>

    <input id="draft" class="peer/draft block" type="checkbox" name="status" />

    <label for="draft" class="peer-checked/draft:text-sky-500 block">Draft</label>

    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
      Email
    </span>

    <input type="file" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    " />
  </div>

  <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <div v-for="num in 5" :key="num" class="bg-yellow-100">{{ num }}</div>
  </div>

  <div class="portrait:hidden">
    显示显示
  </div>
  <div class="landscape:hidden">
    <p>
      This experience is designed to be viewed in landscape. Please rotate your
      device to view the site.
    </p>
  </div>
  <ul role="list">

    <li v-for="num in 5" :key="num" class="lg:[&:nth-child(3)]:hover:underline [&:nth-child(1)]:content-auto ">{{ num }}</li>

  </ul>
  <div class="[&_p]:mt-4">
    个梵蒂冈
    <p>Lorem ipsum...</p>

    <ul>
      <li>
        <p>Lorem ipsum...</p>
      </li>

    </ul>
  </div>

  <button class="btn-primary">按钮</button>
</template>

<style scoped lang="scss">
.h2 {
  color: red;
}

.btn-primary {
    @apply py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
</style>
