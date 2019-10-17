const request = require('request')
const searchPayload = require('./seloger-search-params')
const storage = require('node-persist')
const viberBot = require('./viberBot')

const sendAdMessage = (ad) => {
  console.log('Sending New Ad Info', ad.id);

  let adInfos = {
    id: ad.id,
    published: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    index_date: null,
    subject: ad.description,
    price: ad.pricing.price,
    location: ad.address,
    url: ad.classifiedURL
  }

  viberBot.sendMessage(adInfos);
}

const fetchAds = async () => {
    console.log(`${new Date().toLocaleString()}: Starting`);
    await storage.init();

    let persistedAds = await storage.getItem('seloger_ads');

    if(!persistedAds) {
      persistedAds = []
    }

    let options = {
        url: 'https://www.seloger.com/list/api/externaldata?from=0&size=25&isSeo=false',
        json: searchPayload,
        "headers": {
            "User-Agent":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:69.0) Gecko/20100101 Firefox/69.0",
            "Accept":"application/json",
            "Accept-Language":"en-US,en;q=0.5",
            "Content-Type":"application/json"
        },
        gzip: true
    }

    request.post(options, async (error, response, body) => {
        if(error) {
            console.log('ERROR', error);
        }

        if(response.statusCode != 200) {
            console.log('Request Failed:', body);
            
            let connected = await storage.getItem('seloger_connected');
            
            if(connected) {
                viberBot.sendFail('Seloger')
                await storage.setItem('seloger_connected', false)
            }


        } else {
            for(ad of body.classifiedsData.classifieds) {
                await storage.setItem('seloger_connected', true)

                let found = persistedAds.find(element => { return element.id == ad.id});

                if(found) {
                    console.log('Found existing ad', ad.id);
                } else {
                    sendAdMessage(ad);
                }
            }

            await storage.setItem('seloger_ads', body.classifiedsData.classifieds)
        }
    });
}

fetchAds().then();
