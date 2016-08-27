var app = app || {};

app.ENTER_KEY = 13;

m.route(document.getElementById('discugo'), '/', {
  '/': app,
  '/:filter': app
});
