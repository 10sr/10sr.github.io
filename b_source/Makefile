.PHONY: theme local build git-add new

theme: themes/lanyon-hugo
	cd themes/lanyon-hugo && git fetch && git switch -d origin/10sr

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
	./gen_new_post.sh "$(slug)"
