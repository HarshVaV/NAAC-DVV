const express=require('express');
const session = require('express-session');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const {password,userName} = require('../utils/genPassword');
const {hashPassword,check} = require('../utils/auth');
const {sendMail} = require('../utils/mail');
const {validHEI,validIIQA} = require('../utils/validateHEI');
const { string } = require('joi');
const { has } = require('langs');
const Institution = require('../models/institution');

//deg[]
const degrees=["B.Tech","M.Tech","BBA","MBA","B.Sc","M.Sc"];
//Courses[]
const courses=["CSE","IT","Electrical","Electronics","Mechanical", "Civil", "Investment Banking","Market Analysis"];

const app=express();
const router=express.Router();

//LOGIN middleware
function requireLogin(req, res, next) {
    if (!req.session.userId) {
      res.redirect('/login');
    } else {
      next();
    }
  }






//Register: GET
router.get('/institution/new',(req,res)=>{
    let state="login";
    if(req.session.userId)
        state="logout"
    res.render('newInst',{pageTitle:"Register | Inst",degrees,courses,state})
})

//Register: POST
router.post('/institution/new',async(req,res)=>{
    const pass= await password;//gen password
    const hash= await hashPassword(pass);
    const userId=userName(req.body.title)

    //send mail
    // sendMail(userId,pass,details.mail)

    req.body.userId=userId;
    req.body.password=hash;

    const i=new Institution(req.body)
    console.log(pass);
    console.log(i);
    
    //check valid HEI
    if(validHEI(i)){
        i.stages[0]=2;//passed
        i.stages[1]=1;//proceed
    }
    else{
        i.stages[0]=-1;//failed
    }
    
    await i.save();
    res.redirect('/login')
})






//Show All steps: Pass-Failed-Next
router.get('/institution/:userId',requireLogin,async(req,res)=>{
    const {userId}=req.params;
    console.log(userId);
    const instituition= await Institution.findOne({userId:userId});
    console.log(instituition);
    let title="BIT";
    let stages=[1,-1.5,-1.5,-1.5];
    if(instituition){
        console.log(validHEI(instituition));
        title=instituition.title;
        stages=instituition.stages;
    }
    let state="login";
    if(req.session.userId)
        state="logout"
    res.render('steps',{pageTitle:"NAAC | Instituition",instituition,state});
})




//upload IIA: GET
router.get('/institution/:userId/iiqa',requireLogin,(req,res)=>{
    let state="login";
    if(req.session.userId)
        state="logout"
    res.render('uploadIIQA',{pageTitle:"IIQA | Inst",userId:req.params.userId,state})
})

//upload IIQA: POST
router.post('/institution/:userId/iiqa',async(req,res)=>{
    const {userId}=req.params;
    const i=await Institution.findOne({userId});
    if(i){
        const inst=await Institution.findByIdAndUpdate(i._id,req.body,{runValidators:true, new:true})

        console.log("BEFORE\n"+i)
        if(validIIQA(i)){
            i.stages[1]=2;
            i.stages[2]=1;
        }
        else{
            i.stages[1]=-1;
        }
        console.log("Hi\n"+i)
        i.save();
    }
    res.redirect(`/institution/${userId}`)
})


//upload SSR:GET
router.get('/institution/:userId/ssr',requireLogin,(req,res)=>{
    let state="login";
    if(req.session.userId)
        state="logout"
    res.render('ssr',{pageTitle:"SSR | Inst",userId:req.params.userId,state})
})

//upload SSR: POST
router.post('/institution/:userId/ssr',async(req,res)=>{
    // console.log(req.url)
    const {userId}=req.params;
    const i=await Institution.findOne({userId});
    if(i){
        const inst=await Institution.findByIdAndUpdate(i._id,req.body,{runValidators:true, new:true})

        inst.stages[2]=1.5;
        await inst.save();
    }
    res.redirect(`/institution/${userId}`)
})







//export router
module.exports=router;