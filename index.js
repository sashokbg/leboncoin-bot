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
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Referer': 'https://www.leboncoin.fr/recherche/?category=10&locations=Saint-Mand%C3%A9_94160__48.83811_2.4196_1263,Issy-les-Moulineaux_92130__48.82392_2.2679_2330,Montrouge_92120__48.81601_2.31837_1420,Vanves_92170__48.82129_2.28913_1437,Malakoff_92240__48.81706_2.29825_1792&real_estate_type=2&price=1000-1200&square=35-max',
      'api_key': 'ba0c2dad52b3ec',
      'Content-Type': 'application/json',
      'Origin': 'https://www.leboncoin.fr',
      'Connection': 'keep-alive',
      'Cookie': "datadome=PNw_lmZLJNzv5zduHzgpj5RbSIbYIyYx.jC1oCcSDhpS8Z7MM2cR34zkV2Hrg7PrHU9_-acis_G1~.x2kSihT8BWUUtux6K-qAFwSl6WZL; consent_allpurpose=; cookieBanner=1; utag_main=:undefined$v_id:016dc43a08da001c2edeaac9fcf10104c013800900bd0$_sn:1$_ss:1$_pn:1%3Bexp-session$_st:1570957061994$ses_id:1570955200730%3Bexp-session; xtvrn=$562498$; xtan562498=-undefined; xtant562498=1; _pulse2data=c66bda2c-7801-4afb-a80a-81f5e7d62980%2Cv%2C%2C1570956119789%2CeyJpc3N1ZWRBdCI6IjIwMTktMTAtMTNUMDg6MjY6NTlaIiwiZW5jIjoiQTEyOENCQy1IUzI1NiIsImFsZyI6ImRpciIsImtpZCI6IjIifQ..RPRXhNbnOC2xYriTXL6NAQ.vjYZpdzVQI3_9ndDxEsVOqiaTeqnMjHv1CYrsZLZsM5rg0-R41_WahS8wzeLAoJGFlcD3KHMWACjaDzQVuX4xIIDMbhK3DX2obGXxYCEIbIUGbYYkkaL5SpVTZskT4cK7ibH88cTXT6US3lw7U5VUZ5DZZ-K57K2vymQUZIQ5Q8aP7A7zAr--d2NItKdO-3JjCSnVud5-32pws85SVdsvQ.YepFD8RM4HsFXEkaDdy62g%2C%2C0%2Ctrue%2C%2CeyJraWQiOiIyIiwiYWxnIjoiSFMyNTYifQ..I0ix9URHqt5P09tP5R2NciGu7Da25tMLQJKLCe5hE_s; shippableOnboarding=1; saveOnboarding=1' --data $'{\"filters\":{\"category\":{\"id\":\"10\"},\"enums\":{\"ad_type\":[\"offer\"],\"real_estate_type\":[\"2\"]},\"keywords\":{},\"location\":{\"locations\":[{\"locationType\":\"city\",\"city\":\"Saint-Mand\xe9\",\"zipcode\":\"94160\",\"label\":\"Saint-Mand\xe9 (94160)\",\"area\":{\"lat\":48.83811,\"lng\":2.4196,\"default_radius\":1263}},{\"locationType\":\"city\",\"city\":\"Issy-les-Moulineaux\",\"zipcode\":\"92130\",\"label\":\"Issy-les-Moulineaux (92130)\",\"area\":{\"lat\":48.82392,\"lng\":2.2679,\"default_radius\":2330}},{\"locationType\":\"city\",\"city\":\"Montrouge\",\"zipcode\":\"92120\",\"label\":\"Montrouge (92120)\",\"area\":{\"lat\":48.81601,\"lng\":2.31837,\"default_radius\":1420}},{\"locationType\":\"city\",\"city\":\"Vanves\",\"zipcode\":\"92170\",\"label\":\"Vanves (92170)\",\"area\":{\"lat\":48.82129,\"lng\":2.28913,\"default_radius\":1437}},{\"locationType\":\"city\",\"city\":\"Malakoff\",\"zipcode\":\"92240\",\"label\":\"Malakoff (92240)\",\"area\":{\"lat\":48.81706,\"lng\":2.29825,\"default_radius\":1792}}]},\"ranges\":{\"price\":{\"min\":1000,\"max\":1200},\"square\":{\"min\":35}}},\"limit\":35,\"limit_alu\":3}"
    },
    gzip: true
  }

  request.post(options, async (error, response, body) => {
    if(error) {
      console.log('ERROR', error);
    }

    if(response.statusCode != 200) {
      viberBot.sendFail()
    }

    for(ad of body.ads) {
      let found = persistedAds.find(element => { return element.list_id == ad.list_id});

      if(found) {
        console.log('Found existing ad', ad.list_id);
      } else { 
        console.log('Found NEW ad', ad.list_id);
        viberBot.sendMessage(ad);
      }
    }

    await storage.setItem('ads', body.ads)
  });

}

fetchAds().then();
