# William Newman - Quiz Core Project Backend
Business logic for the Quiz Core Project

## Project Repos
This the application layer of the Quiz Core project held in the repository located at:

## Getting Started

These instructions will help you run the Quiz Core project

Open up this project with IntelliJ and make sure that Maven has imported all dependencies
Default socket is set to localhost:27023 as the database is set to publish to this host and port

Run the ApplicationRunner class

For the detailed documentation on using this API, refer to the Swagger Documentation
To view the Swagger Documentation, navigate your browser to http://localhost:8080/swagger-ui.html with TriviaRunner running

## Setup Testing

It is recommended to have the project database running on localhost:27023 before running tests

## A note about Code Quality

IntelliJ's code formatter has been run on each file in this project, however the spaces between the import statements
    have been removed. Using the formatter will re-create these empty lines
    
#### Building The Docker Image
	
```
$ docker build -t quizcore .
```
#### Running The Docker Image
	
```
$ docker run -d -p 27023:27017 --name quizcore mongo
```

```
In a terminal window:

$ docker exec -it quizcore mongo - will connect to the running container and start the mongo shell.
...
> show databases
	admin
	quizcore
	local
> type your commands here...
```