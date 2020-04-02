---
title: Micro editor の Plugin Manager について（ EditorConfig Plugin の導入）
tags: micro EditorConfig
author: 10sr
slide: false
---
この記事はなに？
====

[Micro][] というエディタが [最近注目を集めている][] 気がしますね。
ターミナル上で動作するエディタとしてむつかしく考えずに気軽に使えるかわいいやつです。

Micro には、簡易的ではありますが Plugin システムも用意されており、外部から機能を拡張していくことが可能です。
Micro 開発者自身も、 [go-plugin][] や [comment-plugin][] などをインストール可能なプラグインとして公開しています。

そこで、とりあえず [EditorConfig][] の中の人のひとりとして、 micro 用の Plugin を作り公開しました。
[editorconfig-micro][]

せっかくなので、 micro における Plugin の導入方法等を軽くメモしておきます。




Plugin をつかう
==================

Micro には Plugin Manager が組み込まれており、以下のような一通りのことができるようになっています[^1]。

* Web からのプラグインの自動ダウンロード・インストール
* インストールされたプラグインを一覧表示
* プラグインの削除
* など


Plugin Manager を使ったインストール
-------------------------------

Micro の Plugin Manager は、現代的なエディタらしく（？）、 Plugin を Web から自動的にダウンロード・配置することができます。

一例として `editorconfig` Plugin をインストールしてみます。
`CommandMode` から以下を実行してください。

```
> plugin install editorconfig
```

（ `CommandMode` はデフォルトでは <kbd>Ctrl+e</kbd> にバインドされています。なので、上記のコマンドは「 <kbd>Ctrl+e</kbd> `plugin install editorconfig` <kbd>Enter</kbd> 」とタイプして実行できます。）

* `editorconfig` Plugin は micro v1.1.3 以降が必要なので、なんらかの方法でインストール・アップグレードしてください
    * Homebrew ではすでに提供されています
* `CommandMode` ではタブ補完が効きます。迷ったらとりあえずバシバシ叩きましょう


EditorConfig Plugin が自動でダウンロード・展開され、 micro editor を一度終了するよう促されます。
Micro を再起動すれば、それ以降は EditorConfig Plugin が有効になっているはずです。

* 通常の多くの plugin ではこれでインストール手順は終わりです。しかし、 EditorConfig Plugin の動作には、 Plugin 本体に加えいずれかの EditorConfig Core プログラムが必要です。
* 例えば、 [Editorconfig Core C][] などをインストールしてください。



Plugin のリスト・削除・更新
------------------------

インストールした時と同じようなやり方で削除なども可能です。

### インストールされた Plugin の一覧を表示

```
> plugin list
```

```text:出力
	--> plugin list
----------------
The following plugins are currently installed:

editorconfig (0.1.1)
autoclose (0.0.0-unknown)
ftoptions (0.0.0-unknown)
linter (0.0.0-unknown)
----------------
```

### Plugin の削除

```
> plugin remove editorconfig
```

### Plugin の更新

```
> plugin update editorconfig
```

ひとつ以上の Plugin を指定するとそれをアップデート、省略して `plugin update` とだけ書くと全ての Plugin をアップデートします。




### 


Channel
-------

Micro の Plugin Manager は、 *channel* と呼ばれる JSON ファイルから利用可能なプラグインを探します。
プラグインレポジトリのようなもの、と考えれば多くの人には分かりやすいかもしれません。

Micro はデフォルトでは [公式の plugin-channel][plugin-channel] だけが [有効になって][channel-setting] います。 `editorconfig` Plugin もこの公式の channel に追加されているので、すぐにインストールが可能になっています。
あまり変更することはないかもしれませんが、野良 Channel を使いたくなった場合などは、以下のように設定ファイル (`$HOME/.config/settings.json`)  の `pluginchannels` に URL を追加することで利用可能になります。

```json
{
    "pluginchannels": [
        "https://raw.githubusercontent.com/micro-editor/plugin-channel/master/channel.json",
        "https://github.com/10sr/editorconfig-micro/raw/master/channel.json"
    ]
}
```


Plugin をかく
===============


開発方法についてはものすごくざっくりと書いておきます。

Plugin の記述言語としては、 [Lua][] が用いられています。
また、その Lua の実行環境としては Golang で書かれた Lua 実装である [gopher-lua][] が使われています。


開発方法については、ひとまず公式ドキュメントを読んでみるとよいです。
https://github.com/zyedidia/micro/blob/master/runtime/help/plugins.md
あとは、既存の Plugin の作りを眺めていくとなんとなく分かってくるかなと思います。

なんかいい感じの Plugin ができたら [plugin-channel][] に PR 出すといいかもしれません。
先に解説したとおり、野良チャンネルを使って提供していくことも可能です。



余談
====

このエディタは `micro` という名前ですが、 `micro` って一般名詞過ぎてなんだかよく分からない・検索しにくくありませんか。

公式サイトが <https://micro-editor.github.io> という URL なので、 **micro editor** と呼ぶと便利なのではないかなと個人的には思っています。

[micro]: https://micro-editor.github.io
[最近注目を集めている]: http://qiita.com/tadsan/items/f0747f09ea5ce863f2ec
[go-plugin]: https://github.com/micro-editor/go-plugin
[comment-plugin]: https://github.com/micro-editor/comment-plugin
[EditorConfig]: http://editorconfig.org 
[Editorconfig Core C]: https://github.com/editorconfig/editorconfig-core-c
[editorconfig-micro]: https://github.com/10sr/editorconfig-micro
[channel-setting]: https://github.com/zyedidia/micro/blob/v1.1.3/cmd/micro/settings.go#L200
[plugin-channel]: https://github.com/micro-editor/plugin-channel
[Lua]: http://www.lua.org
[gopher-lua]: https://github.com/yuin/gopher-lua

[^1]: [上記解説記事][最近注目を集めている] の時点では Plugin Manager はなかったようです。おそらく書かれた直後くらいに導入されたっぽいです

