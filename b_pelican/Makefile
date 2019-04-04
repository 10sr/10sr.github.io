pipenv ?= pipenv
pelican := $(pipenv) run pelican
root := $(CURDIR)

content_dir := ./content

.PHONY: default help gen start stop new installdeps

default: help

help:

installdeps:
	$(pipenv) install

theme: pelicanyan  # Update this to change theme

pelicanyan:
	git clone --depth 1 --branch 10sr "https://github.com/10sr/pelicanyan.git" pelicanyan
	#git checkout 10sr

gen: theme
	$(pelican) ./${content_dir} -s ./publish_conf.py
	git add ../b

start stop restart:
	$(pipenv) run ./develop_server.sh $@ 8989


newfile := ${content_dir}/$(shell date +'%Y%m%d%H%M%S').md
new: ${newfile}
${newfile}:
	! test -f ${newfile}
	{ echo "Title: " && echo "Date: `date +'%Y-%m-%d %H:%M'`" && echo "Category: "; } \
		>${newfile}
