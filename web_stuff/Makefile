name = web_stuff

build:
	docker build . -t filipbumbu/node-web-app

run:
	docker run -p 8000:8080 -d filipbumbu/node-web-app

get:
	wget -O - -q http://localhost:8000/

stop:
	docker container stop filipbumbu/node-web-app
