const Listing = require("../models/listing");

module.exports.index= async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index", { allListing });
};

module.exports.renderForm=(req, res) => {  
  res.render("listings/new.ejs");
};
module.exports.showListing=async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({path:"reviews",
    populate:{
      path:"author",
    },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListing=async (req, res) => {
  let url=req.file.path;
  let filename=req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image={url,filename};
  await newListing.save();

  req.flash("success", "New listing created");
  res.redirect("/listings");
};

module.exports.editListing= async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if(!listing){
    req.flash("error","Listing yoou requested for does not exist!");
    res.redirect("/listings");
  }
  let ogUrl=listing.image.url;
  ogUrl= ogUrl.replace("/upload","/upload/w_250")
  res.render("listings/edit.ejs", { listing , ogUrl});
};

module.exports.updateListing= async (req, res) => {
  const { id } = req.params;
   
  let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !== "undefined"){
   let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
  }
  

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=  async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};
