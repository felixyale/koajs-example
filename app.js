var serve = require('koa-static');
var koa = require('koa');
var render = require('koa-ejs');
var path = require('path');
var app = koa();

// $ GET /package.json
app.use(serve('public'));

// or use absolute paths
// app.use(serve(__dirname + '/test/fixtures'));

var filters = {
  format: function (time) {
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
  },
  img: function(url) {
    return '<img src="' + url + '">';
  },
  css: function(url) {
    return '<link rel="stylesheet" href="' + url + '">';
  },
  asset: function(url) {
    
  }
};

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true,
  filters: filters
});

app.use(function* (next) {
  this.state = this.state || {};
  this.state.now = new Date();
  this.state.ip = this.ip;
  this.state.version = '2.0.0';
  yield next;
});

app.use(function *() {
  var users = [{name: 'Dead Horse'}, {name: 'Jack'}, {name: 'Tom'}];
  yield this.render('content', {
    users: users
  });
});

if (process.env.NODE_ENV === 'test') {
  module.exports = app.callback();
} else {
  app.listen(3000);
  console.log('open http://localhost:3000')
}

app.on('error', function (err) {
  console.log(err.stack)
})