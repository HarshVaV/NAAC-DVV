const mongoose=require('mongoose');
const Schema=mongoose.Schema; // to make custom short-Hand

//name
//student enroll capacity
//number of courses offered
//number of degree offered
//state
//city
//username (sys genrated)
//password (hash)


//campus size
//ground size

//stage=[0,0,0,0]
    //-1: failed
    //0: pending
    //1: Proceed
    //1.5:Ongoing
    //2: passed
const institutionSchema=new Schema({
    title:{
        type:String
    },
    mail:{
        type:String
    },
    enroll:{
        type:Number
    },
    degrees:{
        type:[String]
    },
    courses:{
        type:[String]
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    userId:{
        type:String
    },
    password:{
        type:String
    },
    stages:{
        type:[Number],
        default:[-1.5,-1.5,-1.5,-1.5]
    },
    doc1:String,
    doc2:String,
    doc3:String,
    phd:Number,
    master:Number,
    nonTeaching:Number,
    campus:Number,
    occupied:Number,
    sports:Number,
    maintain:Number

        
});

const Institution=new mongoose.model( 'Institution',institutionSchema);  

// campgroundSchema.post('findOneAndDelete',async(campground)=>{
//     await Review.remove({
//         _id:{$in:campground.reviews}
//     })
//     await Booking.remove({
//         _id:{$in:campground.reviews}
//     })
// })

module.exports= Institution; // only Product (model) will be available to import