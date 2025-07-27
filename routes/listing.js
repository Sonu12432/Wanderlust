const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")

    .get(wrapAsync(listingController.index))    // Listing Route - Index route
    .post(isLoggedIn,                           // createListing
        validateListing,
        upload.single('listing[image]'),
        wrapAsync(listingController.createListing));

// Create New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")

    .delete(isLoggedIn, isOwner, listingController.destroyListing)  // Delete Routes
    .get(wrapAsync(listingController.showListings))     // Show Route
    .put(                                            // updateListing
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing));


// Update/Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;