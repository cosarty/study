# 虚拟列表的实现

## 思路一

1. 首先要构建框架结构如下

```html
<!-- 最外层的滚动容器 -->
<div class="virtual-list_container">
  <!-- 用来设置虚拟高度，让外面的容器可以滚动 -->
  <div class="virtual-list_phantom">
    <!-- 实际渲染的dom -->
    <div class="virtual-list_content"></div>
  </div>
</div>
```
