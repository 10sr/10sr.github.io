theme: themes/lanyon-hugo

themes/lanyon-hugo:
	git clone https://github.com/10sr/lanyon-hugo.git $@


local:
	hugo server -D


build:
	hugo -D

git-add:
	git add ../b

new:
#	$(nikola) $@ --format=markdown
	./gen_new_post.sh
