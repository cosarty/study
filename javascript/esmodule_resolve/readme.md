
# 详解 moduleResolution

## 什么是 moduleResolution

当我们讨论**模块化标准**（对应的英文术语 `module`），我们更多的是讨论一个模块是如何声明使用导入/导出的语法。具体来说：

- commonjs 使用 require 来导入，exports.xxx 来导出
- esm 使用 import/export，使用 import('xxx') 来动态导入模块

而**模块解析策略**（ moduleResolution）更多描述的是一个模块包括相对路径以及非相对路径（也就是第三方库，亦或者说 npm 包）是按照怎样的规则去查找的。相对路径没什么复杂的，不做讨论，本文主要聊聊第三方库的解析。

我们最熟悉的模块解析策略其实是 nodejs 的模块解析策略。第一次了解到还有别的模块解析策略还是在我刚学习 `typescript` 的时候。模块解析策略可以使用 `tsconfig.json` 的 `moduleResolution` 选项来配置，最早只支持两个值：`classic` 和 `node`。`node` 策略在 `typescript` 中又称之为`node10` 的解析策略。



