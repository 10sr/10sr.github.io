---
title: cat | while read line のループがうまく回ってくれないとき
tags: ShellScript
author: 10sr
slide: false
---
やりたいこと
--------


シェルスクリプトで、受け取ったデータについて一行ずつ何らかの処理をしたくなりました。


典型的なやり方
----------

while に標準入力を流し込んで、 read コマンドで一行ずつ受け取れます。

```shell:スクリプト１
printf "a\nb\nc\n" | while read line
do
    echo data: $line
done
```

無事、こんな出力が得られるはずです。

```text:出力１
data: a
data: b
data: c
```

処理を増やしたくなりました。例えば cat を差し込みます。

```shell:スクリプト２
printf "a\nb\nc\n" | while read line
do
    echo data: $line
    cat
done
```

きっと想像がつくと思いますが、このループはあまり思ったとおりには動きません。一度しか回らないです。

```:出力２
data: a
b
c
```

おそらくこんな形で cat をわざわざ挟む人はいないと思います。
しかし、他にも同じような挙動が発生するコマンドは色々ありそうです。
例えば気付かず使いそうになるかもしれないコマンドとして、 **`ssh`** があります。

```shell:スクリプト３
printf "a\nb\nc\n" | while read line
do
    echo data: $line
    ssh sakura "echo from sakura: $line"
done
```

ssh 先で３回コマンドを実行したいと思っていたのですが、一度しか実行されませんでした。

```:出力３
data: a
from sakura: a
```


どうしよう？
--------

データのサイズがあまり大きくないのであれば、 for を使ってしまうのが一つの手です。

```shell:スクリプト４
for line in a b c
do
    echo data: $line
    ssh sakura "echo from sakura: $line"
done
```

```:出力４
data: a
from sakura: a
data: b
from sakura: b
data: c
from sakura: c
```

しかし場合によっては、どうしても標準入力から一行単位ごとにループしたい、あるいは入力サイズがでかすぎてループ前に全部展開したくないというような場合もあるかもしれません。
そういう場合は、標準入力を陽に潰してやることもできます。

```shell:スクリプト５
printf "a\nb\nc\n" | while read line
do
    echo data: $line
    ssh sakura "echo from sakura: $line" </dev/null
done
```

```:出力５
data: a
from sakura: a
data: b
from sakura: b
data: c
from sakura: c
```

思った通りの出力が得られました。


おまけ
----

ssh の標準入出力のやり取りは意外と便利です。

１ファイルを転送するくらいなら、 ssh と cat だけでなんとなくできてしまいます（この例だと SCP を使わない理由があまりありませんが…）。

```shell
cat a.png | ssh sakura "cat >a.png"
```


ディレクトリの転送も頑張ればできます。

```shell
tar -zcf - docs/ | ssh sakura tar -zxf -
```

