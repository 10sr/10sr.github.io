---
title: Jenkins にインストールされたプラグインの一覧を取得する
date: 2020-10-05 07:03:29+09:00
---


スクリプトコンソールなどで以下を実行する

```groovy
def plugins = jenkins.model.Jenkins.instance.getPluginManager().getPlugins()
plugins.each {println "${it.getShortName()}: ${it.getVersion()}"}
```
