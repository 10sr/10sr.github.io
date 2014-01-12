Freebsd 9.2-RELEASE

[The FreeBSD Project](http://www.freebsd.org/ja/)


Notes
=====


`/home`
------

Linked to `usr/home`.


su
---

Add users to group `wheel` by modifying `/etc/group`.

* <http://d.hatena.ne.jp/torazuka/20110505/wheel>



Too Much Time to Invoke Emacs
-----------------------------

Add hostname to `127.0.0.1` of `/etc/hosts`.

* <ttp://d.hatena.ne.jp/syohex/20120902/1346557876>


Source Tree
-----------

I somehow cannot use `sysinstall` (cannot resolve hostmame) so I used svn like:
`svn checkout svn://svn.FreeBSD.org/base/releng/9.2 /usr/src`



Manage Packages
===============


pkgng
-----

* <http://www.freebsd.org/doc/ja_JP.eucJP/books/handbook/pkgng-intro.html>
* <http://april.fool.jp/blogs/2013/03/freebsd-pkg%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E6%8D%A8%E3%81%A6%E3%82%8B%E3%81%AE%E3%81%AF%E3%81%84%E3%81%A4%EF%BC%9F%E4%BB%8A%E3%81%A7%E3%81%97%E3%82%87%EF%BC%81/>
* <https://github.com/freebsd/pkg>


1. bootstrap by issuing `/usr/sbin/pkgng`
2. `vi /etc/make.conf` (not exists on my environment) and add line
`WITH_PKGNG= yes`
3. If alread install some packages (with ports or pkg_install?) issue `pkg2ng`
5. error: `pkg: PACKAGESITE in pkg.conf is deprecated. Please create a repository configuration file`
6. Follow [this instruction](http://april.fool.jp/blogs/2013/11/pkgng%e3%81%8c%e5%be%a9%e6%b4%bb%e3%81%97%e3%81%9f%e3%81%a8%e8%a8%80%e3%81%a3%e3%81%9f%e3%81%aa%e3%80%82%ef%bc%88%e4%b8%80%e9%83%a8%e3%81%ae%e5%a5%b4%e3%81%ab%e3%81%a8%e3%81%a3%e3%81%a6%ef%bc%89/)
    * Remove `packagesite` entry from `/usr/local/etc/pkg.conf`
    * `vi /usr/local/etc/pkg/repos/FreeBSD.conf` and add these:
          FreeBSD: {
            url: "pkg+http://pkg.FreeBSD.org/${ABI}/latest",
            mirror_type: "srv",
            enabled: yes
          }
7. `pkg update && pkg upgrade`
8. Search packages by `pkg search sudo`
9. Install packages by `pkg install sudo`


Packages
========

* sudo
* git
* tmux
* emacs
* bash
