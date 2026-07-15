// Central city catalog for Helvetic Freight.
// Keep city metadata here so the HTML shell stays compact and future changes remain small.
// Each entry is an object so updates are self-documenting; the app still accepts legacy tuple entries.
window.HF_CITY_CATALOG_SCHEMA = {
  version: 2,
  fields: ['id', 'name', 'coordinates.lat', 'coordinates.lng', 'tier', 'slots']
};
window.HF_CITY_CATALOG = [
  {
    "id": "zurich",
    "name": "Zürich",
    "coordinates": {
      "lat": 47.3769,
      "lng": 8.5417
    },
    "tier": 3,
    "slots": 5
  },
  {
    "id": "winterthur",
    "name": "Winterthur",
    "coordinates": {
      "lat": 47.4988,
      "lng": 8.7241
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "baden",
    "name": "Baden",
    "coordinates": {
      "lat": 47.4738,
      "lng": 8.3079
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "aarau",
    "name": "Aarau",
    "coordinates": {
      "lat": 47.3904,
      "lng": 8.0457
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "olten",
    "name": "Olten",
    "coordinates": {
      "lat": 47.3499,
      "lng": 7.9033
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "basel",
    "name": "Basel",
    "coordinates": {
      "lat": 47.5596,
      "lng": 7.5886
    },
    "tier": 3,
    "slots": 5
  },
  {
    "id": "liestal",
    "name": "Liestal",
    "coordinates": {
      "lat": 47.4845,
      "lng": 7.7345
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "sissach",
    "name": "Sissach",
    "coordinates": {
      "lat": 47.4645,
      "lng": 7.808
    },
    "tier": 1,
    "slots": 2
  },
  {
    "id": "solothurn",
    "name": "Solothurn",
    "coordinates": {
      "lat": 47.2088,
      "lng": 7.5323
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "bern",
    "name": "Bern",
    "coordinates": {
      "lat": 46.948,
      "lng": 7.4474
    },
    "tier": 3,
    "slots": 5
  },
  {
    "id": "thun",
    "name": "Thun",
    "coordinates": {
      "lat": 46.758,
      "lng": 7.628
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "interlaken",
    "name": "Interlaken",
    "coordinates": {
      "lat": 46.6863,
      "lng": 7.8632
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "spiez",
    "name": "Spiez",
    "coordinates": {
      "lat": 46.6847,
      "lng": 7.6911
    },
    "tier": 1,
    "slots": 2
  },
  {
    "id": "fribourg",
    "name": "Fribourg",
    "coordinates": {
      "lat": 46.8065,
      "lng": 7.1619
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "biel",
    "name": "Biel/Bienne",
    "coordinates": {
      "lat": 47.1368,
      "lng": 7.2468
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "neuchatel",
    "name": "Neuchâtel",
    "coordinates": {
      "lat": 46.9896,
      "lng": 6.9293
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "yverdon",
    "name": "Yverdon",
    "coordinates": {
      "lat": 46.7785,
      "lng": 6.6412
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "lausanne",
    "name": "Lausanne",
    "coordinates": {
      "lat": 46.5197,
      "lng": 6.6323
    },
    "tier": 3,
    "slots": 5
  },
  {
    "id": "montreux",
    "name": "Montreux",
    "coordinates": {
      "lat": 46.4312,
      "lng": 6.9107
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "vevey",
    "name": "Vevey",
    "coordinates": {
      "lat": 46.4628,
      "lng": 6.843
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "geneva",
    "name": "Genève",
    "coordinates": {
      "lat": 46.2044,
      "lng": 6.1432
    },
    "tier": 3,
    "slots": 5
  },
  {
    "id": "nyon",
    "name": "Nyon",
    "coordinates": {
      "lat": 46.3833,
      "lng": 6.2396
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "sion",
    "name": "Sion",
    "coordinates": {
      "lat": 46.2333,
      "lng": 7.3606
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "martigny",
    "name": "Martigny",
    "coordinates": {
      "lat": 46.1024,
      "lng": 7.0724
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "brig",
    "name": "Brig",
    "coordinates": {
      "lat": 46.3167,
      "lng": 7.9878
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "visp",
    "name": "Visp",
    "coordinates": {
      "lat": 46.293,
      "lng": 7.882
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "luzern",
    "name": "Luzern",
    "coordinates": {
      "lat": 47.0502,
      "lng": 8.3093
    },
    "tier": 3,
    "slots": 5
  },
  {
    "id": "zug",
    "name": "Zug",
    "coordinates": {
      "lat": 47.1662,
      "lng": 8.5155
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "schwyz",
    "name": "Schwyz",
    "coordinates": {
      "lat": 47.0207,
      "lng": 8.6527
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "stans",
    "name": "Stans",
    "coordinates": {
      "lat": 46.9572,
      "lng": 8.365
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "altdorf",
    "name": "Altdorf",
    "coordinates": {
      "lat": 46.8804,
      "lng": 8.6444
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "andermatt",
    "name": "Andermatt",
    "coordinates": {
      "lat": 46.6356,
      "lng": 8.5939
    },
    "tier": 1,
    "slots": 2
  },
  {
    "id": "glarus",
    "name": "Glarus",
    "coordinates": {
      "lat": 47.0406,
      "lng": 9.068
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "rapperswil",
    "name": "Rapperswil",
    "coordinates": {
      "lat": 47.2267,
      "lng": 8.8184
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "uster",
    "name": "Uster",
    "coordinates": {
      "lat": 47.3471,
      "lng": 8.7209
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "schaffhausen",
    "name": "Schaffhausen",
    "coordinates": {
      "lat": 47.6965,
      "lng": 8.6349
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "frauenfeld",
    "name": "Frauenfeld",
    "coordinates": {
      "lat": 47.557,
      "lng": 8.8988
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "kreuzlingen",
    "name": "Kreuzlingen",
    "coordinates": {
      "lat": 47.6509,
      "lng": 9.175
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "stgallen",
    "name": "St. Gallen",
    "coordinates": {
      "lat": 47.4245,
      "lng": 9.3767
    },
    "tier": 3,
    "slots": 5
  },
  {
    "id": "wil",
    "name": "Wil",
    "coordinates": {
      "lat": 47.4664,
      "lng": 9.0497
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "herisau",
    "name": "Herisau",
    "coordinates": {
      "lat": 47.3862,
      "lng": 9.2792
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "appenzell",
    "name": "Appenzell",
    "coordinates": {
      "lat": 47.331,
      "lng": 9.4096
    },
    "tier": 1,
    "slots": 2
  },
  {
    "id": "chur",
    "name": "Chur",
    "coordinates": {
      "lat": 46.8508,
      "lng": 9.532
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "landquart",
    "name": "Landquart",
    "coordinates": {
      "lat": 46.9671,
      "lng": 9.554
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "davos",
    "name": "Davos",
    "coordinates": {
      "lat": 46.8027,
      "lng": 9.836
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "stmoritz",
    "name": "St. Moritz",
    "coordinates": {
      "lat": 46.4908,
      "lng": 9.8355
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "bellinzona",
    "name": "Bellinzona",
    "coordinates": {
      "lat": 46.195,
      "lng": 9.0222
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "locarno",
    "name": "Locarno",
    "coordinates": {
      "lat": 46.169,
      "lng": 8.795
    },
    "tier": 2,
    "slots": 4
  },
  {
    "id": "lugano",
    "name": "Lugano",
    "coordinates": {
      "lat": 46.0037,
      "lng": 8.9511
    },
    "tier": 3,
    "slots": 5
  },
  {
    "id": "mendrisio",
    "name": "Mendrisio",
    "coordinates": {
      "lat": 45.8713,
      "lng": 8.9841
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "delémont",
    "name": "Delémont",
    "coordinates": {
      "lat": 47.3649,
      "lng": 7.3445
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "sursee",
    "name": "Sursee",
    "coordinates": {
      "lat": 47.1714,
      "lng": 8.1111
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "emmen",
    "name": "Emmen",
    "coordinates": {
      "lat": 47.0789,
      "lng": 8.273
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "horgen",
    "name": "Horgen",
    "coordinates": {
      "lat": 47.2596,
      "lng": 8.5977
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "wetzikon",
    "name": "Wetzikon",
    "coordinates": {
      "lat": 47.3264,
      "lng": 8.7978
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "pfaffikon",
    "name": "Pfäffikon SZ",
    "coordinates": {
      "lat": 47.2006,
      "lng": 8.778
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "einsiedeln",
    "name": "Einsiedeln",
    "coordinates": {
      "lat": 47.128,
      "lng": 8.7443
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "lachen",
    "name": "Lachen",
    "coordinates": {
      "lat": 47.1919,
      "lng": 8.8543
    },
    "tier": 1,
    "slots": 2
  },
  {
    "id": "sarnen",
    "name": "Sarnen",
    "coordinates": {
      "lat": 46.8969,
      "lng": 8.245
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "arthgoldau",
    "name": "Arth-Goldau",
    "coordinates": {
      "lat": 47.0474,
      "lng": 8.5491
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "fluelen",
    "name": "Flüelen",
    "coordinates": {
      "lat": 46.903,
      "lng": 8.6218
    },
    "tier": 1,
    "slots": 2
  },
  {
    "id": "airolo",
    "name": "Airolo",
    "coordinates": {
      "lat": 46.5286,
      "lng": 8.611
    },
    "tier": 1,
    "slots": 2
  },
  {
    "id": "sargans",
    "name": "Sargans",
    "coordinates": {
      "lat": 47.0482,
      "lng": 9.4415
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "badragaz",
    "name": "Bad Ragaz",
    "coordinates": {
      "lat": 46.9993,
      "lng": 9.505
    },
    "tier": 1,
    "slots": 2
  },
  {
    "id": "gossau",
    "name": "Gossau",
    "coordinates": {
      "lat": 47.415,
      "lng": 9.2548
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "altstatten",
    "name": "Altstätten",
    "coordinates": {
      "lat": 47.3777,
      "lng": 9.5475
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "romanshorn",
    "name": "Romanshorn",
    "coordinates": {
      "lat": 47.5659,
      "lng": 9.3787
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "weinfelden",
    "name": "Weinfelden",
    "coordinates": {
      "lat": 47.5667,
      "lng": 9.1081
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "bulle",
    "name": "Bulle",
    "coordinates": {
      "lat": 46.6179,
      "lng": 7.0569
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "payerne",
    "name": "Payerne",
    "coordinates": {
      "lat": 46.8219,
      "lng": 6.9384
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "morges",
    "name": "Morges",
    "coordinates": {
      "lat": 46.5112,
      "lng": 6.4985
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "aigle",
    "name": "Aigle",
    "coordinates": {
      "lat": 46.3176,
      "lng": 6.9686
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "sierre",
    "name": "Sierre",
    "coordinates": {
      "lat": 46.2919,
      "lng": 7.5356
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "gland",
    "name": "Gland",
    "coordinates": {
      "lat": 46.4208,
      "lng": 6.2705
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "lachauxdefonds",
    "name": "La Chaux-de-Fonds",
    "coordinates": {
      "lat": 47.1036,
      "lng": 6.828
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "moutier",
    "name": "Moutier",
    "coordinates": {
      "lat": 47.2782,
      "lng": 7.3691
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "porrentruy",
    "name": "Porrentruy",
    "coordinates": {
      "lat": 47.4173,
      "lng": 7.0752
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "chiasso",
    "name": "Chiasso",
    "coordinates": {
      "lat": 45.832,
      "lng": 9.0312
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "biasca",
    "name": "Biasca",
    "coordinates": {
      "lat": 46.3597,
      "lng": 8.9697
    },
    "tier": 1,
    "slots": 3
  },
  {
    "id": "monthey",
    "name": "Monthey",
    "coordinates": {
      "lat": 46.2552,
      "lng": 6.9546
    },
    "tier": 2,
    "slots": 3
  },
  {
    "id": "renens",
    "name": "Renens",
    "coordinates": {
      "lat": 46.5399,
      "lng": 6.5881
    },
    "tier": 1,
    "slots": 3
  }
];
