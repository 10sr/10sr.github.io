title: Install debian sid on WSL
slug: wsl-debian-sid
date: 2020-01-06 21:20:33+09:00
type: text


まず普通に store にある debian をインストールして最新に合わせる。

    sudo apt update && sudo apt upgrade


一応ミラーを jp に合わせてもう一度アップデートする。

    sudoedit /etc/apt/sources.list
    ## security 以外を ftp.jp.debian.org/debian/ にする
    sudo apt update && sudo apt upgrade

sid に変更してアップグレードする。以下一行だけにした。

    sudo tee /etc/apt/sources.list <<EOC
    deb http://ftp.jp.debian.org/debian unstable main contrib
    EOC
    sudo apt update
    sudo apt full-upgrade
    sudo apt autoremove

再起動する。 *WSL 外*（PowerShell など）から以下を実行する。

    wsl.exe -t Debian


### 参考

- https://wiki.debian.org/DebianUnstable
- https://endaaman.me/-/debian-sid_on_laptop
- https://dnuka.github.io/upgrading-debian-to-unstable.html