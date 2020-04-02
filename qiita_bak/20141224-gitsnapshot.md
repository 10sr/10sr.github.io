---
title: git config alias.snapshot
tags: Git
author: 10sr
slide: false
---
Snapshot Working Directory
============

git レポジトリにおいて、ワークツリーを簡単にどこかにコミットしておくことで、間違って変更が失われることがないようにしようというアイディアは割と前からあります（参考）。


When Is It Useful? / Usage
-------------------

たとえば、「結構大きな変更をしているけどまだ一つのコミットにまとまらない」などという場合はまれによくあると思います。または、「多分いらない変更だけど完全に消してしまっていいか不安」など。
このようなとき

* `git snapshot` を実行してその時のスナップショットを保存する
* スナップショットは、ワークツリーおよび普通のブランチ・インデックスには全く影響を与えない
* その時の内容を取り出したい場合、 `git show snapshot@{1}:a.txt` などとする

といったことができればいくらか安心なわけです。


Why Not `git-stash`?
------------

これに近いアイディアは、 `git-stash` としてすでに配布されています。
しかし上で示したような使い方はしにくい面があります。

* `git-stash` はそもそも（スナップショットでなく）パッチを一時保存するものであり目的が違う
  * スナップショットの長期間の保存・パッチの一時的な保存という二つの目的に一つのツールを使うのはとてもつらい
* `git stash save` はワークツリーを clean にしてしまう
  * `git stash apply` を直後に実行することで内容を戻すことができるが、ファイルの内容を無駄に２度書き換えることになる
  * `git stash create` はワークツリーを触らないが、 `refs/stash` を update しない



Definitions
-------------

多くの実装は `git-snapshot` などのスクリプトを作ってパスを通すことをしていますが、エイリアスで十分じゃねって思いました。

```sh
git config alias.snapshot '! gitdir="`git rev-parse --git-dir`" && export GIT_INDEX_FILE="$gitdir"/snapshot.index && cp "$gitdir"/index "$GIT_INDEX_FILE" && git add -A && : >>"$gitdir"/logs/refs/snapshot && git update-ref refs/snapshot $(git commit-tree $(git write-tree) -m Snapshot -p HEAD)'
```

これは分解するとおおよそ以下のようになります。

```sh
#!/bin/sh
set -xe

# Find current `.git`
# CAUTION: For real cases this value should be quoted
gitdir=`git rev-parse --git-dir`

# Set environment variable that specify the index file
export GIT_INDEX_FILE=$gitdir/snapshot.index

# Copy existing index file
cp $gitdir/index $GIT_INDEX_FILE

# Add all files
git add -A

# Create tree object from the index where all files are registered
tree=`git write-tree`

# Create commit object with the tree object as tree and HEAD as parent
commit=`git commit-tree $tree -m Snapshot -p HEAD`

# Make sure the relog for snapshot is kept
# From git-stash
: >>$gitdir/logs/refs/snapshot

# Update ref to make the snapshot accessible by `refs/snapshot`
git update-ref refs/snapshot $commit
```


### Utilize `git-stash` ###

また `git stash create` を使って以下のようにする方法もあります。

```sh
git config --local alias.stashsnap '! gitdir="`git rev-parse --git-dir`" && : >>"$gitdir"/logs/refs/snapshot && cmt=`git stash create` && test -n "$cmt" && git update-ref refs/snapshot $cmt && echo Snapshot created: $cmt'
```

この方法ははじめの方法に比べワークツリーに変更がない場合スナップショットを作らないという利点があります。
ただし、 untracked files がスナップショットに記録されません。

Repository
----------

* [junks/git/snapshot at master · 10sr/junks](https://github.com/10sr/junks/tree/master/git/snapshot)


References
----

* http://git.661346.n2.nabble.com/RFC-New-command-git-snapshot-td2298811.html
* https://github.com/jrockway/git-snapshot
* https://github.com/peterjm/git-freeze

