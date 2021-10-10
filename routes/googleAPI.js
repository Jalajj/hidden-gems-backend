const router = require('express').Router();
const {getNearPlaces} = require('../controllers/googleAPI')

router.post('/near/places', getNearPlaces);

module.exports = router;