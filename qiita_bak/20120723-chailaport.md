---
title: chaikaのportを自動的に変える
tags: keysnail JavaScript
author: 10sr
slide: false
---
特にsuspendから復帰した時とか、chaikaが使えなくなることがたまにある。
使うportを変えればいいという話をどこかで見た気がした。
以下を _keysnail.js に追加。

```js
// change chaika port every time firefox starts
util.setIntPref("extensions.chaika.server_port.firefox",
                8800 + Math.floor(Math.random() * 30));
```


