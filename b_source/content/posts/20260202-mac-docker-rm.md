---
title: Mac の docker がストレージを使うので空ける
date: 2026-02-02 15:39:01+09:00
---

以下を実行する。

```console
$ docker rm $(docker ps -a -q)
$ docker rmi $(docker images -q)
$ docker volume rm $(docker volume ls |awk '{print $2}')
$ rm -rf ~/Library/Containers/com.docker.docker/Data/*
```

[Docker for Macを使っているとストレージ容量不足になる問題をなんとかする #Docker - Qiita](https://qiita.com/ktsujichan/items/726e0f896e30b355fee1)
