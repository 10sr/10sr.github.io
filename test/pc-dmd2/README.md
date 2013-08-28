Dynamic Markdown loader (dmd.js)
=======================

If javascript is enabled, dmd.js automatically collect contents written in
markdown with their name and create a menu that references these contents.
Markdown contents are shown with converted with `marked()`.

If javascript is not enabled, contents can be read as `pre`ed markdown or links
to external files.


Elements
--------


### #dmd-content

When you are constructing a source, this element should has as children elements
who have classes `"dmd-page"` and `title` attributes.
Currently `pre` and `a` elements are allowed for these children.
Values of `title` attributes are used for names of links and hashes.
`title`s must be unique in these children (otherwise latter one overwrites
former one).

If javascript works, when loading the page all children of this element (not
only `pre` and `a` elements) are removed.
When the hash changes the content whose title is specified by the hash is
`marked()` and added as the child of this element.


### ul#dmd-menu

If this element exists and javascript works, `li` elements each of who has an
`a` element that references hash + `title` are appended.
