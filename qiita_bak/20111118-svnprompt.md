---
title: svnのブランチ名をプロンプトへ
tags: ShellScript
author: 10sr
slide: false
---
`__git_ps1`と大体同じように使える

```bash
$ __my_svn_ps1 [SVN:%s]
```

```bash
__my_parse_svn_branch2() {
    local LANG=C
    local svn_url=$(svn info 2>/dev/null | sed -ne 's#^URL: ##p')
    local svn_repository_root=$(svn info 2>/dev/null | sed -ne 's#^Repository Root: ##p')
    echo ${svn_url} | sed -e 's#^'"${svn_repository_root}"'##g' | awk '{print $1}'
}

__my_svn_ps1(){
    local svn_branch=$(__my_parse_svn_branch2)
    test "${svn_branch}" == "" || echo ${svn_branch} | xargs printf "$1"
}
```

参考
* <http://hocuspokus.net/2009/07/add-git-and-svn-branch-to-bash-prompt/>
