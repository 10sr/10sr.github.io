---
title: コマンドライン文字列をリストに変換する まじめに実装版
tags: emacs-lisp
author: 10sr
slide: false
---
やりたいこと
--------

```el
(shell-split-string "abc  'def   dee'") => '("abc" "def   dee")
```

として、以前こんなのを書きました。

* [emacs-lisp - コマンドライン文字列をリストに変換する - Qiita](http://qiita.com/10sr/items/73bf45db58c9e6d2c533)

これは、強引に `sh` に文字列を解釈させてそれを emacs から受け取ってやろうというもので、単純な場合はうまく行きますが、それでも問題はあります。

その中でも大きなものは例えば

```el
(shell-split-string "abc && rm -rf *")
```

などとするとたちまち `rm -rf *` が実行されてしまう、というようなことで、セキュリティ的にもあれだし、得られる結果も `'("abc")` となるところ実際にほしいのは `'("abc" "&&" "rm" "-rf" "*")` なわけです（多分：少なくとも Python による `shlex` はそうなっている）。



実装
----

そんなわけで、正面から Emacs lisp で実装してみよう、ということであたまから文字を読んで再帰してリストを作るような感じにやってみました。

* [10sr/shell-split-string-el](https://github.com/10sr/shell-split-string-el)


これなら、 `&&` を含むような場合でもうまく動きます。

```el
(shell-split-string "abc")  ->  '("abc")
(shell-split-string "abc  def")  ->  '("abc" "def")
(shell-split-string "abc \"def ghi\"")  ->  '("abc" "def ghi")
(shell-split-string "abc && def")  -> '("abc" "&&" "def")
```


末尾再帰
------

最適化ほしいですね。

