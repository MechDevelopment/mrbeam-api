build:
	docker build -t mrbeamimage .
run:
	docker run -p 3000:3000 --rm --name mrbeamcontainer mrbeamimage
stop:
	docker stop mrbeamcontainer