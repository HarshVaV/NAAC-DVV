const mongoose=require('mongoose');
const Booking=require('../models/booking');


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=>{
    console.log("Connected to MongoD SEED Server")
    
})
.catch((err)=>{
    console.log("Somthing went wrong with MongoD Server")
    console.log(err)
});






