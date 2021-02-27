require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

const { formatGeoLocation, formatWeatherData, formatYelpData } = require('../lib/mungeUtils');


//     it('should return a munged latitude and longitude ', assert => {

//       assert.deepEqual(formatGeoLocation(
//         {
//           formatted_query: 'Sibay, городской округ Сибай, Bashkortostan, Volga Federal District, UNDEFINED, Russia',
//           latitude: '52.7206093188075',
//           longitude: '58.6657536770277'
//         }
//       ));

//       // const data = await fakeRequest(app)
//       //   .get('/animals')
//       //   .expect('Content-Type', /json/)
//       //   .expect(200);

//       // expect(data.body).toEqual(expectation);
//     });
//   });
// });

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
