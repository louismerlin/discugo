var app = app || {};

// Message Model
app.Message = function(data) {
  this.author = m.prop(data.author);
  this.body = m.prop(data.body);
  this.timesent = m.prop(data.timesent);
  this.channel = m.prop(data.channel);
};

var list = [];
app.List = function() {
  return list;
};

app.Channel = function(data) {
  this.name = data.name
  this.messages = [];
};
