#!/bin/bash
set -eu

slug=${1:-}

if test -z "$slug"
then
    read -p "post slug: " slug
    echo slug: $slug
fi

yyyymmdd=`date '+%Y%m%d'`
date=`date '+%Y-%m-%d %H:%M:%S%z' | sed 's/..$/:&/'`

posts_dir=content/posts

post_path=$posts_dir/$yyyymmdd-$slug.md

if test -f $post_path
then
    echo $post_path already exists.
    exit 1
fi

cat <<__EOC__ >$post_path
---
title: $slug
date: $date
---

Write your post here.
__EOC__

echo $post_path created
