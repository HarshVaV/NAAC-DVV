const express=require('express');
const Campground=require('../models/institution');
const Booking=require('../models/booking');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const bookingValidSchema = require('../schema/bookingValidSchema');
const {stringifyDate, allotRoom}=require('../utils/bookingUtils');
const { string } = require('joi');

const router=express.Router({mergeParams:true});
const app=express();


// for redirect's
const campgroundsRoutes=require('./instituition');
const { append } = require('../schema/bookingValidSchema');
app.use('/campgrounds',campgroundsRoutes);

//Joi validatoin for Booking
const validateBooking= (req,res,next)=>{

    //Add hotelId in req.body in case not present
    const {hotelId}=req.params;
    console.log(req.params);
    req.body.hotelId=hotelId;

    const result=bookingValidSchema.validate(req.body)// validate the entered data as per the ablove schema/blueprint
    const {error, value}=result// extract reuired data-fileds like error and value
    if(error){
        // Iterate and Concatenate all error's message
        const msg=error.details.map(el=>el.message).join(',');
        /*next(new ExpressError(msg,400));// directly goes to Main-ErrorHandler*/
        req.body.errMessage=msg;
    }
    if(!req.body.errMessage){
        console.log(req.body.errMessage);
        req.body=value;// Update the curr_body with updated values (when NO ERROR)
    }
    next();// current req.body will get forwarded to next-(relavent)-route
}


//bookingsDetails Index
router.get('/',catchAsync(async(req,res)=>{
    const {hotelId}=req.params;
    const option=req.query.booking
    const campground=await Campground.findById(hotelId);
    const roomType=["none","Twin Bed", "Family Room", "Suit", "King Suit", "Presidential Suit", "Pent House"]
    if(!campground){
        throw new ExpressError("Item doesn't exist",404)
        // above statemwnt will work since...
        //Function is encapsulated in try-catch-next block
    }
    const booking=await Booking.find({hotelId});
    const pageTitle=`Hotels.com |${campground.title} |Bookings`;
    res.render('bookingDetails',{campground,booking, pageTitle,option,roomType});
}))

//check-In: GET (business checkIn)
router.get('/:roomId/checkIn',catchAsync(async(req,res)=>{
    const {hotelId,roomId}=req.params;
    
    
    const campground=await Campground.findById(hotelId);
    if(!campground){
        throw new ExpressError("Item doesn't exist",404)
        // above statemwnt will work since...
        //Function is encapsulated in try-catch-next bloc
    }
   
    const roomType=["none","Twin Bed", "Family Room", "Suit", "King Suit", "Presidential Suit", "Pent House"]

    const pageTitle=`Hotels.com |${campground.title} |Check-in`;
    res.render('checkIn',{roomId,roomType,campground,pageTitle});
    
}))

//check-In: POST (Business and Client POST)
router.post('/checkIn',validateBooking,catchAsync(async(req,res)=>{
        
    //when validationError
    if(req.body.errMessage){
        const {hotelId,roomId=req.body.room}=req.params;
        req.flash('danger',req.body.errMessage);
        console.log(req.body.errMessage)
        return res.redirect(`/campgrounds/${hotelId}/bookings/${roomId}/checkIn`);
    }

    //NO validation Error
    const booking=new Booking(req.body);
    
    booking.In=stringifyDate(booking.In);
    booking.Out=stringifyDate(booking.Out);
    booking.save()

    //Pop-out Booked Room from unOccupied list
    const campground=await Campground.findById(req.params.hotelId);
    if(!campground){
        throw new ExpressError("Hotel doesn't exist",404)
        // above statemwnt will work since...
        //Function is encapsulated in try-catch-next bloc
    }
    const idx=campground.unOccupied.indexOf(req.body.room);
    console.log(idx)
    campground.unOccupied.splice(idx,1);
    console.log(campground.unOccupied)
    await campground.save()


    console.log(req.body)
    res.redirect(`/campgrounds/${req.params.hotelId}/bookings?booking=trans`)   
    

}))

