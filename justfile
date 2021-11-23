version := `jq --raw-output ".version" package.json`

default:
	@echo "make update?"

build:
	npm run build

tag:
	@if [ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then exit 1; fi
	@echo "Tagging release version v{{version}}..."
	# Always create a github "release"
	curl -H "Authorization: token `cat ~/.github-access-token`" -d '{"tag_name": "v{{version}}"}' https://api.github.com/repos/nschloe/xhub/releases

publish: tag build

update:
	npm update
	npm update --save-dev
	npm outdated

format:
	npm run format

lint:
	npm run lint

clean:
	rm -rf dist/ node_modules/ xhub.zip
