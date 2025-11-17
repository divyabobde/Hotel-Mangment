const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const UserController = require("../controllers/users.js");


// ====================== SIGNUP LOGIC ======================
router
   .route("/signup")
   .get(UserController.userSingupform )
    .post( wrapAsync(UserController.userSingup));




// ====================== LOGIN LOGIC ======================
router
    .route("/login")
    .get(UserController.RenderLoginform )
    .post(
    saveRedirectUrl,        // Save URL user was trying to visit
    passport.authenticate("local", {
        failureRedirect: "/login",   // If login fails
        failureFlash: true           // Show error message
    }),
  UserController.userLogin
);

// ====================== LOGOUT ======================
router.get("/logout", UserController.userLogout
);


module.exports = router;
