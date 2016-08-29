// var app = app || {};

//app.ENTER_KEY = 13;

socket = (function() {
  var ws = new WebSocket("ws://localhost:8080/ws/");

  return {
    onChange: function(callback) {
      ws.onmessage = function(event) {
        callback(event);
      }
    },
    onConnect: function(callback) {
      ws.onopen = function(event) {
        callback(event);
      }
    },
    onDisconnect: function(callback) {
      ws.onclose = function(event) {
        callback(event);
      }
    },
    onError: function(callback) {
      ws.onerror = function(event) {
        callback(event);
      }
    }
  }
}());

var Message = {
  view: function(ctrl, args) {
    return m('p', args.body);
  }
}

var Home = {
  controller: function(args) {
    var ctrl = this;
    ctrl.messages = [];
    socket.onChange(function(event) {
      m.startComputation();
      ctrl.messages.push(JSON.parse(event.data));
      m.endComputation();
    });
  },
  view: function(ctrl, args) {
    var items = [];
    for (var i in ctrl.messages) {
      items.push(m.component(Message, ctrl.messages[i]));
    }
    return m('div', items);
  }
}
/*m.route(document.getElementById('discugo'), '/', {
  '/': app,
  '/:filter': app
});*/
m.mount(document.getElementById('discugo'), Home)
