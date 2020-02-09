const selogerSearchParams = require('./seloger-search-params.elise')

module.exports = {
  matches: (element, ad) => {
    return element.id == ad.id;
  },
  getAds: (body) => {
    return body.classifiedsData.classifieds;
  },
  mapAd: (ad) => {
    return {
      id: ad.id,
      published: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      index_date: null,
      subject: ad.description,
      price: ad.pricing.price,
      location: ad.address,
      url: ad.classifiedURL
    }
  },
  searchOptions: {
    url: 'https://www.seloger.com/list/api/externaldata?from=0&size=25&isSeo=false',
    json: selogerSearchParams,
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:69.0) Gecko/20100101 Firefox/69.0",
      "Accept": "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/json"
    },
    gzip: true
  }
};

