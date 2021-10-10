const router = require("express").Router();
const { auth } = require('../middleware/auth');
const { createFav, findFav, deleteFav, favoritedPlace} = require('../controllers/FavPlaces');


router.post('/create/favorite', auth, createFav);
router.get('/allfavorite/:userId', findFav);
router.delete('/delete/:userId/:placeId', auth, deleteFav);
router.get('/favorited/:userId/:placeId', auth , favoritedPlace);

module.exports = router;