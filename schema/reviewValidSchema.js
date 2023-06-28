const Joi=require('joi');
const { now } = require('mongoose');


//JS-obj-Schema
const review=Joi.object({

    comment:Joi.string().required(),
    rating:Joi.number().required().min(1).max(5)
}).required();

module.exports=review;