---
title: Emacs での EditorConfig の利用に editorconfig-core-c のインストールが不要になりました
tags: Emacs EditorConfig
author: 10sr
slide: false
---
**2015/12/27 追記**

ちょっとアップデートがあったので、末尾に追記しました。
追記前までのやり方で動かなくなるわけではないので面倒な人は気にしなくて良いです。


この文章はなに？
==============

最近 Emacs の [EditorConfig](http://editorconfig.org) 環境まわりでいくつかコミットをしていたのでその宣伝をしつつ、いま Emacs で EditorConfig をどうやって使えばいいかを解説する文章です。


その前に EditorConfig ってなに？
============================

解説記事は既にいろいろな人が書いてるので詳細は省略しますが、素敵なやつなのでみんな（コードを書く人なら誰でも）使うといいと思います。

* [どんなエディタでもEditorConfigを使ってコードの統一性を高める - Qiita](http://qiita.com/naru0504/items/82f09881abaf3f4dc171)
* [EditorConfigで文字コード設定を共有して喧嘩しなくなる話。（Frontrend Advent Calendar 2014 – 14日目） | Ginpen.com](http://ginpen.com/2014/12/14/editorconfig/)

例えばこの記事などがわかりやすいと思います。要するに、「プロジェクト自体にインデント幅などの設定を保持し、各エディタはその値に従うように自身を設定するようにしよう」みたいな考えを元に作られたプロジェクト・設定ファイルです。

すでに [いろいろなエディタ](http://editorconfig.org#download) が EditorConfig に対応しています。
自分が使っているエディタの EditorConfig プラグインを導入することで、そのエディタが自動的に `.editorconfig` ファイルを読み込みその設定を適用してくれるようになります。



したこと
=====================

* [`editorconfig-core-emacslisp` というライブラリ](https://github.com/10sr/editorconfig-core-emacslisp) をつくりました
  * MELPA から [`editorconfig-core`](https://melpa.org/#/editorconfig-core) でインストールできます
  * [公式の提供するテスト](https://github.com/editorconfig/editorconfig-core-test)
を使って [CI してる](https://travis-ci.org/10sr/editorconfig-core-emacslisp)
のでたぶんちゃんと動くと思います
  * 実装のうち、 Glob パターンマッチの部分は単体でも便利そうだったので [パッケージを分けてます](https://github.com/10sr/editorconfig-fnmatch-el)
* [EditorConfig プラグイン](https://github.com/editorconfig/editorconfig-emacs) の Minor-Mode 化などをしました


以前から Emacs には [EditorConfig プラグイン](https://github.com/editorconfig/editorconfig-emacs) (`editorconfig` パッケージ) はあったのですが、その動作には [editorocnfig-core-c](https://github.com/editorconfig/editorconfig-core-c) などの外部プログラムのインストールが必要でした。
つまり、 Emacs で EditorConfig を利用しようと思った場合、

1. Emacs 用の EditorConfig プラグイン
2. editorconfig-core-c などの Core プログラム

の２つを入れる必要がある、という状況でした。
EditorConfig プラグイン自体は `package.el` などを使って Emacs からインストールすれば良いのですが、 Core プログラムの導入はそうはいかず、 `apt` だとか `yum` などのディストリのパッケージ管理システムで導入する必要があります。
これは Emacs に引きこもりたい人間としては致命的です。
なので、 Core プログラムを Emacs Lisp で再実装して `editorconfig-core` として公開し、 MELPA でインストールできるようにしました。

Core プログラムには、公式が作成したテストケースを用いることができます。
自分の実装もこれを用いて CI を回すようにしてるので、きっと既存の `editorconfig-core-c` などと同様にちゃんと動くはずです。
もしおかしな動作を見つけるなどしたら [issue 投げて](https://github.com/10sr/editorconfig-core-emacslisp/issues) いただくとありがたいです。


また、もともとの EditorConfig プラグイン自体にも PR を投げ、 [このライブラリを使えるようにするような変数を追加](https://github.com/editorconfig/editorconfig-emacs/commit/3835e4b71d17febe7646493465345538b81a0276) したり、 [マイナーモード化したり、シンボル名に使われている prefix を `edconf-` から `editorconfig-` に直したり](https://github.com/editorconfig/editorconfig-emacs/pull/43) してもらいました。
（ prefix の変更により変数・関数名は変わってしまいましたが、変数に関して言えば、 `edconf-` を prefix として用いた古いものは [obsolete な変数として新しい方に alias されている](https://github.com/10sr/editorconfig-emacs/commit/7f079db44b5350658ec695e7f4685593af85face) ので、既存の設定のままで動かすことは（一応）できます。）


現状の EditorConfig 環境設定
=========================

MELPA から、あたらしめの `editorconfig` (`20151105.54` あたり以上、もともとのバージョンで `v0.5` となってるもの以上) と `editorconfig-core` をインストールします。
`editorconfig` パッケージは marmalade などにも登録されていますが、おそらく版が古いです。
`editorconfig-core` は、現状では MELPA にしかパッケージがないです。
インストールしたら、 `editorconfig-mode` を有効にします。

    (editorconfig-mode 1)

`editorconfig` は、デフォルトでは今までどおり外部プログラムを Core として用いるようになっています。
Emacs Lisp 版の `editorconfig-core` を用いる場合、以下の設定を加えます。

    (setq editorconfig-get-properties-function
          'editorconfig-core-get-properties-hash)

<!-- 以上により、ファイルを開くと `.editorconfig` で設定された値が有効になるようになります。 -->
もはや外部プログラムのインストールは不要です。



2015/12/27 追記
==============

この文章を書いたのち少しやりとりがあって、 `v0.6` で `editorconfig-core-emacslisp` および `editorconfig-fnmatch-el` が [本家にマージ](https://github.com/editorconfig/editorconfig-emacs/pull/46) されることになりました。
それに伴い、以下のような変更があります。

* 自分がもともと持っていた２つのレポジトリは deprecated です
* MELPA のパッケージに関して、 `editorconfig-core` は分かれたままにはなってますが `editorconfig` の依存として追加されるようになったので、明示的にインストールする必要はなくなりました
* 変数 `editorconfig-get-properties-function` を設定しなくても、Emacs Lisp 実装の Core が使われるようになりました

最後の項目については説明が必要です。

変数 `editorconfig-get-properties-function` は、初期値では `editorconfig-get-properties` が与えらるようになりました。
この関数は、以下のようにして Core 実装を見つけます。

1. `editorconfig` 外部プログラムが `PATH` に見つかった場合それを用いる
2. 見つからなかった場合 Emacs Lisp 実装に fallback する

そのため、通常はこの変数を書き換える必要はなくなっていると思います（設定は `(editorconfig-mode 1)` のみでよい）。
なお、一方追記前のように

    (setq editorconfig-get-properties-function
          'editorconfig-core-get-properties-hash)

とした場合の動きは、

* 外部プログラムがあってもなくても Emacs Lisp 実装を用いる

という感じです。


結局どうすれば使えるようになったの？
---------------------------

1. MELPA から `editorconfig` パッケージをインストールし
2. `(editorconfig-mode 1)` で有効化すればよいです

