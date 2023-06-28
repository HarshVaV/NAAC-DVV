module.exports=func=>{
    return function(req,res,next){
        func(req,res,next).catch((err)=>next(err));
    }
}
//func is the PARAMETER (fuction) which needs to be pass