hexo := ./node_modules/.bin/hexo

.PHONY: install generate

themes/dxx:
	git clone https://github.com/fuzhouxxdong/hexo-theme-dxx.git themes/dxx

install:
	npm install

generate:
	$(hexo) generate
