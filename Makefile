VERSION=$(shell jq --raw-output ".version" package.json)

default:
	@echo "make update?"

build:
	webpack --config webpack.prod.js && cd dist && zip -r ../purple-pi.zip * && cd -

tag:
	@if [ "$(shell git rev-parse --abbrev-ref HEAD)" != "main" ]; then exit 1; fi
	@echo "Tagging release version v$(VERSION)..."
	# Always create a github "release"
	curl -H "Authorization: token `cat $(HOME)/.github-access-token`" -d '{"tag_name": "v$(VERSION)"}' https://api.github.com/repos/nschloe/purple-pi/releases

update:
	npm update
	npm update --save-dev
	npm outdated

format:
	npm run format

lint:
	npm run lint

clean:
	rm -rf dist/ node_modules/ purple-pi.zip
