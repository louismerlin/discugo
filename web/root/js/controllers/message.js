var app = app || {};

app.controller = function() {
    this.list = new app.List();

    this.newMessage = function(message) {
      message = JSON.parse(message);
      this.list.push(new app.Message({
        author: message.author,
        body: message.body,
        timesent: message.TimeSent,
        channel: message.channel
      }));
      console.log(message.body);
    }

    this.connected = function(conn) {
      console.log("connected : " + conn)
    }

};


app.connection = function(ctrl) {
  var ws = new WebSocket("ws://localhost:8080/ws/");

  ws.onopen = function(ev) {
    ctrl.connected(true);
  };
  ws.onclose = function(ev) {
    ctrl.connected(false);
  };
  ws.onerror = function(ev) {
    console.log('Error: '+ev);
  };
  ws.onmessage = function(event) {
    ctrl.newMessage(event.data);
  };

  return [m('p', 'connection!')];

};
