const request = require('request');
const storage = require('node-persist');
const viberBot = require('./viber/viber-bot');

class Bot {

  constructor(botName, botConfig) {
    this.botName = botName;
    this.botConfig = botConfig;
  }

  sendAdMessage(ad) {
    let adInfos = this.botConfig.mapAd(ad);
    console.log('Sending New Ad Info', adInfos.id);

    viberBot.sendMessage(adInfos);
  }

  async fetchAds() {
    console.log(`${new Date().toLocaleString()}: Starting ${this.botName}`);
    await storage.init();

    let persistedAds = await storage.getItem(`${this.botName}-ads`);
    if (!persistedAds) {
      persistedAds = []
    }

    let requestOptions = this.botConfig.searchOptions;

    request.post(requestOptions, async (error, response, body) => {
      let connected = await storage.getItem(`${this.botName}-connected`);

      if (error) {
        console.log('ERROR', error);
      }

      if (response.statusCode !== 200) {
        console.log('Request Failed:', body);

        if (connected) {
          viberBot.sendFail(this.botName)
          await storage.setItem(`${this.botName}-connected`, false)
        }

      } else {
        let ads = this.botConfig.getAds(body);
        for (let ad of ads) {
          if (process.env.BOT_DEBUG) {
            sendAdMessage(ad);
            break;
          }

          if (!connected) {
            viberBot.sendReconnect(this.botName);
          }
          await storage.setItem(`${this.botName}-connected`, true)

          let found = persistedAds.find((element) => {
            return this.botConfig.matches(element, ad)
          });

          if (found) {
            console.log('Found existing ad', this.botConfig.mapAd(ad).id);
          } else {
            this.sendAdMessage(ad);
          }
        }

        await storage.setItem(`${this.botName}-ads`, ads)
      }
    });
  }
}

module.exports = Bot;
