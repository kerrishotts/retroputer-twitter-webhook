const request = require('request-promise');
const auth = require('../helpers/auth');
const socket = require('../helpers/socket');
const bot = require('../bot');


var activity = function (req, resp) {
  var json_response = {
    socket_host: req.headers.host.indexOf('localhost') == 0 ? 'http://' + req.headers.host : 'https://' + req.headers.host,
    activity_event: socket.activity_event
  }
  resp.render('activity', json_response)
  bot.handle_event(socket.activity_event);
}


module.exports = activity