---
title: editorconfig-emacs 使用時にエンコードエラーが発生する問題を（少し以前に）修正しました
tags: EditorConfig Emacs
author: 10sr
slide: false
---
数週間くらい前にこの問題を回避する修正をこっそり入れたのですが、よく考えたら潜在的に困ってた人は（特に日本人に）意外と多かったかもしれないと思いついたので、何がどんな感じに修正されたのかを記事として書いておきます。

どんな感じに良くなかったの
===================

editorconfig-mode を有効にし、ある条件でファイルを編集・保存すると、

```
These default coding systems were tried to encode text
in the buffer `xxxxx.txt':
  (undecided (123 . 45678))
```

というエラーが出てエンコーディングをざわざわ選択しなければならなくなり、うるさかったです。
`init.el` で `prefer-coding-system` を `utf-8` にするなどしても解決しません。

これは、ここで書かれているのとだいたい同じ問題です。
http://qiita.com/kotatsu360/items/4f2b6b0b63b77cc8f889
以前 `charset` 設定のサポートを editorconfig-emacs に追加したので、それでこの問題は解決したと思っていたのですが、部分的に解決されてませんでした :hear_no_evil: 


具体的にどんなときに出たの・修正されてどうなったの
=======================

まず、この問題は、一例として以下のような再現手順で発生しました。

1. `editorconfig-mode` を有効にし、
2. 見える場所に `.editorconfig` が配置されて **いない** ディレクトリで、
3. ascii 文字のみが含まれるファイルを開き、
4. 日本語などの ascii 文字以外の文字を追加して保存しようとすると
5. `init.el` にエンコーディングの設定をしていたとしてもエンコーディングを自動で決めてくれない


今回の修正により、以下のようになりました。

1. 見える場所に `.editorconfig` が配置されていない場合、 `init.el` などに書かれている設定をちゃんと使ってくれるようになりました
    * `(prefer-coding-system 'utf-8-unix)` などと書いておけば自動的に utf-8 を使ってくれます
2. `.editorconfig` がある場合、このエラーが引き続き出ることがあります
    * その `.editorconfig` に `end_of_line` の設定があり `charset` の設定がない場合、上の手順で引き続き発生します
    * この場合、 `.editorconfig` に `charset` の設定を書くべきなので、追加すればエラーが出なくなります

こんな感じになりました。


おわりに
======

バグ・改善案・その他の Issue の報告はいつもとてもありがたいです。
Issue tracker としては、 Emacs 固有のものは [editorconfig/editorconfig-emacs](https://github.com/editorconfig/editorconfig-emacs/issues) 、 EditorConfig 全体のものは [editorconfig/editorconfig](https://github.com/editorconfig/editorconfig/issues) があります。

