var TelegramBot = require('node-telegram-bot-api');

var token = '227027346:AAFG7OOPZN-Da09WAB5MpDVTwWwPtZHZ2Gg';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

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
  var const HOST = 'Host: ';
  var const SERVICE = 'Service: ';
  var const USER = 'User: ';
  switch (expression) {
    case 'prod-mvs':
      bot.sendMessage(fromId, HOST+'exa01.maquinadevendas.corp');
      bot.sendMessage(fromId, SERVICE+'mvs');
      bot.sendMessage(fromId, USER+'webapp');
      break;
    case 'prod-relo':
      bot.sendMessage(fromId, HOST+'exa01.maquinadevendas.corp');
      bot.sendMessage(fromId, SERVICE+'relo');
      bot.sendMessage(fromId, USER+'webapp');
      break;
    default:
      bot.sendMessage(fromId, 'Digite o ambiente (dese, homol, prod) seguido do service.');
  }
});

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  var photo = 'cats.png';
  bot.sendMessage(fromId, 'teste');
});

function sendMessageCuston(chatId, label, info){
  bot.sendMessage(chatId, label+info);
}
