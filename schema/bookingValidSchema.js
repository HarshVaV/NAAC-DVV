const Joi=require('joi');
const { now } = require('mongoose');


//JS-obj-Schema
const today = new Date().setHours(0, 0, 0, 0); // get today's date, ignoring milliseconds

const booking=Joi.object({

    hotelId:Joi.string().required(),
    fname:Joi.string().required(),
    lname:Joi.string().required(),
    address:Joi.string().required(),
    contact:Joi.number().required().min(6000000000).max(9999999999),
    room:Joi.string(),
    roomType:Joi.string(),
    In:Joi.date().min(today).required(),// Using ChatGPT
    Out:Joi.date().required().greater(Joi.ref('In')),// must be grater than In-date (can't be equal)
    price:Joi.number().min(0),
    advance:Joi.number().min(0),
    discount:Joi.number().min(0),
    addCost:Joi.number().min(0),
    tax:Joi.number().min(0),
    totAmt:Joi.number().min(0)
}).required();

module.exports=booking;