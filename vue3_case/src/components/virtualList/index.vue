<template>
  <!-- 最外层的滚动容器 -->
  <div class="virtual-list_container" ref="container" @scroll="scrollEvent">
    <!-- 用来设置虚拟高度，让外面的容器可以滚动 -->
    <div class="virtual-list_phantom" :style="{ height: listHeight + 'px' }">
      <!-- 实际渲染的dom -->
      <div class="virtual-list_content" :style="{ transform: getTransform }">
        <div
          ref="items"
          class="infinite-list-item"
          v-for="(item) in visibleData"
          :key="item.userId"
        >
        <span style="color: red;">{{ item.i+1 }}</span>
          {{ item.address }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { faker } from '@faker-js/faker'

/* 
虚拟列表的本质就是通过设置可视元素的便偏移量来实现虚拟滚动

*/

const props = withDefaults(
  defineProps<{
    listData?: Array<any&{i:number}>
    itemSize?: number
  }>(),
  {
    listData: () =>
      faker.helpers.multiple(
        function createRandomUser() {
          return {
            userId: faker.string.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past(),
            address: faker.word.words({count:{max:50,min:10}}),
          }
        },
        { count: 1000 }
      ).map((s,i)=>({...s,i})),
    itemSize: 40,
  }
)

const container = ref<HTMLDivElement>()
const startOffset = ref<number>(0)
// 容器的可滚动总高度
const listHeight = computed(() => props.listData.length * props.itemSize)
// 可视化高度
const screenHeight = ref<number>(0)

const offset = reactive({
  start: 0,
  end: 0,
})
// 可显示的列表数量
const visiable = computed(() => Math.ceil(screenHeight.value / props.itemSize))

// 滚动的距离
const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`)

// 显示的数据
const visibleData = computed(() =>
  props.listData.slice(
    offset.start,
    Math.min(props.listData.length, offset.end)
  )
)
onMounted(() => {
  screenHeight.value = container.value?.offsetHeight!
  // 初始化数据
  offset.end = offset.start + visiable.value
})

const scrollEvent = () => {
  //当前滚动位置
  let scrollTop = container.value?.scrollTop || 0
  //此时的开始索引
  offset.start = Math.floor(scrollTop / props.itemSize)
  //此时的结束索引
  offset.end = offset.start + visiable.value
  //此时的偏移量
  startOffset.value = scrollTop - (scrollTop % props.itemSize)
}
// console.log('data: ', data.value);
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
<style scoped lang="scss">
.virtual-list {
  &_container {
    border: 1px solid #ccc;
    width: 500px;
    height: 600px;
    margin: 30px auto;
    overflow-y: scroll;
  }
  &_phantom {
  }
  &_content {
    .infinite-list-item {
      border-bottom: 2px solid #ccc;
    }
  }
}
</style>
