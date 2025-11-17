const express = require("express");
// ✅ Important: use mergeParams to access :id from parent route (/listings/:id/reviews)
const router = express.Router({ mergeParams: true }); 

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js"); // ✅ added missing model import
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const RevieController = require("../controllers/reviews.js");



// ✅ CREATE REVIEW
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(RevieController.createReview)
);

// ✅ DELETE REVIEW
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(RevieController.destroyReview)
);

// 404 Catch-All — keep this LAST
router.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

module.exports = router;
