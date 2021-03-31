---
title: Emacs の fill-column のあたり
date: 2020-12-24 14:57:43+09:00
---

`fill-column`
=============

バッファの各行の文字数の最大幅のようなものを設定する変数（？）。これを設定しただけでは何も起きないような気がする。

いろいろな関数やモードがこの変数をデフォルト値的なものとして参照してる。


`set-fill-column`
-----------------

この関数は `fill-column` の値を設定する。
デフォルト値が現在のカラムの位置になるため、今の場所を行の最大幅にするみたいなことができる。



自動折返し
=========

`auto-fill-mode` を使用する。例えば、以下のように追加する。

    ;; https://www.emacswiki.org/emacs/AutoFillMode
    (add-hook 'text-mode-hook 'turn-on-auto-fill)

他にもコメント行だけで有効にしたりできるらしい。


現在の最大幅の表示
==================

最大幅のところに線を引ける。

Emacs 27.1 以降は `display-fill-column-indicator-mode` が使える。
この関数は `fill-column` の値を最大幅として使用する。

それ以前のバージョンは fill-column-indicator (`fci-mode`) が使えそう。

線を引くのではなく背景色を変えるような方法は今のところなさそう？



最大幅を超えた行のハイライト
============================

長過ぎる行を警告する目的で、設定した最大幅を超えた行をハイライトしたり、超えた文字だけをハイライトしたりできる。

これを実現する一つとして、例えば `whitespace-mode` がある。
`whitespace-style` に `lines` を設定すると超過した行全体が、
`lines-tail` を設定すると超過した部分だけがハイライトされる。
最大幅は `whitespace-line-column` で設定する。
この値が `nil` である場合 `fill-column` の値が参照される。


その他
======

`fill-column` の値にしたがって見た目上の折返しを行う `visual-fill-column` とかがある。

