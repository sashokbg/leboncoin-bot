const request = require('request')
const searchPayload = require('./searchParams')
const storage = require('node-persist')
const viberBot = require('./viberBot')

const fetchAds = async () => {
  await storage.init();

  let persistedAds = await storage.getItem('ads');
  if(!persistedAds) {
    persistedAds = []
  }

  let options = {
    url: 'https://api.leboncoin.fr/finder/search',
    json: searchPayload,
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:69.0) Gecko/20100101 Firefox/69.0',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      'Host': 'api.leboncoin.fr',
      'accept-encoding': 'gzip, deflate'
    },
    gzip: true
  }


  request.post(options, async (error, response, body) => {
    if(error) {
      console.log('ERROR', error);
    }

    viberBot.sendMessage(body.ads[0]);

    for(ad of body.ads) {
      let found = persistedAds.find(element => { return element.list_id == ad.list_id});

      if(found) {
        console.log('Found existing ad', ad.list_id);
      } else { 
        console.log('Found NEW ad', ad.list_id);
      }
    }

    await storage.setItem('ads', body.ads)
  });

}

fetchAds().then();
