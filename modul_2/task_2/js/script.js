var upozorenje = {
	sva_polja: "Sva polja moraju biti popunjena!",
	grad: "Grad mora biti velikim slovima!",
	drzava :"Mora biti unet samo dvo-karakterni kod drzave!"
};


function provera(forma){
	var ime=forma.ime.value;
	var lozinka=forma.lozinka.value;
	var drzava=forma.drzava.value;
	var grad=forma.grad.value;


	if ((ime=="")||(lozinka=="")||(drzava=="")||(grad=="")){
		callAlertFunction(upozorenje.sva_polja,ispisiPoruku);
		return false;
	} 
	else if (drzava.length!=2){
		callAlertFunction(upozorenje.drzava,ispisiPoruku);
		return false;
	} 
	else if (grad!=grad.toUpperCase()){
		callAlertFunction(upozorenje.grad,ispisiPoruku);
		return false;
	} 

	return true;
	
};

function ispisiPoruku(parametar){
	alert(parametar)
};

function callAlertFunction(parametar, callback){
	callback(parametar);
};


$(document).ready(function(){

		$("#drzava").blur(function(){
			if ($("#drzava").val()=="" || $("#drzava").val().length!=2){
				$(this).prev().addClass("redText");	
				 $('button[type="submit"]').attr('disabled',true);
			}else{
				$(this).prev().removeClass("redText");	
				 $('button[type="submit"]').attr('disabled',false);
			} 
		});

		$("#grad").blur(function(){
			if ($("#grad").val()=="" || $("#grad").val().toUpperCase()!=$("#grad").val()){
				$(this).prev().addClass("redText");
			}else {
				$(this).prev().removeClass("redText");	
			}
		});

});