require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');


const { formatGeoLocation, formatWeatherData, formatYelpData } = require('../lib/mungeUtils');


test('function should return formatted weather data from one day', async() => { 
  const weatherData = {

    'data': [
      {
        'moonrise_ts': 1614471275,
        'wind_cdir': 'WSW',
        'rh': 58,
        'pres': 829.3333,
        'high_temp': 2.8,
        'sunset_ts': 1614473447,
        'ozone': 381.39584,
        'moon_phase': 0.976463,
        'wind_gust_spd': 12.8984375,
        'snow_depth': 24,
        'clouds': 14,
        'ts': 1614409260,
        'sunrise_ts': 1614432901,
        'app_min_temp': -12.8,
        'wind_spd': 3.1190507,
        'pop': 0,
        'wind_cdir_full': 'west-southwest',
        'slp': 1011.4375,
        'moon_phase_lunation': 0.55,
        'valid_date': '2021-02-27',
        'app_max_temp': -1.4,
        'vis': 24.096,
        'dewpt': -9.9,
        'snow': 0,
        'uv': 4.018011,
        'weather': {
          'icon': 'c02d',
          'code': 801,
          'description': 'Few clouds'
        },
        'wind_dir': 240,
        'max_dhi': null,
        'clouds_hi': 0,
        'precip': 0,
        'low_temp': -7.2,
        'max_temp': 3.6,
        'moonset_ts': 1614436867,
        'datetime': '2021-02-27',
        'temp': -2.1,
        'min_temp': -6.5,
        'clouds_mid': 14,
        'clouds_low': 10
      },
      {
        'moonrise_ts': 1614562015,
        'wind_cdir': 'S',
        'rh': 42,
        'pres': 840.0625,
        'high_temp': 2,
        'sunset_ts': 1614559912,
        'ozone': 405.4896,
        'moon_phase': 0.928444,
        'wind_gust_spd': 11.59375,
        'snow_depth': 24,
        'clouds': 0,
        'ts': 1614495660,
        'sunrise_ts': 1614519213,
        'app_min_temp': -14.2,
        'wind_spd': 1.878257,
        'pop': 0,
        'wind_cdir_full': 'south',
        'slp': 1024.6875,
        'moon_phase_lunation': 0.58,
        'valid_date': '2021-02-28',
        'app_max_temp': -2.4,
        'vis': 24.096,
        'dewpt': -13.5,
        'snow': 0,
        'uv': 4.8033013,
        'weather': {
          'icon': 'c01d',
          'code': 800,
          'description': 'Clear Sky'
        },
        'wind_dir': 191,
        'max_dhi': null,
        'clouds_hi': 0,
        'precip': 0,
        'low_temp': -7.7,
        'max_temp': 2.1,
        'moonset_ts': 1614525015,
        'datetime': '2021-02-28',
        'temp': -2.2,
        'min_temp': -7.4,
        'clouds_mid': 0,
        'clouds_low': 0
      },
      {
        'moonrise_ts': 1614652770,
        'wind_cdir': 'SW',
        'rh': 24,
        'pres': 839.3542,
        'high_temp': 8.8,
        'sunset_ts': 1614646377,
        'ozone': 337.2396,
        'moon_phase': 0.855681,
        'wind_gust_spd': 4.7070312,
        'snow_depth': 24,
        'clouds': 0,
        'ts': 1614582060,
        'sunrise_ts': 1614605525,
        'app_min_temp': -7.1,
        'wind_spd': 1.225232,
        'pop': 0,
        'wind_cdir_full': 'southwest',
        'slp': 1027.625,
        'moon_phase_lunation': 0.61,
        'valid_date': '2021-03-01',
        'app_max_temp': 8.8,
        'vis': 24.128,
        'dewpt': -16,
        'snow': 0,
        'uv': 5.0602155,
        'weather': {
          'icon': 'c01d',
          'code': 800,
          'description': 'Clear Sky'
        },
        'wind_dir': 216,
        'max_dhi': null,
        'clouds_hi': 0,
        'precip': 0,
        'low_temp': -1.7,
        'max_temp': 8.8,
        'moonset_ts': 1614613179,
        'datetime': '2021-03-01',
        'temp': 2.8,
        'min_temp': -1.8,
        'clouds_mid': 0,
      }
    ]
  };
  const expected = [
    
    {
      'forecast': 'Few clouds',
      'time': 'Sat Feb 27 2021'
    },
    {
      'forecast': 'Clear Sky',
      'time': 'Sun Feb 28 2021'
    },
    {
      'forecast': 'Clear Sky',
      'time': 'Mon Mar 01 2021'
    }
  ];
  const actual = formatWeatherData(weatherData);

  expect(actual).toEqual(expected);
});

