Steps to boot the server normally

1. install node on your local machine
2. run the command :- git clone https://github.com/Nayanava/localizer.git
3. once you have the codebase on your local
    - navigate to the location <path_to_directory>/localizer
4. Execute the command
   - node app-server.js
   - the following line should appear
	REST API listening on :::8080

Steps to run the server in docker
1. install docker on your local machine
2. Same as above Step 2
3. navigate to the location where the Dockerfile is present
4. Execute the following commands
    - docker build . -t localizer
    - docker run -p 3000:8080 -d localizer

For detailed information on how to run a docker container for node.js please follow the below link
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
