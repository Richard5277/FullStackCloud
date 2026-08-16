- TASK
1. Understand container networking, environment variables, volumes, health checks.

2. Move your images to:
Docker
   ↓
Amazon ECR
   ↓
EKS

One caveat: I wouldn't necessarily run MongoDB or Redis inside EKS in a production architecture. For the demo, Docker is great. In AWS, managed services such as ElastiCache and MongoDB Atlas are usually more appropriate.

- run Redis server seperately with Docker for local development

docker run --name redis -p 6379:6379 -d redis

docker run --name redis -p 6379:6379 -d redis:7

- redis:7-alpine installed

The standard redis image was failing on macOS Docker Desktop due to permission issues with background job initialization (the "Operation not permitted" error you saw).

The redis:7-alpine version solves this because:

Alpine Linux is lightweight — It has minimal system dependencies, avoiding permission conflicts
No background job errors — Alpine doesn't have the same permission restrictions that caused the crash
Better for local development — It's smaller and faster, ideal for development environments on macOS


- check docker / redis instance

docker ps | grep redis

container ID
1028f56ad5a4        

Image
redis:7-alpine      

command
"docker-entrypoint.s…"

ports
0.0.0.0:6379->6379/tcp   

name
redis


- command break down:
docker run --name redis -p 6379:6379 -d redis

- docker run
create a new Docker container from an image, and start it

- --name redis
container name

with this name, operation:

docker stop redis
docker start redis
docker restart redis
docker logs redis
docker exec -it redis redis-cli

- -p 6379:6379

-p HOST_PORT:CONTAINER_PORT

mac localhost:6379

-> Docker port mapping

-> Container port 6379

Redis itslef, listens on port 6379 inside the container

Node.js code can do: const redis = new Redis('redis://localhost:6379');

and Docker forwards that connection to: Redis container:6379

The two numbers don't have to be the same.


- -d
means:
Run the container in detached mode.
In other words, run it in the background.

- redis
the final redis
is the Docker image you're asking Docker to run.
Docker looks for an image called: redis
If you don't already have it locally, Docker will pull it from Docker Hub.

You can check your images: docker images


- whole command:
Create a container named redis, based on the Redis image, expose its port 6379 to my Mac's port 6379, and run it in the background.

- More ON Docker:

Redis image
    ↓ docker run
Redis container
    ↓
Redis process

Image = blueprint/template

Container = running instance created from that image

Redis = the actual application/process running inside the container.


- Dockerfile & docker-compose.yaml

Dockerfile describes how to package your app; Compose describes how multiple containers work together.
