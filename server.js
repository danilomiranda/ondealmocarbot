var TelegramBot = require('node-telegram-bot-api');
var request = require('request');

var faceGraph = require('./faceGraph.js');

// See https://developers.openshift.com/en/node-js-environment-variables.html
var port = process.env.OPENSHIFT_NODEJS_PORT;
var host = process.env.OPENSHIFT_NODEJS_IP;
var domain = process.env.OPENSHIFT_APP_DNS;


var bot = new TelegramBot(token, {webHook: {port: port, host: host}});
// OpenShift enroutes :443 request to OPENSHIFT_NODEJS_PORT
bot.setWebHook(domain+':443/bot'+token);
// Matches /echo [whatever]
bot.onText(/\/queroalmocar (.+)/, function (msg, match) {
  var fromId = msg.chat.id;
  var text = match[1];
  var page = faceGraph.search(text);

  bot.sendMessage(fromId, 'Recomendo: '+page.name+' Telefone: '+page.phone);
  var opts = {
  reply_markup: JSON.stringify(
    {
      force_reply: true
    }
  )};

  bot.sendMessage(USER, 'Não gostou? Quer outra opção?', opts)
  .then(function (sended) {
    var chatId = sended.chat.id;
    var messageId = sended.message_id;
    bot.onReplyToMessage(chatId, messageId, function (message) {
      console.log('User is %s years old', message.text);
    });
  });
});

bot.onText(/\/help (.+)/, function (msg, match) {
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
  //var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  //var photo = 'cat.jpg';
  //bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
});
