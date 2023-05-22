# Fetch Api

::: info

- fetch是javascript提供的一个全局接口，用于发起http请求

- fetch和`XMLHttpRequest`一样，都是用来跨网络异步获取资源。但`fetch`比起`XMLHttpRequest()` 使用起来更简洁、方便

:::



## 差别

> 1. `fetch()`使用 Promise ，不使用回调函数，因此大大简化了写法，写起来更简洁。

> 2. `fetch()`采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码

> 3. `fetch()`通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件更实用。而 `XMLHTTPRequest` 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次读出来。

> 4. 从 `fetch()` 返回的 Promise **不会被标记为 reject，** 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 `ok` 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。

> 5. `fetch` 默认**不会发送 cookies**。除非开启了`credentials`

### 一.  基本使用

`fetch()`接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。

```javascript
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  })
  .catch(function(error) {
    console.log(error)
  })
```



上面示例中，`fetch()`接收到的`response`是一个 Stream 对象，`response.json()`是一个异步操作，取出所有内容，并将其转为 JSON 对象。

也可以传入第二个可选参数，用来配置 `初始化` 对象,(详细配置参考:  [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch)：

```javascript
fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
```

### 二. Response对象

`fetch()`请求成功以后，得到的是一个 Response 对象。它对应服务器的 HTTP 回应。

response 包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，对应 HTTP 回应的标头信息（Headers），可以立即读取。

```javascript
async function fetchRequest() {
  const response = await fetch(url);
  console.log(response.status); 
  console.log(response.statusText);
}
```

上面示例中，`response.status`和`response.statusText`就是 Response 的同步属性，可以立即读取。

### 分块加载

```javascript
 const res = await fetch('https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt')
  let txt = ''
  const reader = res.body!.getReader()
  const decoder = new TextDecoder('utf-8')
  while (true) {
    const { done, value } = await reader.read()
    if (done) break;
    txt += decoder.decode(value)
    console.log('data: ', txt);
  }
```



response  有以下属性：

`Response.ok`属性返回一个布尔值，表示请求是否成功，`true`对应 HTTP 请求的状态码 200 到 299，`false`对应其他的状态码

`Response.status`属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）

`Response.statusText`属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）

`Response.url`属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。

`Response.type`属性返回请求的类型。可能的值如下：

- `basic`：普通请求，即同源请求。
- `cors`：跨域请求。
- `error`：网络错误。

`Response.redirected`属性返回一个布尔值，表示请求是否发生过跳转。

 Response.headers 属性：

`Response.headers`属性，指向一个 Headers 对象，对应 HTTP 回应的所有标头。

Headers 对象可以使用`for...of`循环进行遍历。

```javascript
const response = await fetch(url);

for (let [key, value] of response.headers) { 
  console.log(`${key} : ${value}`);  
}
```

Headers 对象提供了以下方法，用来操作标头：

> - `Headers.get()`：根据指定的键名，返回键值。
> - `Headers.has()`： 返回一个布尔值，表示是否包含某个标头。
> - `Headers.set()`：将指定的键名设置为新的键值，如果该键名不存在则会添加。
> - `Headers.append()`：添加标头。
> - `Headers.delete()`：删除标头。
> - `Headers.keys()`：返回一个遍历器，可以依次遍历所有键名。
> - `Headers.values()`：返回一个遍历器，可以依次遍历所有键值。
> - `Headers.entries()`：返回一个遍历器，可以依次遍历所有键值对（`[key, value]`）。
> - `Headers.forEach()`：依次遍历标头，每个标头都会执行一次参数函数。

读取`Response`对象的方法：

`Response`对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

- `response.text()`：得到文本字符串。
- `response.json()`：得到 JSON 对象。
- `response.blob()`：得到二进制 Blob 对象。
- `response.formData()`：得到 FormData 表单对象。
- `response.arrayBuffer()`：得到二进制 ArrayBuffer 对象。

注意： 上面5个读取方法都是异步的，返回的都是 Promise 对象。

Response.clone() 方法

> Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。

```javascript
let text =  await response.text();
let json =  await response.json();  // 报错
```

上面示例先使用了`response.text()`，就把 Stream 读完了。后面再调用`response.json()`，就没有内容可读了，所以报错。

Response 对象提供`Response.clone()`方法，创建`Response`对象的副本，实现多次读取。

```javascript
const response1 = await fetch('flowers.jpg');
const response2 = response1.clone();

const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();

image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);

```

上面示例中，`response.clone()`复制了一份 Response 对象，然后将同一张图片读取了两次。

Response.body 属性

> `Response.body`属性是 Response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作。

### 三： fetch()完整配置

| 键             | 值                                                           |
| -------------- | ------------------------------------------------------------ |
| body           | 指定使用请求体时请求体的内容 必须是 Blob、BufferSource、FormData、URLSearchParams、ReadableStream 或 String 的 实例 |
| cache          | 用于控制浏览器与 HTTP缓存的交互。要跟踪缓存的重定向，请求的 redirect 属性值必须是"follow"， 而且必须符合同源策略限制。必须是下列值之一  Default  1 fetch()返回命中的有效缓存。不发送请求; 2 命中无效（stale）缓存会发送条件式请求。如果响应已经改变，则更新缓存的值。然后 fetch() 返回缓存的值 no-store  1 浏览器不检查缓存，直接发送请求  2 不缓存响应，直接通过 fetch()返回  reload  1浏览器不检查缓存，直接发送请求  2 缓存响应，再通过 fetch()返回  no-cache  1 无论命中有效缓存还是无效缓存都会发送条件式请求。如果响应已经改变，则更新缓存的值。然 后 fetch()返回缓存的值  2 未命中缓存会发送请求，并缓存响应。然后 fetch()返回响应  force-cache  1 无论命中有效缓存还是无效缓存都通过 fetch()返回。不发送请求  2 未命中缓存会发送请求，并缓存响应。然后 fetch()返回响应  only-if-cached  1 只在请求模式为 same-origin 时使用缓存  2 无论命中有效缓存还是无效缓存都通过 fetch()返回。不发送请求  3 未命中缓存返回状态码为 504（网关超时）的响应 默认为 default |
| credentials    | 用于指定在外发请求中如何包含 cookie。与 XMLHttpRequest 的 withCredentials 标签类似 必须是下列字符串值之一  1 omit：不发送 cookie  2 same-origin：只在请求 URL 与发送 fetch()请求的页面同源时发送 cookie  3 include：无论同源还是跨源都包含 cookie  在支持 Credential Management API 的浏览器中，也可以是一个 FederatedCredential 或 PasswordCredential 的实例 默认为 same-origin |
| headers        | 用于指定请求头部  必须是 Headers 对象实例或包含字符串格式键/值对的常规对象  默认值为不包含键/值对的 Headers 对象。这不意味着请求不包含任何头部，浏览器仍然会随请求 发送一些头部。虽然这些头部对 JavaScript 不可见，但浏览器的网络检查器可以观察到 |
| integrity      | 用于强制子资源完整性  必须是包含子资源完整性标识符的字符串  默认为空字符串 |
| keepalive      | 用于指示浏览器允许请求存在时间超出页面生命周期。适合报告事件或分析，比如页面在 fetch() 请求后很快卸载。设置 keepalive 标志的 fetch()请求可用于替代 Navigator.sendBeacon()  必须是布尔值  默认为 false |
| method         | 用于指定 HTTP 请求方法  基本上就是如下字符串值：  GET   POST   PUT   PATCH   DELETE   HEAD  OPTIONS  CONNECT TARCE  默认为 GET |
| mode           | 用于指定请求模式。这个模式决定来自跨源请求的响应是否有效，以及客户端可以读取多少响应。 违反这里指定模式的请求会抛出错误  必须是下列字符串值之一  cors：允许遵守 CORS 协议的跨源请求。响应是“CORS 过滤的响应”，意思是响应中可以访问 的浏览器头部是经过浏览器强制白名单过滤的  no-cors：允许不需要发送预检请求的跨源请求（HEAD、GET 和只带有满足 CORS 请求头部的 POST）。响应类型是 opaque，意思是不能读取响应内容  same-origin：任何跨源请求都不允许发送  navigate：用于支持 HTML 导航，只在文档间导航时使用。基本用不到  在通过构造函数手动创建 Request 实例时，默认为 cors；否则，默认为 no-cors |
| redirect       | 用于指定如何处理重定向响应（状态码为 301、302、303、307 或 308） <br必须是下列字符串值之一 follow：跟踪重定向请求，以最终非重定向 URL 的响应作为最终响应  error：重定向请求会抛出错误  manual：不跟踪重定向请求，而是返回 opaqueredirect 类型的响应，同时仍然暴露期望的重 定向 URL。允许以手动方式跟踪重定向  默认为 follow |
| referrer       | 用于指定 HTTP 的 Referer 头部的内容  必须是下列字符串值之一  no-referrer：以 no-referrer 作为值   client/about:client：以当前 URL 或 no-referrer（取决于来源策略 referrerPolicy）作 为值   URL以伪造 URL 作为值。伪造 URL 的源必须与执行脚本的源匹配  默认为 client/about:client |
| referrerPolicy | 用于指定 HTTP 的 Referer 头部  必须是下列字符串值之一  no-referrer  请求中不包含 Referer 头部  no-referrer-when-downgrade  对于从安全 HTTPS 上下文发送到 HTTP URL 的请求，不包含 Referer 头部  对于所有其他请求，将 Referer 设置为完整 URL  origin   对于所有请求，将 Referer 设置为只包含源  same-origin  对于跨源请求，不包含 Referer 头部   对于同源请求，将 Referer 设置为完整 URL strict-origin  对于从安全 HTTPS 上下文发送到 HTTP URL 的请求，不包含 Referer 头部   对于所有其他请求，将 Referer 设置为只包含源  origin-when-cross-origin  对于跨源请求，将 Referer 设置为只包含源  对于同源请求，将 Referer 设置为完整 URL  strict-origin-when-cross-origin  对于从安全 HTTPS 上下文发送到 HTTP URL 的请求，不包含 Referer 头部  对于所有其他跨源请求，将 Referer 设置为只包含源  对于同源请求，将 Referer 设置为完整 URL  unsafe-url  对于所有请求，将 Referer 设置为完整 URL  默认为 no-referrer-when-downgrade |
| signal         | 用于支持通过 AbortController 中断进行中的 fetch()请求  必须是 AbortSignal 的实例  默认为未关联控制器的 AbortSignal 实例 |

