# tex

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
* babel: 多言語対応。つまり、多言語を同時に扱うパッケージ？

## フォント

[日本語フォントのセットアップ](http://www.fugenji.org/~thomas/texlive-guide/font_setup.html)

## cmap-adobe-japan1

なんだろうこれ？古い話かも

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

# lyx 

jsarticle が使用不可になってて治らない。 reconfigure できない。
ひとまず xetex 使う。
=> ターミナルから起動 `open a.lyx` したらなぜか reconfigure 出来た。

## platex + dvipdfmx

基本的に、 [LyX/設定 - TeX Wiki](http://oku.edu.mie-u.ac.jp/~okumura/texwiki/?LyX%2F%E8%A8%AD%E5%AE%9A) の設定に従うとできた。ただし、文書クラスのクラスオプションは `papersize' を含めない。言語は、 日本語(cjk不使用)jis だとなぜか上手くいく。

## xetex

* 図の挿入時 `fig' になる

# その他の ref

* [Idea, Design, Engineering, Architecture, etc: LyX 1.6.0 on TeX Live 2010](http://voidptr.seesaa.net/article/182189330.html)
