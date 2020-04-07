#!/bin/bash
set -eu

read -p "post slug: " slug
echo slug: $slug

yyyymmdd=`date '+%Y%m%d'`
date=`date '+%Y-%m-%d %H:%M:%S%z' | sed 's/..$/:&/'`

posts_dir=posts

post_path=$posts_dir/$yyyymmdd-$slug.md

if test -f $post_path
then
    echo $post_path already exists.
    exit 1
fi

cat <<__EOC__ >$post_path
---
title: $slug
slug: $slug
date: $date
type: text
---

Write your post here.
__EOC__

echo $post_path created
