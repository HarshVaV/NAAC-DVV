const mongoose=require('mongoose');
const Schema=mongoose.Schema; // to make custom short-Hand


const bookingSchema=new Schema({
    hotelId:{
        type:String,
        required: true
    },
    // customer details
    fname:{
        type:String,
        required: true
    },
    lname:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    idProof:{
        type:String
    },
    // room details
    room:{
        type:String,
        required: true
    },
    roomType:{
        type:String,
        required:true
    },
    In:{
        type:String,
        required: true
    },
    Out:{
        type:String,
        required: true
    },
    // price details
    price:{
        type:Number,
        required:true
    },
    advance:{
        type:Number,
        required:true
    },
    discount:{
        type:Number
    },
    addCost:{
        type:Number
    },
    tax:{
        type:Number
    },
    totAmt:{
        type:Number
    }
});

const Booking=new mongoose.model( 'Booking',bookingSchema);  

module.exports= Booking; // only Product (model) will be available to import