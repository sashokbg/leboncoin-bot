const request = require('request')

let options = {
  url: "https://chatapi.viber.com/pa/broadcast_message",
  headers: {
    "X-Viber-Auth-Token": process.env.VIBER_TOKEN,
    "Content-Type": "application/json"
  },
  json: {
    "broadcast_list": [
      "xidS7ITlzNcKv7loIugiRQ==",
      "aLbLdl+NYtKXHzCSYIMNTQ==",
      "u/odStNUkLrC6L++K20HpQ==",
      "DJJ/82hcEWwbobe8jC/Epw==",
      "KdahcKPw3legqB6EH9M+iA=="
    ],
    "min_api_version": 1,
    "sender": {
      "name": "Ads Bot",
      "avatar": "https://ca-times.brightspotcdn.com/dims4/default/8e4e151/2147483647/strip/true/crop/960x539+0+0/resize/840x472!/quality/90/?url=https%3A%2F%2Fca-times.brightspotcdn.com%2Fc9%2F98%2Ffa3b0cb001e3541c5818a89cd5cc%2Fla-1475087498-snap-photo"
    },
    "tracking_data": "tracking data",
    "type": "text",
    "text": ""
  }
};

module.exports = {
  sendFail: (provider) => {
    options.json.text = `No data received from ${provider}.\nBot disconnected.`
    request.post(options, (err, res, body) => {
      if (err) {
        console.log('ERROR', error);
      } else {
        console.log('Message sent:', body);
      }
    })
  },

  sendReconnect: (provider) => {
    options.json.text = `Message received from ${provider}.\nBot back online.`
    request.post(options, (err, res, body) => {
      if (err) {
        console.log('ERROR', error);
      } else {
        console.log('Message sent:', body);
      }
    })
  },

  sendMessage: (adInfos) => {
    console.log('Sending message via viber bot for ad:', adInfos);

    options.json.text = `ID: ${adInfos.id}\n` +
        `Published: ${adInfos.published}\n` +
        `Indexed: ${adInfos.index_date}\n` +
        `Subject: ${adInfos.subject}\n` +
        `Price: ${adInfos.price}\n` +
        `Location: ${adInfos.location}\n` +
        `URL: ${adInfos.url}`

    request.post(options, (err, res, body) => {
      if (err) {
        console.log('ERROR', err);
      } else {
        console.log('Message sent:', body);
      }
    })
  }
}
