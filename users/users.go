package main

import (
	"os"
	"net/http"
	"fmt"
	"github.com/garyburd/redigo/redis"
)

var c redis.Conn = newConn()

func newConn() redis.Conn {
	co, err := redis.Dial("tcp", fmt.Sprint(os.Getenv("DATABASE_HOST"),":6379"))
	if err != nil {
		panic(err)
	}
	return co
}

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "<p>You are at /%s</p><p>Also, redis says <b>%s</b></p>", r.URL.Path[1:], redisGet())
}

func redisGet() string {
	v, err := c.Do("GET", "foo")
	if err != nil {
		return fmt.Sprintf("GET ERROR: %s", err)
	}
	s, err := redis.String(v, err)
	if err != nil {
		return fmt.Sprintf("STRING ERROR: %s", err)
	}
	return s
}

func main() {
	defer c.Close()
	c.Send("SET", "foo", "hi")
	c.Flush()
	c.Receive()
	http.HandleFunc("/", handler)
	http.ListenAndServe(":7890", nil)
}
