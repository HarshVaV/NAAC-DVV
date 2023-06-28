const Joi=require('joi')

//Helper function to create "location"
const createLocation = (parent, helpers) => {

    return parent.city+ ', ' + parent.state;
};
//JS-obj-Schema
const campground=Joi.object({

    title:Joi.string().required(),
    price:Joi.number().required().min(1),
    description:Joi.string().required(),
    city:Joi.string().required(),
    state:Joi.string().required(),
    location:Joi.string().default(createLocation),
    previewImg:Joi.string().default("https://source.unsplash.com/collection/10574893/640x480"),
    image:Joi.string().default("https://source.unsplash.com/collection/10574893/1600x900"),
    lobbyImg:Joi.string().default("https://source.unsplash.com/collection/21208650/1600x900"),
    roomImg:Joi.string().default("https://source.unsplash.com/collection/8890044/1600x900"),
    bathroomImg:Joi.string().default("https://source.unsplash.com/collection/11507701/1600x900")

})

module.exports=campground;