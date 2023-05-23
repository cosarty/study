# 测试

{{ 1+1 }}

<span v-for="i in 3" >{{ i }}</span>


<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
const data = useData()
console.log('data: ', data);
const count = ref(0)
</script>


The count is: {{ count }}

<button  @click="count++">Increment</button>

```js-vue
Hello {{ 1 + 1 }}
```