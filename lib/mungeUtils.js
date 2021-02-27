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

module.exports = { 
  formatGeoLocation, 
  formatWeatherData,
  formatYelpData
};

