Openbox
=======

Menu
----

[Openbox - ArchWiki](https://wiki.archlinux.org/index.php/Openbox#Menus)

* archlinux-xdg-menu をインストール
* `<menu id="root-menu" label="xdg-menu" execute="perl /usr/bin/xdg_menu --format openbox3-pipe"/>` を menu.xml に書く



VNC Server
==========

[Vncserver - ArchWiki](https://wiki.archlinux.org/index.php/Vnc)

* Install tigervnc
* start server by `vncserver :1`
* kill server by `vncserver -kil :1`
* access by `vnc://addr:5901`


vsftpd
======

[vsftpd.conf for anonymous read-write access without any security configurations](https://gist.github.com/10sr/6249459)



[cower](https://github.com/falconindy/cower)
============================================

* `cower -s <name>` to search aur
* `cower -d` to download

[Reflector](https://wiki.archlinux.org/index.php/Reflector)
======

Arandr
======

* GUI frontend for xrandr


[source-highlight](http://www.gnu.org/software/src-highlite/source-highlight.html)
==========

ソースに色つけできる。 LESS で使うには以下。

    _src_hilite_lp_path="`which src-hilite-lesspipe.sh 2>/dev/null`"
    if test -n "$_src_hilite_lp_path"
    then
        export LESSOPEN="| $_src_hilite_lp_path %s"
    fi

Change Colors
-------------

`/usr/bin/src_hilite_lesspipe.sh` を見るとわかるように、 style ファイルは esc.style に決め打ちになっている。そのため、 /usr/share/source-highlight/esc.style を直接編集する。


wireshark
=========

[パケットキャプチャツール「Wireshark」 - Wiresharkって？ - ネットワークエンジニアを目指して](http://www.itbook.info/study/wireshark1.html)

[Tshark（キャプチャツール）](http://homepage2.nifty.com/protocol/tshark/index.html)



Memo
====

[【まとめ】これ知らないプログラマって損してんなって思う汎用的なツール 100超 #PHP #JavaScript #Python #Ruby #HTML - Qiita [キータ]](http://qiita.com/items/f570f057a0ff927b47dc)

* munin
* mutt
* xuserrun
