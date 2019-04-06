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

serve:
	$(nikola) $@ -b

auto:
	$(nikola) $@ -b

new_post:
	$(nikola) $@ --format=markdown
