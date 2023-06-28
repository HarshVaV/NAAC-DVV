function autoSubmit() {
    var formObject = document.forms['theForm'];
    formObject.submit();

}
function isChecked(value,option){
    if(option===value)
        return "checked"
    else
        return ""
}
function category(){
    return "Delux";
}