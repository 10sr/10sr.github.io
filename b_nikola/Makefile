pipenv := pipenv
nikola := $(pipenv) run nikola
output_dir := ../b

themes:
	git clone https://github.com/10sr/nikola-themes.git themes

installdeps:
	$(pipenv) install

update: build
	git add $(output_dir)

build: themes
	$(nikola) $@

remove_posts:
	$(RM) -rfv $(output_dir)/posts

serve:
	$(nikola) $@ -b

local: auto  # Run local server
auto:
	$(nikola) $@ -b

new_post:
#	$(nikola) $@ --format=markdown
	./new_post.sh


new: new_post
