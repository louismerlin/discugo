# discugo
Go + Postgres + Websocket + Docker

## State of things
Single channel chat, and no Postgres link for the moment...
Also, identity is completely absent (or completely present, depending on your point of view :japanese_ogre:).

## Building and running
I use [docker-compose](https://www.docker.com/products/docker-compose). Make sure you have it installed and type in your
terminal from the root of the project:
```
docker-compose build
docker-compose up
```
You can then browse to [localhost:8080](http://localhost:8080/).

If you decide to make changes to the database scheme, make sure to `docker-compose rm db` before building and starting the project.

## TODO
 - Add multi-channel support
 - Add user system (not a priority)
