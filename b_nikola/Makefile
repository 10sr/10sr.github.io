pipenv := pipenv
nikola := $(pipenv) run nikola

themes:
	git clone https://github.com/10sr/nikola-themes.git themes

installdeps:
	$(pipenv) install

build:
	$(nikola) $@

serve:
	$(nikola) $@ -b

new_post:
	$(nikola) $@ --format=markdown
