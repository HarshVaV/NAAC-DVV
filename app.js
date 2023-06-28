const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');

//route Imports
const inititutionRoutes=require('./routes/instituition');
const adminRoutes=require('./routes/admin');
const agentRoutes=require('./routes/agent');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/naac')
.then(()=>{
    console.log("Connected to MongoD Server")
})
.catch((err)=>{
    console.log("Somthing went wrong with MongoD Server")
    console.log(err)
})




const app=express();
app.use(express.urlencoded({extended:true}));// parasing url to object using middle-ware
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))
app.engine('ejs',ejsMate);
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
//sessions and flash
const sessionConfig={
    secret:'Keyowrd',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*3600*24*7// 7days in milliSecs
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.danger = req.flash('danger');
    next();
})


//routes
app.use('/',inititutionRoutes);
app.use('/',adminRoutes);
app.use('/',agentRoutes);





//Page Not Found (No route Matching). Create NEW error and PASS it to Handler
app.all('*',(req,res,next)=>{
    console.log("Path Not Found")
    console.log(req.url);
    next(new ExpressError('Page Not Found',404))
})


//custom ErrorHandling middleWare
app.use((err,req,res,next)=>{
    // const {status=500,message="Something went wrong",name="InternalError"}=err;
    if(!err.status)err.status=500
    if(!err.message)err.message="Something went wrong"
    if(!err.name)err.name="InternalError"

    console.log("ERROR is CATCHED. Nothing to Worry About")
    const pageTitle="NAAC | Error";
    res.render('error',{err,pageTitle,state:"Login"})
})


app.listen(3000,()=>{
    console.log("Serving on Port 3000")
})