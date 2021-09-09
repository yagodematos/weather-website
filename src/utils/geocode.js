const request = require("request");

const geocode = (address, callback) => {
  const addressEncoded = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressEncoded}.json?access_token=pk.eyJ1IjoieWFnb2RlbWF0b3MiLCJhIjoiY2tyeTJ4Zm9oMHdwbTMxcWVvbWI4ajl3byJ9.YJAQ9-3lsk1wlOKdOtwK4g&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geolocation service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
