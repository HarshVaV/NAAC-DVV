const bcrypt=require('bcrypt');


exports.hashPassword=async(pw)=>{
    const salt=await bcrypt.genSalt(12);
    console.log(salt);
    let hash=await bcrypt.hash(pw,salt);

    return hash;
    
}


exports.check=async(enteredPw, hashedPw)=>{
    return await bcrypt.compare(enteredPw,hashedPw);

}

// hashPassword("Password_XYZ_123")
// .then(async(hash)=>{
    
//     console.log("Password: Password_XYZ_123");
//     console.log(`HashedPW: ${hash}`);
//     await check("Password_XYZ_123",hash);
//     check("wrong_PW",hash);
// })