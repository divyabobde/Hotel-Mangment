const Joi = require("joi");

// ✅ Listing Schema
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required.",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required.",
    }),
    image: Joi.string().allow("", null), // optional
    price: Joi.number().min(0).required().messages({
      "number.base": "Price must be a number.",
      "number.min": "Price cannot be negative.",
    }),
    country: Joi.string().required().messages({
      "string.empty": "Country name is required.",
    }),
    location: Joi.string().required().messages({
      "string.empty": "Location is required.",
    }),
  }).required(),
});

// ✅ Review Schema
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),   // ✅ fixed missing ()
    comment: Joi.string().required(),  // ✅ fixed lowercase and ()
  }).required(),
});

// ✅ Export both properly
module.exports = { listingSchema, reviewSchema };
