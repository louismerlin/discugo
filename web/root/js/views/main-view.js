var app = app || {}

app.view = function(ctrl) {
  return [
    m('h1', 'discugo'),
    m('div#channels', [
      m('h2', 'channels'),
      m('ul', [
      ])
    ]),
    m('div#messages', [
      m('h2', 'messages'),
      m('ul', [
        ctrl.list.map(function(message, index) {
          return m('li', message.body)
        })
      ])
    ]),
    app.connection(ctrl)
  ];
};
