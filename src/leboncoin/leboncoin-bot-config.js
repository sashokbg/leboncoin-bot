const lebonCoinSearchParams = require('./leboncoin-search-params.elise')

module.exports = {
  matches: (element, ad) => {
    return element.list_id == ad.list_id;
  },
  getAds: (body) => {
    return body.ads;
  },
  mapAd: (ad) => {
    return {
      id: ad.list_id,
      published: ad.first_publication_date,
      index_date: ad.index_date,
      subject: ad.subject,
      price: ad.price,
      location: ad.location.city_label,
      url: ad.url
    }
  },
  searchOptions: {
    url: 'https://api.leboncoin.fr/finder/search',
    json: lebonCoinSearchParams,
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:69.0) Gecko/20100101 Firefox/69.0",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "api_key": "ba0c2dad52b3ec",
      "Content-Type": "application/json"
    },
    gzip: true
  },
};

