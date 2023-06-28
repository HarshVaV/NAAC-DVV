const mongoose=require('mongoose');
const Agent=require('../models/agent');
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
    await Agent.deleteMany({});// delete all prev Agent
}







const addAgent= async()=> {
        const a=new Agent({
           agentId:"agent01",
           password:await hashPassword("0657")
        });

        await a.save();
        console.log(a);
}


const seedDB= async()=>{// deleteAll THEN insert Data
    delAll().
    then(async ()=>{
        console.log("Deletion of previous Data Complete");
        await addAgent();
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


