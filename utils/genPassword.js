const generator= require('generate-password');
const { number } = require('joi');

exports.password=generator.generate({
    length: Math.floor(Math.random()*4 +8),
    number:true
})

exports.userName= (title)=>{
    var matches = title.match(/\b(\w)/g);
    var acronym = matches.join('');

    var suffix=acronym.toLowerCase()+generator.generate({length:3, number:true,symbols:false})

    console.log(suffix)

    return suffix;

}
