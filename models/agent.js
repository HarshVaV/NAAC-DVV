const mongoose=require('mongoose');
const Schema=mongoose.Schema; // to make custom short-Hand


const agentSchema=new Schema({
    agentId:String,
    password:String
        
});

const Agent=new mongoose.model( 'Agent',agentSchema);  

// campgroundSchema.post('findOneAndDelete',async(campground)=>{
//     await Review.remove({
//         _id:{$in:campground.reviews}
//     })
//     await Booking.remove({
//         _id:{$in:campground.reviews}
//     })
// })

module.exports= Agent; // only Product (model) will be available to import