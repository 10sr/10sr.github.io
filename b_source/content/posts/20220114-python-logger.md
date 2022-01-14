---
title: 他モジュールの logger 設定
date: 2022-01-14 11:00:00+09:00
---

依存している他モジュールが logger を使用しているとき、その設定をしてデバッグログを stderr などに出力させたい。


```python
import logging

sf_logger = logging.getLogger("snowflake")
sf_logger.setLevel(logging.DEBUG)

sf_handler = logging.StreamHandler()

sf_formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
```
