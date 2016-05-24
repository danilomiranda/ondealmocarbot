var TelegramBot = require('node-telegram-bot-api');
var graph = require('fbgraph');
var token = '222456534:AAEQr44fRiX1I6GXcxZYctTJ_25hp5gNJ7U';
// See https://developers.openshift.com/en/node-js-environment-variables.html
var port = process.env.OPENSHIFT_NODEJS_PORT;
var host = process.env.OPENSHIFT_NODEJS_IP;
var domain = process.env.OPENSHIFT_APP_DNS;

graph.setAccessToken("EAAQQh0kZBgikBAGZA3PntU3QNACHUJ96AIpbI0BhKE6nMtUeEmkrjdlR3x8HQj67vOZAiphop4FwLhP6IamsT5eibt5tpqlx0guL6Ie7ZBtZAzXbleXb1QexNMu19bE3mnpAYaHYvsdlXZAFwKbqsakxQpdijzJvGkqJ6AvaJyAGPFQLy6x9Fs");
var bot = new TelegramBot(token, {webHook: {port: port, host: host}});
// OpenShift enroutes :443 request to OPENSHIFT_NODEJS_PORT
bot.setWebHook(domain+':443/bot'+token);
// Matches /echo [whatever]
bot.onText(/\/queroalmocar (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = '';
  var text = match[1];
  var searchOptions = {
    q:     text,
    type:  "place",
    center: "-12.8892120,-38.3121390"
  };
  graph.search(searchOptions, function(err, res) {
    resp = res[0].name;
    console.log(res); // {data: [{id: xxx, from: ...}, {id: xxx, from: ...}]}
  });
  bot.sendMessage(fromId, resp);

});

bot.onText(/\/datasource (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var expression = match[1];
  var resp = '';
  switch (expression) {
    case 'quem sou eu?':
      resp = 'Um nerd sem demanda provavelmente.';
      break;
    case 'como assim?':
      resp = 'Marcio, arruma uma demanda para esse jovem.';
      break;
    default:
      resp = 'ninguem';
  }
  bot.sendMessage(fromId, resp);
});

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  var photo = 'cat.jpg';
  bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
});
