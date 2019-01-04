pipenv ?= pipenv
pelican := $(pipenv) run pelican
root := $(PWD)

.PHONY: default help gen start stop

default: help

help:

hss:
	git clone --depth 1 --branch 10sr https://github.com/10sr/pelican-hss.git hss
	git checkout 10sr

gen: hss
	$(pelican) ./content -s ./publishconf.py
	git add ../b

start stop:
	$(pipenv) run ./develop_server.sh $@ 8888
