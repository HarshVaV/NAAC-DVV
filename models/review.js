const mongoose=require('mongoose');
const Schema=mongoose.Schema; // to make custom short-Hand


const reviewSchema=new Schema({
    rating:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
});

const Review=new mongoose.model( 'Review',reviewSchema);  


module.exports= Review; // only Product (model) will be available to import