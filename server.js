var TelegramBot = require('node-telegram-bot-api');

var token = '227027346:AAFG7OOPZN-Da09WAB5MpDVTwWwPtZHZ2Gg';
var port = process.env.OPENSHIFT_NODEJS_PORT;
var host = process.env.OPENSHIFT_NODEJS_IP;
var domain = process.env.OPENSHIFT_APP_DNS;
// Setup polling way
var bot = new TelegramBot(token, {webHook: {port: port, host: host,polling: true}});

bot.setWebHook(domain+':443/bot'+token);
// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

bot.onText(/\/oi (.+)/, function (msg, match) {
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
  var photo = 'cats.png';
  bot.sendMessage(fromId, 'teste');
});
