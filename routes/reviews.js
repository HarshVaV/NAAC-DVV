const express=require('express');
const Campground=require('../models/institution');
const Review=require('../models/review');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const reviewValidSchema = require('../schema/reviewValidSchema');
const { string } = require('joi');
const {convertStar}=require('../utils/additionalFun');


const router=express.Router({mergeParams:true});
const app=express();


// for redirect's
const campgroundsRoutes=require('./instituition');
app.use('/campgrounds',campgroundsRoutes);

//Joi validatoin for Review
const validateReview= (req,res,next)=>{
    
    const result=reviewValidSchema.validate(req.body)// validate the entered data as per the ablove schema/blueprint
    const {error, value}=result// extract reuired data-fileds like error and value
    if(error){
        // Iterate and Concatenate all error's message
        const msg=error.details.map(el=>el.message).join(',');
        console.log(req.body)
        console.log(msg);
        next(new ExpressError(msg,400));// directly goes to Main-ErrorHandler
    }
    req.body=value;// Update the curr_body with updated values
    next();// current req.body will get forwarded to next-(relavent)-route
}

//Create Review
router.post('/reviews',validateReview,catchAsync(async(req,res)=>{
    const {id}=req.params;// :id not mentioned in current route

    
    const campground=await Campground.findById(id);
    if(!campground){
        throw new ExpressError("Item doesn't exist",404)
    }
    req.body.rating=convertStar(req.body.rating);
    // local copies are created
    const review=new Review(req.body); 
    campground.reviews.push(review);

    //checking
    // console.log(review);
    // console.log(campground);

    //saving local copies to MongoDB
    await campground.save();
    await review.save();
    
    res.redirect(`/campgrounds/${id}`)
    

}))

//Deleting Review
router.delete('/:reviewId',catchAsync(async(req,res)=>{
    const {id:hotelId, reviewId}=req.params;

    // local copies are created or updated
    await Review.findByIdAndDelete(reviewId)
    await Campground.findByIdAndUpdate(hotelId,{$pull:{reviews:reviewId}});

    res.redirect(`/campgrounds/${hotelId}`);
}))

//export router
module.exports=router;