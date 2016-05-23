var TelegramBot = require('node-telegram-bot-api');

var token = '222456534:AAEQr44fRiX1I6GXcxZYctTJ_25hp5gNJ7U';
// See https://developers.openshift.com/en/node-js-environment-variables.html
var port = process.env.OPENSHIFT_NODEJS_PORT;
var host = process.env.OPENSHIFT_NODEJS_IP;
var domain = process.env.OPENSHIFT_APP_DNS;

var bot = new TelegramBot(token, {webHook: {port: port, host: host}});
// OpenShift enroutes :443 request to OPENSHIFT_NODEJS_PORT
bot.setWebHook(domain+':443/bot'+token);
// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
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
  var photo = 'cats.png';
  bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
});
