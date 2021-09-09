---
title: elecom-wifi
date: 2021-08-01 00:00:00+09:00
---

ELECOM WDC-867SU3S を指して自動でインストールされるドライバを使用すると wifi 接続ができない

なので以下の手順で MediaTek のドライバをインストールする

1. デバイスのプロパティから、今インストールされているドライバを削除する
2. WDC-867SU3S を PC から抜く
3. https://www.mediatek.com/products/connectivity-and-networking/broadband-wifi にアクセスする
4. MT7612U を探し、そのドライバをダウンロードする
    * ダウンロードされたのは `IS_Setup_ICS_011916_1.5.39.173.zip` という名前だった
5. インストーラを起動しインストールする
6. WDC-867SU3S を PC に挿し、接続できることを確認する

---

アダプタのプロパティから、 Country Region (5GHz) を #1 (36 - 140) に変更

- https://michisugara.jp/wifi

参考

- https://bbs.kakaku.com/bbs/K0000686834/SortID=19095598/
- https://itojisan.xyz/trouble/15748/
