const router = require("express").Router();
const {isAdmin, auth} = require('../middleware/auth');
const {create, getAllPlaces, getPlace, deletePlace, updatePlace} = require("../controllers/touristPlaces")


router.post('/create-place/:userId', isAdmin, create);
router.get('/get-places', getAllPlaces);
router.get('/get-place/:placeId', getPlace);
router.delete('/delete/:userId/:placeId', isAdmin, deletePlace);
router.put('/update/:userId/:placeId', isAdmin, updatePlace);



module.exports = router;