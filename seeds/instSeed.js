const mongoose=require('mongoose');
const Instituition=require('../models/institution');
const {hashPassword} = require('../utils/auth');


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/naac')
.then(()=>{
    console.log("Connected to MongoD SEED Server")
    
})
.catch((err)=>{
    console.log("Somthing went wrong with MongoD Server")
    console.log(err)
});

const delAll= async()=>{    
    await Instituition.deleteMany({});// delete all prev Agent
}







const addInst= async()=> {
        const i=new Instituition({
            title:"IIIT Ranchi",
            mail:"bit.com",
            enroll:"5500",
            degree:["B.Tech"],
            courses:["CSE","IT","EE","MECH","Civil"],
            address:"Mesra, Ranchi",
            city:"Ranchi",
            state:"Jharkhand",
           userId:"IIIT025",
           password:await hashPassword("0657"),
           stages:[2,1,-1.5,-1.5],
           doc1:"pdf1.com",
           doc2:"pdf2.com",
           doc3:"pdf3.com",
           pdf:50,
           master:150,
           nonTeaching:200,
           campus:450,
           occupied:150,
           sports:75,
           maintain:150
        });

        await i.save();
        console.log(i);
}


const seedDB= async()=>{// deleteAll THEN insert Data
    delAll().
    then(async ()=>{
        console.log("Deletion of previous Data Complete");
        await addInst();
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


