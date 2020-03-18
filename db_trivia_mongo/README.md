# Quiz Core Project - Sample Database

The Dockerfile in this project creates a modified MongoDB
Database with sample data for the Quiz Core Project.

## Getting Started

These instructions will get you a copy of the project up and running on your local
machine for development and testing purposes.

Clone down this repo found on my [Github]().

Make sure that you have [Docker](https://www.docker.com/products/overview) installed
on your local machine. You will need Docker in order to run the sample database image.

### Using the Docker Image

The following sections outline the use

#### Deleting the previous Docker container

First, stop the container using

```
docker container stop bridge_db
```

and then kill the container using

```
docker rm bridge_db
```

#### Building The Docker Image

While in this folder, run

```
$ docker build -t quizcore .
```

#### Running The Docker Image

```
$ docker run -d -p 32768:27017 --name quizcore quizcore
```

#### Connecting to MongoDB

You can use MongoDB Compass, Robo 3T, or the Terminal to connect to the
running MongoDB instance. All collections are located in the 'quizcore' database.

In a terminal window:

```
$ docker exec -it quizcore mongo 
```

- will connect to the running container and start the mongo shell.

To show all databases in the container:

```
$ show databases
```
And you should recieve:

```
	admin
	quizcore
	local
```

## Built With

* [Docker](https://www.docker.com/) - Containerization Engine
* [MongoDB](https://www.mongodb.com/) - Document Database Management System

## Author

* **William Newman** - *Shameless copypasting of README content* - [wnewman@catalyte.io](mailto:wnewman@catalyte.io)