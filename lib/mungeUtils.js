// const geoData = require('./geosonDummyData');
// const weatherData = require('./weatherDummyData.js');


function formatGeoLocation(locData) { 
  return { 
    formatted_query: locData[0].display_name,
    latitude: locData[0].lat,
    longitude: locData[0].lon,

  };
}

function formatWeatherData(weatherData) { 
  const weatherResponse = weatherData.data.map(weatherDay => { 
    return { 
      forecast: weatherDay.weather.description,
      time: new Date(weatherDay.ts * 1000).toDateString(),
    };
  }); 
    
  const finalWeather = weatherResponse.slice(0, 7);
  return finalWeather;
}

function formatYelpData(yelpReviews) { 
  const yelpResponse = yelpReviews.map(review => { 
    return { 
            
      name: review.name,
      image_url: review.image_url,
      price: review.price,
      rating: review.rating,
      url: review.url

    };
  });

  return yelpResponse;
}

function formatNationalParks(hikingTrails) { 
  const parkResponse = hikingTrails.data.map(hikingTrail => { 

    return {

      name: hikingTrail,
      location: hikingTrail,
      length: hikingTrail,
      stars: hikingTrail,
      star_votes: hikingTrail,
      summary: hikingTrail,
      trail_url: hikingTrail,
      conditions: hikingTrail,
      condition_date: hikingTrail,
      condition_time: hikingTrail
    };

  });
  return parkResponse;
}

module.exports = { 
  formatGeoLocation, 
  formatWeatherData,
  formatYelpData,
  formatNationalParks
};

