const express = require('express');
const cors = require('cors');
const key = require('dotenv').config();
const app = express();
const morgan = require('morgan');
const geoData = require('./geosonDummyData');
const weatherData = require('./weatherDummyData.js');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const GEOCODING_API_KEY = process.env.REACT_APP_GEO_KEY;

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const YELP_API_KEY = process.env.REACT_APP_YELP_Key;

const { formatGeoLocation, formatWeatherData, formatYelpData } = require('./mungeUtils.js');



// const URLY = 'https://api.yelp.com/v3/businesses/search?latitude=%7Blat%7D&longitude=%7Blng%7D';


app.get('/location', async(req, res) => {

  
  try {
    const searchCity = req.query.search;
    
    const geoLocationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${GEOCODING_API_KEY}&q=${searchCity}&format=json`);

    const formattedQueryResponse = formatGeoLocation(geoLocationData.body);
    
    res.json(formattedQueryResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {
    const longitude = req.query.latitude;
    const latitude = req.query.longitude;

    const realWeatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`);

    const formattedQueryResponse = formatWeatherData(realWeatherData.body);

    res.json(formattedQueryResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/reviews', async(req, res) => {
  try {

    const longitude = req.query.longitude;
    const latitude = req.query.latitude;
 
    const realYelpData = await request
      .get(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`)
      .set('Authorization', `Bearer ${YELP_API_KEY}`)
      .set('Accept', 'application/json');
  
    const formattedYelpData = formatYelpData(realYelpData.body.businesses);
    
    res.json(formattedYelpData);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
