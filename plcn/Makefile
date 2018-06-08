pipenv ?= pipenv
pelican := $(pipenv) run pelican
root := $(PWD)

.PHONY: default help gen start stop

default: help

help:

hss:
	git clone --depth 1 https://github.com/laughk/pelican-hss.git hss

gen: hss
	$(pelican) ./content -s ./publishconf.py

start stop:
	$(pipenv) run ./develop_server.sh $@ 8888
