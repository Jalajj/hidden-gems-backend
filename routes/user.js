const router = require("express").Router();
const { googleAuth } = require("../controllers/googleLogin");
const {userRegister, userSignIn, signout} = require("../controllers/User")
const {facebookLogin} = require('../controllers/googleLogin');

router.post("/signup", userRegister);
router.post("/signin", userSignIn);
router.get("/logout", signout);
router.post("/google/auth", googleAuth);
// router.post("/facebook/auth", facebookLogin);


module.exports = router;
