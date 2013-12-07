SSHd Configs `/etc/ssh/sshd_config`
===========

Disable `PasswordAuthentication` and `ChallengeResponseAuthentication` to
disable password authentication.


    PermitRootLogin no
    PasswordAuthentication no
    PermitEmptyPasswords no
    ChallengeResponseAuthentication no
    UsePAM no


refs
----

* <http://www.kishiro.com/FreeBSD/ssh.html>
* <http://tm.root-n.com/server:sshd:sshd_config>



Port Forward
============


socks プロキシ
--------------

プロキシを立ててすぐに終了する

    $ ssh -fND <port> <host>


port forward
------------

    $ ssh -L <localport>:<host_address>:<host_port> host_to_connect

ローカルの localport を掴んで、それへの通信を host_to_connect を経由した host_port の host_address
へ転送する


nmap
====

    $ sudo nmap google.com

    $ sudo nmap 192.168.2.100-200 # scan from 100 to 200




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



git
===


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


stash
-----

stash create two commit object: work tree and index

* woktree: default commit msg is like "WIP on xxx" and have two parent: index stash and
 base commit
* index: default commit msg is lile "index on xxx" and have one parent: base commit

内容と作業ディレクトリが衝突した時： abort する



Cannot use alias
----------------

あるシステムで、 `fatal: cannot exec 'git-st': Permission denied` というエラーが出てエイリアスが使えなかった。調べたところ PATH にアクセス出来ないディレクトリがあると良くないらしいので、 .bashrc に 
`alias g="PATH=$HOME/.local/bin:/usr/bin:/bin: g"` と書いて解決した。