test('function should return formatted longitude and latitude from location data', async() => { 
  const locationData = [
    
    {
      'place_id': '236277278',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'relation',
      'osm_id': '111257',
      'boundingbox': [
        '33.2903739',
        '33.9183794',
        '-112.3240289',
        '-111.9255201'
      ],
      'lat': '33.4484367',
      'lon': '-112.0741417',
      'display_name': 'Phoenix, Maricopa County, Arizona, USA',
      'class': 'place',
      'type': 'city',
      'importance': 0.733016225473378,
      'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
    },
    {
      'place_id': '235396555',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'relation',
      'osm_id': '123425',
      'boundingbox': [
        '41.603975',
        '41.6189802',
        '-87.6364996',
        '-87.624128'
      ],
      'lat': '41.6147151',
      'lon': '-87.6323811',
      'display_name': 'Phoenix, Cook County, Illinois, USA',
      'class': 'boundary',
      'type': 'administrative',
      'importance': 0.565591780849331,
      'icon': 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
    },
    {
      'place_id': '236181720',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'relation',
      'osm_id': '176024',
      'boundingbox': [
        '43.2190582',
        '43.242342',
        '-76.3122744',
        '-76.281977'
      ],
      'lat': '43.231179',
      'lon': '-76.300764',
      'display_name': 'Phoenix, Oswego County, New York, USA',
      'class': 'boundary',
      'type': 'administrative',
      'importance': 0.50331698832418,
      'icon': 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
    },
    {
      'place_id': '236072491',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'relation',
      'osm_id': '186680',
      'boundingbox': [
        '42.2635817',
        '42.2850236',
        '-122.8315789',
        '-122.8017911'
      ],
      'lat': '42.2740364',
      'lon': '-122.8153283',
      'display_name': 'Phoenix, Jackson County, Oregon, USA',
      'class': 'boundary',
      'type': 'administrative',
      'importance': 0.485910756155564,
      'icon': 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
    },
    {
      'place_id': '107529630',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'way',
      'osm_id': '107056904',
      'boundingbox': [
        '51.5143902',
        '51.5146198',
        '-0.1295943',
        '-0.1291148'
      ],
      'lat': '51.51450515',
      'lon': '-0.129369495915928',
      'display_name': 'Phoenix, Charing Cross Road, St Giles, Bloomsbury, London Borough of Camden, London, Greater London, England, WC2H 0JP, United Kingdom',
      'class': 'amenity',
      'type': 'theatre',
      'importance': 0.447724269818501,
      'icon': 'https://locationiq.org/static/images/mapicons/tourist_theatre.p.20.png'
    },
    {
      'place_id': '480914',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'node',
      'osm_id': '158808902',
      'boundingbox': [
        '40.5098268',
        '40.5498268',
        '-74.3609818',
        '-74.3209818'
      ],
      'lat': '40.5298268',
      'lon': '-74.3409818',
      'display_name': 'Phoenix, Edison, Middlesex County, New Jersey, 08837, USA',
      'class': 'place',
      'type': 'hamlet',
      'importance': 0.440791981823335,
      'icon': 'https://locationiq.org/static/images/mapicons/poi_place_village.p.20.png'
    },
    {
      'place_id': '463261',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'node',
      'osm_id': '158560368',
      'boundingbox': [
        '39.4963872',
        '39.5363872',
        '-76.6377815',
        '-76.5977815'
      ],
      'lat': '39.5163872',
      'lon': '-76.6177815',
      'display_name': 'Phoenix, Baltimore County, Maryland, 21131, USA',
      'class': 'place',
      'type': 'village',
      'importance': 0.40922699466609,
      'icon': 'https://locationiq.org/static/images/mapicons/poi_place_village.p.20.png'
    },
    {
      'place_id': '729289',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'node',
      'osm_id': '262721927',
      'boundingbox': [
        '-29.741556',
        '-29.661556',
        '30.96722',
        '31.04722'
      ],
      'lat': '-29.701556',
      'lon': '31.00722',
      'display_name': 'Phoenix, eThekwini Metropolitan Municipality, KwaZulu-Natal, 4068, South Africa',
      'class': 'place',
      'type': 'town',
      'importance': 0.40140395054144296,
      'icon': 'https://locationiq.org/static/images/mapicons/poi_place_town.p.20.png'
    },
    {
      'place_id': '22493790',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'node',
      'osm_id': '2358432457',
      'boundingbox': [
        '-43.17836',
        '-43.17826',
        '146.36714',
        '146.36724'
      ],
      'lat': '-43.17831',
      'lon': '146.36719',
      'display_name': 'The Phoenix, Huon Valley, Tasmania, Australia',
      'class': 'natural',
      'type': 'peak',
      'importance': 0.4,
      'icon': 'https://locationiq.org/static/images/mapicons/poi_peak.p.20.png'
    },
    {
      'place_id': '1393575',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'node',
      'osm_id': '336166520',
      'boundingbox': [
        '30.9883333',
        '31.0283333',
        '-112.0791667',
        '-112.0391667'
      ],
      'lat': '31.0083333',
      'lon': '-112.0591667',
      'display_name': 'El Phoenix, Altar, Sonora, Mexico',
      'class': 'place',
      'type': 'village',
      'importance': 0.375,
      'icon': 'https://locationiq.org/static/images/mapicons/poi_place_village.p.20.png'
        
    }
  ];

  const expected = 
    {
      'formatted_query': 'Phoenix, Maricopa County, Arizona, USA',
      'latitude': '33.4484367',
      'longitude': '-112.0741417'
    };

  const actual = formatGeoLocation(locationData);
  expect(actual).toEqual(expected);
});



test('function should return formatted data from yelp reviews', async() => { 
  const yelpData = { };

  const expected = [
    //objects go here
  ];

  
  
  
  
  const actual = formatYelpData(yelpData);
  expect(actual).toEqual(expected);
});


// test('function should return formatted data from yelp reviews', async() => { 
//   const yelpData = { };

//   const expected = [
//     //objects go here
//   ];

  
  
  
  
//   const actual = formatYelpData(yelpData);
//   expect(actual).toEqual(expected);
// });

