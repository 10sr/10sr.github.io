pipenv ?= pipenv
pelican := $(pipenv) run pelican
root := $(CURDIR)

content_dir := ./content

.PHONY: default help gen start stop new

default: help

help:

hss:
	git clone --depth 1 --branch 10sr "https://github.com/10sr/pelican-hss.git hss"
	git checkout 10sr

gen: hss
	$(pelican) ./${content_dir} -s ./publishconf.py
	git add ../b

start stop:
	$(pipenv) run ./develop_server.sh $@ 8989


newfile := ${content_dir}/$(shell date +'%Y%m%d%H%M%S').md
new: ${newfile}
${newfile}:
	! test -f ${newfile}
	{ echo "Title: " && echo "Date: `date +'%Y-%m-%d %H:%M'`" && echo "Category: "; } \
		>${newfile}
