---
title: 制限つき Gmail SMTP サーバを swaks から使う
date: 2020-10-05 06:21:12+09:00
---

`swaks` を使用すると任意の SMTP サーバを使用してメールを送信できる

    $ swaks --server aspmx.l.google.com --to 8.slashes@gmail.com

実際にはいろいろ制限かかっててメール送れないかも。

参考
----

- <https://documentation.mailgun.com/en/latest/quickstart-sending.html#send-via-smtp>
- <https://support.google.com/a/answer/176600?hl=ja>
