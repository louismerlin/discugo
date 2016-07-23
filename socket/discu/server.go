package discu

import (
	"log"
	"net/http"
	"database/sql"
	"time"

	"golang.org/x/net/websocket"
	_ "github.com/lib/pq"
)

// Discu server.
type Server struct {
	pattern   string
	//messages  []*Message
	clients   map[int]*Client
	addCh     chan *Client
	delCh     chan *Client
	sendAllCh chan *Message
	doneCh    chan bool
	errCh     chan error
	db				*sql.DB
}

// Create new discu server.
func NewServer(pattern string) *Server {
	//messages := []*Message{}
	clients := make(map[int]*Client)
	addCh := make(chan *Client)
	delCh := make(chan *Client)
	sendAllCh := make(chan *Message)
	doneCh := make(chan bool)
	errCh := make(chan error)

	connection := "dbname=hello user=hello password=coffee host=db port=5432 sslmode=disable"
	db, err := sql.Open("postgres", connection)
	if err != nil {
		log.Fatal(err)
	}

	return &Server{
		pattern,
	//	messages,
		clients,
		addCh,
		delCh,
		sendAllCh,
		doneCh,
		errCh,
		db,
	}
}

func (s *Server) Add(c *Client) {
	s.addCh <- c
}

func (s *Server) Del(c *Client) {
	s.delCh <- c
}

func (s *Server) SendAll(msg *Message) {
	s.sendAllCh <- msg
}

func (s *Server) Done() {
	s.doneCh <- true
}

func (s *Server) Err(err error) {
	s.errCh <- err
}

func (s *Server) sendPastMessages(c *Client) {
	rows, err := s.db.Query(`SELECT * FROM messages`)
	if err != nil {
		s.Err(err)
	} else {
		defer rows.Close()
		for rows.Next() {
			var id int
			var author string
			var body string
			var channel string
			var time_sent time.Time
			err = rows.Scan(&id, &author, &body, &channel, &time_sent)
			if err != nil {
				s.Err(err)
			} else {
				msg := &Message{author, body, channel, time_sent}
				c.Write(msg)
			}
		}
		err = rows.Err() // get any error encountered during iteration
		if err != nil {
			s.Err(err)
		}
	}
}

func (s *Server) sendAll(msg *Message) {
	for _, c := range s.clients {
		c.Write(msg)
	}
}

func (s *Server) storeMessage(msg *Message) error {
	_, err := s.db.Query(`INSERT INTO messages (user_name, body, channel, time_sent)
	VALUES($1, $2, $3, $4)`, msg.Author, msg.Body, msg.Channel, msg.TimeSent)
	return err
}

// Listen and serve.
// It serves client connection and broadcast request.
func (s *Server) Listen() {

	log.Println("Listening server...")

	// websocket handler
	onConnected := func(ws *websocket.Conn) {
		defer func() {
			err := ws.Close()
			if err != nil {
				s.errCh <- err
			}
		}()

		client := NewClient(ws, s)
		s.Add(client)
		client.Listen()
	}
	http.Handle(s.pattern, websocket.Handler(onConnected))
	log.Println("Created handler")

	for {
		select {

		// Add new a client
		case c := <-s.addCh:
			log.Println("Added new client")
			s.clients[c.id] = c
			log.Println("Now", len(s.clients), "clients connected.")
			s.sendPastMessages(c)

		// del a client
		case c := <-s.delCh:
			log.Println("Delete client")
			delete(s.clients, c.id)

		// broadcast message for all clients
		case msg := <-s.sendAllCh:
			log.Println("Send all:", msg)
			//s.messages = append(s.messages, msg)
			s.sendAll(msg)

		case err := <-s.errCh:
			log.Println("Error:", err.Error())

		case <-s.doneCh:
			return
		}
	}
}
