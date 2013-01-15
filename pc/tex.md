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