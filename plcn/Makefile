pipenv ?= pipenv
pelican := $(pipenv) run pelican
root := $(PWD)

.PHONY: default help

default: help

help:

gen:
	$(pelican) ./content
