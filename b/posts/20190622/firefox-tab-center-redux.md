title: Firefox Tab Center Redux
slug: firefox-tab-center-redux
date: 2019-06-22 00:59:50+09:00
type: text

タブを縦置きするプラグイン

MacBookAir のマシンで間隔を詰めるためにアドオンの設定ページから以下の CSS を追加

```css
st-wrapper.shrinked .tab:not(.pinned) {
  height: 29px !important;
}
```

https://github.com/eoger/tabcenter-redux/wiki/Custom-CSS-tweaks
