const axios = require('axios');

exports.getNearPlaces = (req, res) => {
    const {lat , lng ,type, distance} = req.body;
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${distance}&type=${type}&key=${process.env.GOOGLE_API_KEY}`,
        headers: { }
      };
      
      axios(config)
      .then( function (response) {
         return res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.log(error);
        return res.status(400).json(error);
      });
}