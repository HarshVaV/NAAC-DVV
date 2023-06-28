const express=require('express');
const session = require('express-session');
const Campground=require('../models/institution');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const {findInst} = require('../utils/findInst');
const Institution = require('../models/institution');


const app=express();
const router=express.Router();

//LOGIN middleware
function requireLogin(req, res, next) {
    if (!req.session.agentId) {
      res.redirect('/login');
    } else {
      next();
    }
  }





//Show All steps: Pass-Failed-Next
router.get('/agent/:agentId',requireLogin,async(req,res)=>{
    let state="login";
    if(req.session.agentId)
        state="logout"

    const institutions= await Institution.find({});
    res.render('agentDisplay',{pageTitle:"NAAC | Agent",state,institutions});
})


//View Doc
router.get('/agent/doc/:id',requireLogin,catchAsync(async(req,res)=>{
    let state="login";
    if(req.session.agentId)
        state="logout"
    const {id}=req.params;
    console.log("Id is "+ id);
    const i=await Institution.findById(id);
    console.log(i);
    res.render('doc',{pageTitle:"NAAC | Document Verification",state,i});
}))

//pass
router.post('/agent/:id/pass',requireLogin,async(req,res)=>{
    const {id}=req.params;
    const i=await Institution.findById(id);
    const stages=i.stages;
    stages[2]=2;
    stages[3]=1.5;//pending
    const inst=await Institution.findByIdAndUpdate(id,{$set:{ stages }},{runValidators:true, new:true});
    console.log(inst);
    const agentId=req.session.agentId;
    res.redirect(`/agent/${agentId}`);

    
})

//failed
router.post('/agent/:id/fail',requireLogin,async(req,res)=>{
    const {id}=req.params;
    const i=await Institution.findById(id);
    const stages=i.stages;
    stages[2]=-1;
    stages[3]=-1.5;//not allowed
    const inst=await Institution.findByIdAndUpdate(id,{$set:{ stages }},{runValidators:true, new:true});
    console.log(inst);
    const agentId=req.session.agentId;
    res.redirect(`/agent/${agentId}`);

    
})
 









//export router
module.exports=router;