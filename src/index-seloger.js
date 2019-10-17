const Bot = require('./bot');
const seLogerConfig = require('./seloger/seloger-bot-config');

let bot = new Bot('seloger', seLogerConfig);
bot.fetchAds().then();
