#!/usr/bin/env python3
# -*- coding: utf-8 -*- #

AUTHOR = '10sr'
SITENAME = '10sr.github.io/b'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Asia/Tokyo'

DEFAULT_LANG = 'ja'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
# LINKS = (('Pelican', 'http://getpelican.com/'),
#          ('Python.org', 'http://python.org/'),
#          ('Jinja2', 'http://jinja.pocoo.org/'),
#          ('You can modify those links in your config file', '#'),)
LINKS = (("Top", "https://10sr.github.io"),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True


##########
### Themes

THEME = 'theme'
# #USER_LOGO_URL = 'https://s.gravatar.com/avatar/a5f8f466a1c07ac174d899690fdfcbe7?s=80'
# USER_LOGO_URL = ''
CUSTOM_HEADER_HTML = '''
<style>
#sidebar .profile {
    display: none;
}
</style>
'''

DIRECT_TEMPLATES = ('index', 'categories', 'authors', 'archives', 'sitemap', 'robots', 'humans')
ROBOTS_SAVE_AS = 'robots.txt'
HUMANS_SAVE_AS = 'humans.txt'
SITEMAP_SAVE_AS = 'sitemap.xml'
DEFAULT_LANG = 'en'
DATE_FORMATS = { 'en': '%B %d, %Y', }
STATIC_PATHS = ['images', 'favicon.ico']
SITEDESCRIPTION = 'sample blog'
# TYPOGRIFY=True
