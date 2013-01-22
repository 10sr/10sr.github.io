tex
====

[なぜ TeX Live なのか](http://fugenji.org/~thomas/texlive-guide/why.html)

txlive 2012以降を使うこと。

* texlive: ディストリビューション つまり latex の一種？
* latex: tex にマクロパッケージを組み込んだもの
* latex2e: latex の新版
* tetex: texliveより前に使われてたもの
* ptetex3: tetexの日本語対応
* ptexlive: texliveの日本語対応
* e-tex: レジスタ制限の拡張
* uptex/uplatex: unicode 化
* babel: 多言語対応。つまり、多言語を同時に扱うパッケージ？不要か？

## フォント

[日本語フォントのセットアップ](http://www.fugenji.org/~thomas/texlive-guide/font_setup.html)

### cmap-adobe-japan1

なんだろうこれ？古い話かも

## xetex

[XeLaTeX で日本語する件について [電脳世界の奥底にて]](http://zrbabbler.sp.land.to/xelatex.html#sec-zxjatype)
[ZXjatype パッケージ ～XeLaTeX でまともな日本語組版を～ [電脳世界の奥底にて]](http://zrbabbler.sp.land.to/zxjatype.html)

## mac

[MacTeX - TeX Users Group](http://www.tug.org/mactex/)
-> smaller packages

* basictex をインストール
* maxtex-additions も入れたかも

###  tlmgr / texlive manager (Applications -> utility)

[mactlmgr - Mac OS X GUI for TeX Live Manager](http://code.google.com/p/mactlmgr/)
プログレスバーが出ないけどちゃんと動いてるらしい

* etoolbox, makecmds を導入
* collection-langcjk (依存で色々入る)
* luainputenc (多分要らない)
* xindy
* zxjatype いつの間にか入ってた

## arch linux

[LaTeX](https://wiki.archlinux.org/index.php/LaTeX)

* texlive-most で出てきたのをとりあえず全部入れる
* あと texlive-langcjk
* [texlive の xelatex で日本語UTFの文書を - popipopeの日記](http://d.hatena.ne.jp/popipope/20110514/1305374592)
* [XeLaTeX で日本語する件について [電脳世界の奥底にて]](http://zrbabbler.sp.land.to/xelatex.html)
* [platexをやめてxelatexを使おう - ラシウラ](http://d.hatena.ne.jp/bellbind/20101105/1288966798)
* [lyxで日本語を使う。(ubuntu 11.10) - hiroki_fの日記](http://d.hatena.ne.jp/hiroki_f/20111114/1321227216) 多分不要？

## tips

* なんか導入したら texhash を実行。

### 図

ドロー系使って、 ESP で保存するといいらしい。

# lyx 

jsarticle が使用不可になってて治らない。 reconfigure できない。
ひとまず xetex 使う。
=> ターミナルから起動 `open a.lyx` したらなぜか reconfigure 出来た。

## platex + dvipdfmx

基本的に、 [LyX/設定](http://oku.edu.mie-u.ac.jp/~okumura/texwiki/?LyX%2F%E8%A8%AD%E5%AE%9A) の設定に従うとできた。ただし、文書クラスのクラスオプションは 'papersize' を含めない。言語は、 日本語(cjk不使用)jis だとなぜか上手くいく。

## xetex

* 図の挿入時 'fig' になる
  => プリアンブル書いたら '図' にできるようになった。platex必要ないかも

### zxjatype

* [LyX - TeX Wiki](http://oku.edu.mie-u.ac.jp/~okumura/texwiki/?LyX) を参考に、レイアウトファイルを加える。
  => 選択には出たけど、利用不可になる。 bxjsarticle.cls がない？

## tips

* 文書＞設定＞本文レイアウト＞段落を垂直スペースのほうが見栄えいい感

### プログラム書く

* 挿入＞ボックスの何かを追加
* プログラムリストをその中に挿入
* プログラムリストの設定から長い行を分割とかすべき

**************

# その他の ref

* [Idea, Design, Engineering, Architecture, etc: LyX 1.6.0 on TeX Live 2010](http://voidptr.seesaa.net/article/182189330.html)
