const request = require('request')

module.exports = {
  sendFail: () => {
    let options = {
      url: "https://chatapi.viber.com/pa/broadcast_message",
      headers: {
        "X-Viber-Auth-Token": process.env.VIBER_TOKEN,
        "Content-Type": "application/json"
      },
      json: {
         "broadcast_list":[  
            "xidS7ITlzNcKv7loIugiRQ==",
            "aLbLdl+NYtKXHzCSYIMNTQ=="
         ],
         "min_api_version":1,
         "sender":{
            "name":"Ads Bot",
            "avatar":"https://ca-times.brightspotcdn.com/dims4/default/8e4e151/2147483647/strip/true/crop/960x539+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fca-times.brightspotcdn.com%2Fc9%2F98%2Ffa3b0cb001e3541c5818a89cd5cc%2Fla-1475087498-snap-photo"
         },
         "tracking_data":"tracking data",
         "type":"text",
         "text": "No data received from leboncoin.\nBot disconnected."
      }
    }
  
    request.post(options, (err, res, body) => {
      if(err) {
        console.log('ERROR', error);
      } else {
        console.log('Message sent:', body);
      }
    })
  },

  sendMessage: (ad) => {
    console.log('Sending message via viber bot for ad:', ad);
    let adInfos = {
      id: ad.list_id,
      published: ad.first_publication_date,
      index_date: ad.index_date,
      subject: ad.subject,
      price: ad.price,
      url: ad.url
    }

    let options = {
      url: "https://chatapi.viber.com/pa/broadcast_message",
      headers: {
        "X-Viber-Auth-Token": process.env.VIBER_TOKEN,
        "Content-Type": "application/json"
      },
      json: {
         "broadcast_list":[  
            "xidS7ITlzNcKv7loIugiRQ==",
            "aLbLdl+NYtKXHzCSYIMNTQ=="
         ],
         "min_api_version":1,
         "sender":{
            "name":"Ads Bot",
            "avatar":"https://ca-times.brightspotcdn.com/dims4/default/8e4e151/2147483647/strip/true/crop/960x539+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fca-times.brightspotcdn.com%2Fc9%2F98%2Ffa3b0cb001e3541c5818a89cd5cc%2Fla-1475087498-snap-photo"
         },
         "tracking_data":"tracking data",
         "type":"text",
         "text": `ID: ${adInfos.id}\nPublished: ${adInfos.published}\nIndexed: ${adInfos.index_date}\nSubject: ${adInfos.subject}\nPrice: ${adInfos.price}\n${adInfos.url}`
      }
    }
  
    request.post(options, (err, res, body) => {
      if(err) {
        console.log('ERROR', error);
      } else {
        console.log('Message sent:', body);
      }
    })
  }
}
