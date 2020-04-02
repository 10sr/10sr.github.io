---
title: コマンドライン文字列をリストに変換する
tags: emacs-lisp
author: 10sr
slide: false
---
やりたいこと
----------

```el
(shell-split-string "abc  'def   dee'") => '("abc" "def   dee")
```




実装
----


```el
(defun shell-split-string (str)
  "Split string STR into a list of strings by shell."
  (let ((emacs-bin (concat invocation-directory
                           invocation-name)))
    (cdr (read (shell-command-to-string (concat emacs-bin
                                                " -Q --batch --eval '(prin1 command-line-args-left)' -- "
                                                str
                                                " 2>/dev/null"))))))
```

もっといい方法を募集します。

