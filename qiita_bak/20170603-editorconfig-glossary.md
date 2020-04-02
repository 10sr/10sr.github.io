---
title: EditorConfig の細かな仕様っぽいこと
tags: EditorConfig
author: 10sr
slide: false
---
こんにちは、 [EditorConfig Emacs Plugin をつくっています](https://github.com/editorconfig/editorconfig-emacs/graphs/contributors) 。

この文章はなに？
----

[EditorConfig](http://editorconfig.org) を書くとき・使うときに知っておくとべんりかもしれない細かな話を備忘録的につらつらと書いておくものです。
順番は適当ですが、下に行くほどどうでもいい情報かもしれません。

ここに書かれていることは、実のところほとんどドキュメント化されているわけではありません。
ただし、 `.editorconfig` ファイルが正しく解釈されるかをテストする [editorconfig-core-test](https://github.com/editorconfig/editorconfig-core-test) の中ですべて明示されていることなので、よほどのことがない限り変わらないんじゃないかなあと思います。

この文章では、 EditorConfig の基本的な目的・使い方については説明しません。
[公式ドキュメント](http://editorconfig.org) や、 [EditorConfig タグ](http://qiita.com/tags/EditorConfig) などをいい感じに参照してください。


`editorconfig` コマンドの使い方
------------------------------


### 独自なプロパティ定義

`editorconfig` コマンドはサポートされている設定のみしか扱えないというわけではないので、 `.editorconfig` ファイルには好きな設定名と値のペアを追加することができます。

例えば、 `/path/to/repo/.editorconfig` に

```ini:/path/to/repo/.editorconfig
[*.js]
indent_style = space
key0 = value0
```

と書いたうえで、 `editorconfig /path/to/repo/a.js` を実行すると、この二つの設定値を得ることができます。

```console
~ $ editorconfig /path/to/repo/a.js
indent_style=space
key0=value0
```

これを利用して、独自に設定を定義し利用するようなコマンドやエディタ拡張を書くことができると思います。

* 例えば、 [dotnet/roslyn](https://github.com/dotnet/roslyn/blob/master/.editorconfig) では、  `dotnet_` `csharp_` から始まる独自のプロパティを設定し利用しています
* 同様に、 [dfmt](https://github.com/Hackerpilot/dfmt) というツールは、独自に `dfmt_` から始まる設定を定義しコマンドから利用しています
* また、例えば Emacs Plugin では、 `editorconfig-custom-hooks` に関数を追加することで独自に定義した設定値を利用することができます。これを利用した拡張の例のようなものとして、 [editorconfig-custom-majormode](https://github.com/10sr/editorconfig-custom-majormode-el) を以前作りました。

逆に、設定名を typo しても気づかない（エラーを吐いたりしない）ので気をつけてください。


### 出力時の値の書き換え

`editorconfig` コマンドは、基本的には `.editorconfig` に記述された設定値をそのまま素通しして出力しますが、いくつかの微妙な加工を行う場合があります。


まず、値の名前はすべて downcase されます。

```ini:/path/to/repo/.editorconfig
[*.js]
Indent_Size = 4
FOO = BAR
```

```console
~ $ editorconfig /path/to/repo/a.js
indent_size=4
foo=BAR
```


また、公式でドキュメントされている設定のうち、真偽値 (true, false) を取るものについては、コマンド実行時にその値がすべて小文字に downcase されます。

```ini:/path/to/repo/.editorconfig
[*.js]
trim_trailing_whitespace = TRUE
insert_final_newline = trUe
```

```console
~ $ editorconfig /path/to/repo/a.js
trim_trailing_whitespace=true
insert_final_newline=true
```

インデント幅に関する設定には、少し複雑なルールが存在します。

* `indent_size = tab` であり、 `tab_width` に値が設定されている場合、 `indent_size` を `tab_width` と同じ値に設定します
* `indent_size` に数字が設定されていて `tab_width` が設定されていない場合、 `tab_width` を `indent_size` と同じ値に設定します
* `indent_size` が設定されておらず、 `tab_width` に値が設定されていて、 `indent_style = tab` である場合、 `indent_size` を `tab_width` と同じ値に設定します

ただし、実用上はユーザはこの仕様をあまり気にしなくても大丈夫だと思います。

* `indent_style = space` のときは、 `indent_size` を適切に設定しましょう
* `indent_style = tab` のときは、 `tab_width` を適切に設定しましょう


`.editorconfig` ファイルの書き方
--------------------------

### 値の優先順位・値の削除

`.editorconfig` の値は、常に、上から下へ、親ディレクトリから子ディレクトリへと読み込まれ、後に定義された値が優先されます。

CSS のように詳細に指定されたセクションのほうが優先されるみたいなルールはないので、 `*` でマッチするルールは普通にファイルの先頭においておくことをオススメします。

```ini
root = true

[*]
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

場合によっては、上で定義されていた値を削除し、未定義に戻したい場合があると思います。

このような場合、基本的には「その設定の値として正しくない値」を入れれば良いです（例えば、 `indent_size = none` など）。

ただ、このやり方だと、その値が何を意味するのか初見でわからない場合がもしかしたらあるかもしれない・その値があとから有効な値になるかもしれないというような感じの懸念があったため、値を未定義にするための値が（わりと最近？）定められました。

`unset` がこの目的のために reserve されています。以下のように使うことができます。

```ini
root = true

[*]
indent_style = space
indent_size = 4

[*.js]
indent_size = unset
```





### ファイル名のパターンマッチ

ファイル名のマッチには少しの独自拡張がされた Glob パターンマッチを用います。

使用可能なパターンのリスト自体に関しては [公式ページのドキュメント](http://editorconfig.org/#file-format-details) で尽くされているので参照してください。
`.gitignore` で使われるのと似てる、と考えて良いです。

一つ注意するといいこととして、マッチ時の動きとして、（これも `.gitignore` と同様に）パターンに `/` が入っているかどうかでマッチの方法が変化する、というものがあります。
この方式は [Basename Matching](https://github.com/isaacs/node-glob#basename-matching) と呼ばれることがあるみたいです。

まず、パターンの中に `/` がない場合、マッチはファイルの Basename のみを対象として行われます。

例えば、以下のようなパターンは、 `a.js`, `lib/b.js` の双方にマッチします。

```ini
[*.js]
indent_size = 2
```

一方、パターン中に `/` が一つでも含まれる場合、 `.editorconfig` ファイルからの相対パス全体に対するマッチが行われます。

例えば、以下のように書くと、これは `.editorconfig` ファイルが存在するのと同階層の `a.js` などにしかマッチしません。

```ini
[/*.js]
indent_size = 2
```

### コメント

基本的に、 `#` または `;` があるとそこから行末までがコメントとして扱われます。

ただし、正確にはコメントとして解釈されるには加えて以下のどちらかが必要です。

* この文字が行頭にある
* 直前が半角スペースである

つまり、以下はコメントにはならず、値が `value# Not comment` であると解釈されます。

```ini
[*.js]
key = value# Not comment
```


### 値のセパレータ

値を定義するとき、通常は `key = value` と書くと思います。
公式ページでも `=` が使われています。
しかし、実はこの `=` の代わりに、 `:` を使うことができたりします。
しかも、 `=` と `:` が混在しても大丈夫です。

```ini
[*.py]
indent_style = space
indent_size : 2
```

実際には普通に `=` だけを使ったほうが良いと思います。



