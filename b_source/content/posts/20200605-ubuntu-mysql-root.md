---
title: Ubuntu の MySQL (MariaDB) Root ログイン
date: 2020-06-05 14:04:01+09:00
---

問題
----

MariaDB の root のパスワードを設定しようとして、 `mysql_secure_installation`
を実行したり以下のようにしたりしてもログインできるようにならない場合がある。

    set password for 'root'@'localhost'=password('pw');
    # or
    update mysql.user set password=password('pw') where user = 'root';


原因
----

Ubuntu の MariaDB のインストールではデフォルトで `unix_socket` プラグインが設定されている。
そのため以下のようになる。

- ホスト上で root になって mysql コマンドを実行すれば、認証なしでログインできる
    - 間違ったパスワードを入力してもよい
- root ユーザ以外・別のホストからではパスワードを正しく入力しても root としてログインできない

これは以下のようにして確認できる。


```
MariaDB [(none)]> select host, user, plugin from mysql.user;
+-----------+------+-------------+
| host      | user | plugin      |
+-----------+------+-------------+
| localhost | root | unix_socket |
| %         | 10sr |             |
+-----------+------+-------------+
2 rows in set (0.00 sec)
```


よって、これに従ってローカルの root からだけ root を使うようにするか、もしくは以下のようにしてプラグインを無効にする。


```
update mysql.user set plugin='' where user='root';
flush privileges;
```


Ansible
-------

`unix_socket` プラグインを有効にした状態で mysql の task を実行するには、以下のように `login_unix_socket` を設定すればよい。

```yaml
- name: Add users
  mysql_user:
    name: "{{ item.name }}"
    password: "{{ item.password }}"
    priv: "{{ item.priv }}"
    host: "{{ item.host }}"
    login_unix_socket: /var/run/mysqld/mysqld.sock
  loop: "{{ mysql_users }}"
  become: yes
```


参考
---

- [Ubuntu 18.04 + MariaDB | 技術メモの壁](https://fsck.jp/?p=793)
- [update mysql.user set plugin='' where user='root';](https://stackoverflow.com/questions/41846000/mariadb-password-and-unix-socket-authentication-for-root)
- [Ubunt 16.04でMariaDBをインストールするとパスワードが変 | 純規の暇人趣味ブログ](https://jyn.jp/ubuntu-16-04-mariadb-password-bug/)
- [UPDATE mysql.user SET plugin = '' WHERE plugin = 'unix_socket'; FLUSH PRIVILEGES;](https://stackoverflow.com/questions/43379892/mariadb-cannot-login-as-root/43424234#43424234)
