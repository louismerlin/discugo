FROM golang:1.6
ADD . /go/src/app

WORKDIR /go/src/app
RUN go-wrapper download
RUN go-wrapper install

EXPOSE 8080
CMD ["go-wrapper", "run"]
