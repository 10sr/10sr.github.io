---
title: Ansible のタスクで Oracle JDK をダウンロードする
tags: Ansible JDK
author: 10sr
slide: false
---
uri モジュールの HEADER_Cookie を使います。

```yaml:vars/main.yml
---
jdk_version: 7u55
jdk_build_versions:
  7u55: b13

jdk_build_version: "{{jdk_build_versions[jdk_version]}}"
jdk_rpm_url: http://download.oracle.com/otn-pub/java/jdk/{{jdk_version}}-{{jdk_build_version}}/jdk-{{jdk_version}}-linux-x64.rpm
jdk_rpm_path: "jdk-{{jdk_version}}-linux-x64.rpm"
```

```yaml:tasks/main.yml
---
- name: Download JDK
  uri:
    HEADER_Cookie="oraclelicense=a"
    dest={{jdk_rpm_path}}
    follow_redirects=all
    method=GET
    url={{jdk_rpm_url}}
```

参考
---

* http://docs.ansible.com/ansible/uri_module.html

