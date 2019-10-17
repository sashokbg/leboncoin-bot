const Bot = require('./bot');
const leboncoinConfig = require('./leboncoin/leboncoin-bot-config');

let bot = new Bot('leboncoin', leboncoinConfig);
bot.fetchAds().then();
