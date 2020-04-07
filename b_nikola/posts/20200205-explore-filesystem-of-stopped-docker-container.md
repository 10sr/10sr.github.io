---
title: Explore filesystem of stopped docker container
slug: explore-filesystem-of-stopped-docker-container
date: 2020-02-05 13:56:40+09:00
type: text
---

停止したコンテナにあったファイルをみたい。

以下のようにするとできる。

```shellscript
# コンテナの ID を探す（先頭のハッシュ）
docker ps -a | grep NAME

# 新しくイメージを作成する
docker commit CONTAINER_ID t

# 実行
docker run -it t bash -i
```


参考

- [linux - Exploring Docker container's file system - Stack Overflow](https://stackoverflow.com/questions/20813486/exploring-docker-containers-file-system#20816397)
