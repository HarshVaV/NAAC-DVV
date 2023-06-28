const mongoose=require('mongoose');
const india=require('./in');
const {fname, mname,lname}=require('./seedHelper');
const Campground=require('../models/campground');
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

const delAll= async()=>{    
    await Campground.deleteMany({});// delete all prev Campgrounds
    await Booking.deleteMany({});// delete all prev Bookings
}

const createRoom=()=>{
    const floor=Math.floor(Math.random()*5)+5;// floor: 5 to 9
    const maxRoom= Math.floor(Math.random()*5)+10;// floor: 5 to 9

    const room=[];
    for(let i=1;i<floor;i++){
        for(let j=1;j<maxRoom;j++){
            room.push(i*100+j);
        }
    }
    return room;
}

const previewImages=[
    "https://source.unsplash.com/collection/10574893/640x480",
    "https://source.unsplash.com/collection/178001/640x480",
    "https://source.unsplash.com/collection/3989638/640x480",
    "https://source.unsplash.com/collection/548932/640x480",
    "https://source.unsplash.com/collection/291441/640x480",
    "https://source.unsplash.com/collection/4hPdOIXSCKs/640x480",
    "https://source.unsplash.com/collection/494263/640x480",
    "https://source.unsplash.com/collection/Ho3Lixi-u3U/640x480",
    "https://source.unsplash.com/collection/966345/640x480",
    "https://source.unsplash.com/collection/qpAMAJhY5Og/640x480",
    "https://source.unsplash.com/collection/1309006/640x480",
    "https://source.unsplash.com/collection/73591262/640x480",
    "https://source.unsplash.com/collection/m7OilTiMRT8/640x480",
    "https://source.unsplash.com/collection/B3OBN454oYQ/640x480",
    "https://source.unsplash.com/collection/514990/640x480",
    "https://source.unsplash.com/collection/v_cJ1L1gHl0/640x480",
    "https://source.unsplash.com/collection/3319103/640x480",
    "https://source.unsplash.com/collection/9475907/640x480",
    "https://source.unsplash.com/collection/1118894/640x480",
    
    
    "https://source.unsplash.com/collection/10574893/960x720",
    "https://source.unsplash.com/collection/178001/960x720",
    "https://source.unsplash.com/collection/3989638/960x720",
    "https://source.unsplash.com/collection/548932/960x720",
    "https://source.unsplash.com/collection/291441/960x720",
    "https://source.unsplash.com/collection/4hPdOIXSCKs/960x720",
    "https://source.unsplash.com/collection/494263/960x720",
    "https://source.unsplash.com/collection/Ho3Lixi-u3U/960x720",
    "https://source.unsplash.com/collection/966345/960x720",
    "https://source.unsplash.com/collection/qpAMAJhY5Og/960x720",
    "https://source.unsplash.com/collection/1309006/960x720",
    "https://source.unsplash.com/collection/73591262/960x720",
    "https://source.unsplash.com/collection/m7OilTiMRT8/960x720",
    "https://source.unsplash.com/collection/B3OBN454oYQ/960x720",
    "https://source.unsplash.com/collection/514990/960x720",
    "https://source.unsplash.com/collection/v_cJ1L1gHl0/960x720",
    "https://source.unsplash.com/collection/3319103/960x720",
    "https://source.unsplash.com/collection/9475907/960x720",
    "https://source.unsplash.com/collection/1118894/960x720"
]






const fname_seedDB= async()=> {
    for(let i=0; i<100;i++){
        const rand406=Math.floor(Math.random()*406);
        const rand6=Math.floor(Math.random()*6);
        const rand22=Math.floor(Math.random()*22);
        const rooms=createRoom();
        const c=new Campground({
            location:`${india.location[rand406].city}, ${india.location[rand406].admin_name}`,
            title:`${fname[rand6]} ${mname[rand22]}`,
            price: 700+rand22*100,
            description: "Nice hotel with good view. Luxary ammenaties, servies and room. Very clean and hygenic environment. Family friendly atmosphere. No pets allowed",
            city:india.location[rand406].city,
            state:india.location[rand406].admin_name,
            previewImg:previewImages[i%previewImages.length],
            image:"https://source.unsplash.com/collection/4977823/1600x900",
            lobbyImg:"https://source.unsplash.com/collection/21208650/1600x900",
            roomImg:"https://source.unsplash.com/collection/3819529/1600x900",
            bathroomImg:"https://source.unsplash.com/collection/11507701/1600x900",
            room: rooms,
            unOccupied: rooms
        });
        await c.save();
    }
}
const lname_seedDB= async()=> {
    for(let i=0; i<100;i++){
        const rand406=Math.floor(Math.random()*406);
        const rand11=Math.floor(Math.random()*11);
        const rand22=Math.floor(Math.random()*22);
        const c=new Campground({
            location:`${india.location[rand406].city},${india.location[rand406].admin_name}`,
            title:`${mname[rand22]} ${lname[rand11]}`,
            price: 700+rand22*100,
            description: "Hotel to witness great hositality. Couple friendly Hotels. Pets and bachelors are allowed",
            city:india.location[rand406].city,
            state:india.location[rand406].admin_name,
            previewImg:previewImages[i%previewImages.length],
            image:"https://source.unsplash.com/collection/10574893/1600x900",
            lobbyImg:"https://source.unsplash.com/collection/21208650/1600x900",
            roomImg:"https://source.unsplash.com/collection/8890044/1600x900",
            bathroomImg:"https://source.unsplash.com/collection/11507701/1600x900",
            room: createRoom()


        });
        await c.save();
    }
}

const seedDB= async()=>{// deleteAll THEN insert Data
    delAll().
    then(async ()=>{
        console.log("Deletion of previous Data Complete");
        await fname_seedDB();
        await lname_seedDB();
        console.log("Insertion Complete");
        await mongoose.connection.close(); // close Connection ONLY AND ONLY after Insertion
        console.log("Server Closed");
    })
    .catch((err)=>{
        console.log("Can't delete Items. Something went Wrong")
        console.log(err)
    })
}

seedDB()// calling of Complete function


