
exports.findInst=(institutions,id)=>{
    console.log(id);
    console.log("\n");
    for(const i of institutions){
        console.log(i.userId);
        if(i.userId==id)
            console.log(i);
    }
}