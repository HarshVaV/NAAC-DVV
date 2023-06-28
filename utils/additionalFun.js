module.exports.convertStar=(n)=>{
    let oneStar='⭐ ';
    let finalValue=oneStar;

    for(let i=2;i<=n;i++){
        finalValue=finalValue+oneStar;
    }
    return finalValue
}