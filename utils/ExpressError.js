class ExpressError extends Error{
    constructor(message,status){
        super();// acts as super constructor
        this.message=message;
        this.status=status
    }
}
module.exports=ExpressError;