format epoch sec
================

    $ date -d '1970-01-01 946684800 sec' +"%Y-%m-%d %T %z"

vi
===

[NetDaemon: vi](http://www.srs.ne.jp/~north/netdaemon/vi.html)

* デバッグ
    `-D` を使う

置換
----

* 現在行からファイルの最後までをコメントアウト

        :.,$s/^/# /g

svn
===

1. checkout

        $ svn co svn+ssh://user@example.com/path/to/rep

2. edit contents

3. commit

        $ svn ci -m "message"


git-svn
-------

[Subversionリポジトリと連携できるgit-svn | 2ページ | SourceForge.JP Magazine - SourceForge.JP](http://sourceforge.jp/magazine/09/03/26/0834222/2)

1. clone

        $ git svn clone svn+ssh://user@example.com/path/to/rep

2. edit contents and commit changes

4. pull changes

        $ git svn rebase

4. push changes

        $ git svn dcommit

[Git で集中リポジトリーに push したら、自動でワーク・ディレクトリーにも反映させる](http://at-aka.blogspot.jp/2009/05/git-push.html)
----------------

push 先の レポジトリの `hooks/post-receive` に以下のように書く

    (cd /path/to/non_bare/rep && git --git-dir=.git pull)
