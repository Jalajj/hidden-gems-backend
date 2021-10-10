const router = require("express").Router();
const { createPin } = require("../controllers/Pin");
const {getPins, getUserPin} = require("../controllers/Pin");
const {auth} = require("../middleware/auth")

//create a pin

router.post("/create",auth, createPin);
router.get("/allpin", getPins);
router.get('/userpin/:userId', getUserPin);

module.exports = router;