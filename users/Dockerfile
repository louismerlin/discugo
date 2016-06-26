FROM golang:1.6
RUN go get github.com/garyburd/redigo/redis
ADD . /go/src/app

EXPOSE 7890
CMD ["go", "run", "/go/src/app/users.go"]
