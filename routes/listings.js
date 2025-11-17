const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// FIXED spelling mistake
const ListingController = require("../controllers/listings.js");

const multer = require("multer");

// config
const {storage}=require("../cloudconfig.js")

// Simple local storage (you can replace later with cloudinary)
const upload = multer({ storage });

// -------------------- ROUTES --------------------

// HOME + CREATE (CREATE with multer uploaded file)
router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post(
     isLoggedIn, 
     upload.single('listing[image]'),
      validateListing,
     wrapAsync(ListingController.createListing)
   );

// NEW LISTING FORM
router.get("/new", isLoggedIn, ListingController.renderForm);

// SHOW, UPDATE, DELETE
router
  .route("/:id")
  .get(wrapAsync(ListingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"), // if updating image
    validateListing,
    wrapAsync(ListingController.updateListing) // FIXED spelling
  )
  .delete(isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing));

// EDIT FORM
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.editListing)
);

module.exports = router;
