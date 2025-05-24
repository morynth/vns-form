# Galgame 表单

新站需要制作一个`发表游戏`的表单页面并嵌入到静态站点。

## 技术选型

Web 框架小题大做，原生 Web 灵活性较差，表单构建器提供可视化编辑、配置灵活，因此选择构建器。

> Nuxt、Next 等 Web 框架支持单页、静态站点、全栈应用，若是架构升级选择 Nuxt、Next，可考虑用基于 Vue 或 React 的表单构建器。

## 表单构建器选择

[Form.io](https://formio.github.io)是基于 JSON Schema 的表单构建器，纯 JavaScript 实现，不依赖任何第三方库。

## 目录结构

```
./
├── data.json   数据模型
├── formio-builder.json   formio构建器的JSON对象
├── formio-data.json   formioa表单提交JSON对象
├── index.html  formio表单页面
├── original.html  原生表单页面
├── README.md
└── style.css
```

## 快速开始

1. 替换`index.html`中 JSON Schema 的提交表单 url

```json
"url": "https://example.form.io",
```

2. 浏览器打开 `index.html`，确认表单功能正常
3. 嵌入至静态站点

## NPM 安装

```sh
npm install --save @formio/js
```

```js
import { Formio } from "@formio/js";
Formio.createForm(
  document.getElementById("formio"),
  "https://examples.form.io/example"
);
```
