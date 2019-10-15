const request = require('request')
const searchPayload = require('./searchParams')
const storage = require('node-persist')
const viberBot = require('./viberBot')

const sendAdMessage = (ad) => {
  console.log('Sending New Ad Info', ad.list_id);

  let adInfos = {
    id: ad.list_id,
    published: ad.first_publication_date,
    index_date: ad.index_date,
    subject: ad.subject,
    price: ad.price,
    location: ad.location.city_label,
    url: ad.url
  }

  viberBot.sendMessage(adInfos);
}

const fetchAds = async () => {
  await storage.init();

  let persistedAds = await storage.getItem('ads');
  if(!persistedAds) {
    persistedAds = []
  }

  let options = {
    url: 'https://api.leboncoin.fr/finder/search',
    json: searchPayload,
        "headers": {
          "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:69.0) Gecko/20100101 Firefox/69.0",
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "api_key": "ba0c2dad52b3ec",
          "Content-Type": "application/json"
        },
    gzip: true
  }

  request.post(options, async (error, response, body) => {
    if(error) {
      console.log('ERROR', error);
    }

    if(response.statusCode != 200) {
      console.log('Request Failed:', body);

      let connected = await storage.getItem('connected');

      if(connected) {
        viberBot.sendFail()
        await storage.setItem('connected', false)
      }


    } else {
      for(ad of body.ads) {
        if(process.env.BOT_DEBUG){
          sendAdMessage(ad); 
          break;
        }

        await storage.setItem('connected', true)

        let found = persistedAds.find(element => { return element.list_id == ad.list_id});

        if(found) {
          console.log('Found existing ad', ad.list_id);
        } else {
          sendAdMessage(ad);
        }
      }

      await storage.setItem('ads', body.ads)
    }
  });
}



fetchAds().then();
