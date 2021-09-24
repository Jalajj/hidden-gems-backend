const router = require("express").Router();
const multer = require("multer")
const {create, getAllPlaces, getPlace, deletePlace, updatePlace} = require("../controllers/touristPlaces")

// router.use(multer({ dest: './uploads/',
//     rename: function (fieldname, filename) {
//       return filename;
//     },
//    }));

router.post('/create-place', create);
router.get('/get-places', getAllPlaces);
router.get('/get-place/:placeId', getPlace);
router.delete('/delete/:placeId', deletePlace);
router.put('/update/:userId/:placeId', updatePlace);

module.exports = router;