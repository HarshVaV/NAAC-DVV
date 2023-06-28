exports.validHEI=(instituition)=>{
    console.log(instituition.enroll+" "+instituition.degrees.length+" "+instituition.courses.length)

    console.log(instituition.enroll>=5000 && instituition.degrees.length>=1 && instituition.courses.length>=5)
    if(instituition.enroll>=5000 && instituition.degrees.length>=1 && instituition.courses.length>=5){
        return true;

    } 
        false;
}

exports.validIIQA=(instituition)=>{
    if(instituition.phd>1)
        return true;
    else
        return false;
}