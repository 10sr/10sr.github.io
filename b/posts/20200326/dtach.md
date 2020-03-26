title: dtach
slug: dtach
date: 2020-03-26 12:35:31+09:00
type: text

GNU screen からデタッチ機能だけを切り出したようなやつ

- [datch](https://wiki.archlinux.org/index.php/Dtach)


```sh
# s.dtach というソケットで開始 C-^ でデタッチ
dtach -c s.dtach -e '^^' bash -i
# s.dtach というソケットにアタッチ
dtach -a s.dtach
# s.dtach というソケットにアタッチ なければ作る
dtach -A s.dtach -e '^^' bash -i
```
