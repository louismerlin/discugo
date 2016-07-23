package discu

import "time"

type Message struct {
	Author		string `json:"author"`
	Body			string `json:"body"`
	Channel		string `json:"channel"`
	TimeSent	time.Time
}

func (self *Message) String() string {
	return self.Author + " says " + self.Body + " in " + self.Channel
}
