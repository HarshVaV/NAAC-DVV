//function to convert date into Usable format
module.exports.stringifyDate=(date)=>{
    date=new Date(date); //update date format
    var day=date.getDate();
    var month=date.getMonth();
    var year=date.getFullYear();

    if(day<=9){
        day=`0${day}`
    }
    if(month<=9){
        month=`0${month+1}`
    }
    return `${year}-${month}-${day}`;
}

module.exports.allotRoom=(unOcupied,bookings,type,InDate,OutDate)=>{
    for(r of unOcupied){// empty room exist
        if(type==(1+(r%2)+(r%3))){
            return r;
        }
    }
    for(b of bookings){ // re-booking of booked room
        // all time in millisec
        var bookedIn=(new Date(b.In)).getTime();    //currently booked times
        var bookedOut=(new Date(b.Out)).getTime();
        var checkIn=(new Date(InDate)).getTime();   //future booked times
        var checkOut=(new Date(OutDate)).getTime();
        var today=(new Date('now')).getTime();
        var day3=3*(100*3600*24) //3days is millisec
        if(bookedIn>=checkOut+day3){// new guest will leave room before 3 days of arrivial of old guest
            return b.room;
        }
        if(bookedOut+day3<=checkOut){// old will leave room before 3days of arrival of new
            return b.room;
        }
    }
    
}