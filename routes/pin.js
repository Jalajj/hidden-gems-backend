const router = require("express").Router();
const { createPin } = require("../controllers/Pin");
const {getPins} = require("../controllers/Pin")

//create a pin

router.post("/create", createPin);
router.get("/allpin", getPins);

module.exports = router;