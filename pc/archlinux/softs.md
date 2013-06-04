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

/usr/bin/src_hilite_lesspipe.sh を見るとわかるように、 style ファイルは esc.style に決め打ちになっている。そのため、 /usr/share/source-highlight/esc.style を直接編集する。