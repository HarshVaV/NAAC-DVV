const express=require('express');
const session = require('express-session');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const Institution = require('../models/institution');
const {hashPassword,check} = require('../utils/auth');
const Agent=require("../models/agent");


const app=express();
const router=express.Router();


//home
router.get('/',(req,res)=>{
    let state="login";
    console.log(state+"hi Hello")
    if(req.session.userId || req.session.agentId)
        state="logout"
    res.render('home',{pageTitle:"NAAC | Home",state:state||"login"});
})

//about
router.get('/about',(req,res)=>{
    let state="login";
    if(req.session.userId || req.session.agentId)
        state="logout"
    res.render('about',{pageTitle:"NAAC | About",state});
})

//contacts
router.get('/contact',(req,res)=>{
    let state="login";
    if(req.session.userId || req.session.agentId)
        state="logout"
    res.render('contact',{pageTitle:"NAAC | Contact",state});
})














//login: GET
router.get('/login',(req,res)=>{
    let state="login";
    if(req.session.userId || req.session.agentId){
        state="logout"

    }
    res.render('login',{pageTitle:"NAAC | Login",state});
})

//login: POST
router.post('/login',async(req,res,next)=>{

    const id=req.body.userId;
    //check Institution
    // console.log(req.body.userId)    

    const instituition= await Institution.findOne({userId:id});
    // console.log(instituition);

    if(instituition){
        const passEnter=req.body.password;
        const passStored=instituition.password;
        
        console.log(passStored);
        const isMatched=await check(passEnter,passStored);
        console.log(isMatched)
        if(isMatched){
            req.body.userId=id;
            req.session.userId = id;
            console.log("SuccessFully Logged-In")
            return res.redirect(`/institution/${id}`)
        }

    }


    const agent=await Agent.findOne({agentId:id});
    console.log("Agent Login: "+id)
    console.log(req.body.password)
    console.log(agent)
    if(agent){
        const passEnter=req.body.password;
        const passStored=agent.password;

        console.log(passStored);
        const isMatched=await check(passEnter,passStored);
        console.log(isMatched)
        if(isMatched){
            req.body.agentId=id;
            req.session.agentId = id;
            console.log("Agent SuccessFully Logged-In")
            return res.redirect(`/agent/${id}`)
        }
    }

    
    res.redirect('/login');
    
})

// Logout route
router.post('/logout', (req, res) => {
    // Clear the user ID from the session
    req.session.userId = null;
    req.session.agentId = null;
  
    // Redirect the user to the login page
    res.redirect('/');
  });



  
//export router
module.exports=router;