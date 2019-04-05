pipenv := pipenv
nikola := $(pipenv) run nikola

installdeps:
	$(pipenv) install

build:
	$(nikola) $@

serve:
	$(nikola) $@ -b

new_post:
	$(nikola) $@ --format=markdown
