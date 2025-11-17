const mongoose = require("mongoose");
const review = require("./reviews.js");
const { types } = require("joi");
const reviews = require("./reviews.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true, // corrected
    },
    description: String,
    image: {
       url:String,
       filename:String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
           ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
  await review.deleteMany[{_id:{$in:listing.reviews}}];}
  console.log("yes");
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
