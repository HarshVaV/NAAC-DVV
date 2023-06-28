
var form= document.getElementById('checkOutForm');

form.addEventListener('submit',function(event){
    event.preventDefault();// prevent autoSubmission
    var In=document.getElementById('In').value
    var Out=document.getElementById('Out').value
    var price=document.getElementById('price').value
    var advance=document.getElementById('advance').value
    var tax=document.getElementById('tax').value
    var discount=document.getElementById('discount').value
    var addCost=document.getElementById('addCost').value

    var d1=new Date(In);
    var d2=new Date(Out);
    var stay=(d2.getTime() - d1.getTime())/ (1000 * 60 * 60 * 24);   
    
    var totAmt=Math.max(( stay*price + Number(addCost) )*(1+(tax)/100)-discount,0);// totAmt>=0
    totAmt=totAmt-advance;// now totAmt can -ve, in case of EXCESS ADVANCE

    document.getElementById('totAmt').value=totAmt;// value of totAmt is updated

    alert(document.getElementById('totAmt').value);
    form.submit()
})