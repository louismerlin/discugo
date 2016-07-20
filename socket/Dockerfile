FROM golang:1.6
ADD . /go/src/app/

WORKDIR /go/src/app
RUN go-wrapper download
RUN go-wrapper install
#RUN export GOROOT=/usr/local/go
#RUN export GOPATH=/usr/local/go
#RUN export PATH=$PATH:$GOROOT/bin
#RUN go get golang.org/x/net/websocket
#RUN go install app

EXPOSE 8081
CMD ["go-wrapper", "run"]
#ENTRYPOINT /go/bin/app
#CMD ["go", "run", "/go/src/app/main.go"]
