---
title: Nextcloud Plugin Update Error
date: 2020-06-01 23:51:22+09:00
---

Plugin のアップデート後、ログイン画面の代わりに以下の文面が表示されログインできなくなった。

    The files of the app Plain text editor (files_texteditor) were not replaced correctly. Make sure it is a version compatible with the server.

Nextcloud のディレクトリ以下の `custom_apps` から、 `files_texteditor` ディレクトリを削除したら正常にログインできるようになった。
`apps` 以下にも同名のディレクトリがあるが、そっちは触らなくて良さそうだった。

Nextcloud 自体のバージョンが最新でないときにプラグインのアップデートはあまりしないほうがいいのかもしれない。
