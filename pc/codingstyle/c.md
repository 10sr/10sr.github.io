例
----

* [junks/suniq at master · 10sr/junks](https://github.com/10sr/junks/tree/master/suniq)


命名
----

* `MyFuncName()`
* `File_FuncName()`
* `variable_name`
* `CONST_NAME`


空白類
------

* インデントは空白４つ
* 関数の body の波括弧は新しい行

        void FuncName(void)
        {
            do_something;
            return;
        }

* `if`, `while` のカッコは外側にスペースを置く、内側には置かない

        if (flag) {
            then_body;
        } else {
            else_body;
        }


参考
-----

* [JF: Linux Kernel 3.x/2.6 Documentation: CodingStyle](http://linuxjf.sourceforge.jp/JFdocs/kernel-docs-2.6/CodingStyle.html)
* [Google C++スタイルガイド 日本語訳 | textdrop](http://www.textdrop.net/google-styleguide-ja/cppguide.xml)