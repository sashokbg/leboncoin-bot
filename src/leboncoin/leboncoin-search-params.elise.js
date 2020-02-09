module.exports = {
  "filters": {
    "category": {"id": "10"},
    "enums": {
      "ad_type": ["offer"],
      "furnished": ["1", "2"],
      "real_estate_type": ["1", "2"]
    },
    "keywords": {},
    "location": {
      "locations": [{
        "locationType": "city",
        "city": "Paris",
        "label": "Paris (toute la ville)",
        "area": {
          "lat": 48.85790400439863,
          "lng": 2.358842071208555,
          "default_radius": 10000
        }
      }]
    },
    "ranges": {
      "price": {"min": 750, "max": 1000},
      "rooms": {"min": 2, "max": 2},
      "square": {"min": 30, "max": 40}
    }
  },
  "limit": 35,
  "limit_alu": 3,
  "user_id": "df122bfd-4594-40db-85e6-99523002e6ea",
  "store_id": "9184961"
};
