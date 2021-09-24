const router = require("express").Router();
const {userRegister, userSignIn} = require("../controllers/User")

router.post("/signup", userRegister);
router.post("/signin", userSignIn);

module.exports = router;