//check-Out: GET
router.get('/:bookId/checkOut',catchAsync(async(req,res)=>{
    const {hotelId,bookId}=req.params;

    const campground=await Campground.findById(hotelId);
    if(!campground){
        throw new ExpressError("Hotel doesn't exist",404)
        // above statemwnt will work since...
        //Function is encapsulated in try-catch-next bloc
    }

    const booking=await Booking.findById(bookId);
    if(!booking){
        throw new ExpressError("Booking doesn't exist",404)
        // above statemwnt will work since...
        //Function is encapsulated in try-catch-next bloc
    }
    const pageTitle=`Hotels.com |${campground.title} |Check-out`;
    res.render('checkOut',{booking,campground,pageTitle});
}))

//check-Out: POST
router.post('/:bookId/checkOut',catchAsync(async(req,res)=>{
    const {bookId,hotelId}=req.params;   

    const campground=await Campground.findById(hotelId);
    if(!campground){// to ensure that hotel Exist
        throw new ExpressError("Hotel doesn't exist",404)
        // above statemwnt will work since...
        //Function is encapsulated in try-catch-next bloc
    }
    
    req.body.Out=stringifyDate(req.body.Out);
    const b=await Booking.findByIdAndUpdate(bookId,req.body,{runValidators:true, new:true})

    const updatedB=await Booking.findById(bookId); 

    //add checkOut-room to un-Occupied List
    const idx=campground.unOccupied.indexOf(updatedB.room);
    if(idx==-1){// room not present in unOccupied List
        campground.unOccupied.push(updatedB.room);// room is CheckOut hence UnOccupied
        campground.unOccupied.sort();
        await campground.save();
    }

    console.log(updatedB)
    
    //redirect to Bill-Genration
    res.redirect(`/campgrounds/${hotelId}/bookings/${bookId}`)

}))

//sytem Generated Booking

router.post('/systemBooking',catchAsync(async(req,res)=>{
    const {hotelId}=req.params;
    const {roomType,roomTypeValue,In,Out}=req.body;

    const campground=await Campground.findById(hotelId);
    if(!campground){// to ensure that hotel Exist
        throw new ExpressError("Hotel doesn't exist",404)
    }
    const bookings=await Booking.find({hotelId,roomType});
    console.log(bookings);
    var room=allotRoom(campground.unOccupied,bookings,roomTypeValue,In,Out);
    req.body.room=room;
    req.body.hotelId=hotelId;
    res.send(req.body);
}))

// genrateBill
router.get('/:bookId',catchAsync(async(req,res)=>{
    const {hotelId,bookId}=req.params;


    const campground=await Campground.findById(hotelId);
    if(!campground){// check for valid hotel
        throw new ExpressError("Hotel doesn't exist",404)
    }
    const booking=await Booking.findById(bookId);
    if(!booking){// check for valid booking
        throw new ExpressError("Booking doesn't exist",404)
    }
    const pageTitle=`Hotels.com |${campground.title} |GenrateBill`;
    res.render('genrateBill',{booking,pageTitle,campground})
}))


//Delete booking
router.delete('/:bookId',catchAsync(async(req,res)=>{
    const {bookId,hotelId}=req.params;

    const campground=await Campground.findById(hotelId);
    if(!campground){// check for valid hotel
        throw new ExpressError("Hotel doesn't exist",404)
    }
    const booking=await Booking.findById(bookId);
    if(!booking){// check for valid Booking
        throw new ExpressError("Booking doesn't exist",404)
    }
    const room=booking.room;
    
    Booking.findByIdAndDelete(bookId,async(err,docs)=>{
        if(err){
            console.log("Booking Deletion Failed, Something Went wrong");
            console.log(err);
        }
        else{
            
            const idx=campground.unOccupied.indexOf(room);
            if(idx==-1){// add room iff it's not present in unOccupied List prev.
                campground.unOccupied.push(room);// room is CheckOut hence UnOccupied
                campground.unOccupied.sort();
                await campground.save();
            }
            res.redirect(`/campgrounds/${hotelId}/bookings?booking=trans`)
        }
    })

}))


module.exports=router;