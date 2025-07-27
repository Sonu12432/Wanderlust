const express = require("express");
const router = express.Router({mergeParams: true});   // router object
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")

    .get(userController.renderSignupForm)  // get request - signup
    .post(wrapAsync(userController.signup));  // post request - signup


router.route("/login")

    .get(userController.renderLoginForm)  // user login get request
    .post(                        // user login post request - authentication
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.login);

// user logout request
router.get("/logout", userController.logout);

module.exports = router;