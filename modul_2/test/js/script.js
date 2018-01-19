var upozorenje = {
	kartica: ["Master", "Visa"],
	gotovina: "Prazno polje"
};
var newFieldID;

function paymentMethod(field){
	var text;

	if (field.value=="Kartica"){
		text=upozorenje.kartica;
		if(newFieldID!=null){
			document.getElementById(newFieldID).parentElement.remove();
		};	
		newFieldID = "valCode";
		createNewField("validation");
	}else if (field.value=="Gotovina"){
		text=upozorenje.gotovina;
		if(newFieldID!=null){
			document.getElementById(newFieldID).parentElement.remove();
		};
		newFieldID = "currency";
		createNewField("currency");
	}else{
		text="";
		if(newFieldID!=null){
			document.getElementById(newFieldID).parentElement.remove();
		};
		newFieldID = null;
	};
	
	document.getElementById("tip_span").textContent=text;
};

//dynamic fields
function createNewField(data){
    var lab = document.createElement("LABEL");
    var int = document.createElement("INPUT");
    int.className="form-control";
    int.type="text";

    if (data=="validation"){
     	lab.textContent="Validation Code:";
    	lab.for="valCode";
    	int.id="valCode";
	    int.name="valCode";
	    int.maxLength="3";
	    int.placeholder="Unesine validacioni kod";
    }else if (data=="currency"){
    	lab.textContent="Valuta:";
    	lab.for="currency";
     	int.id="currency";
   		int.name="currency";
    	int.placeholder="Unesine valutu";
    };

    var div = document.createElement("DIV");
    div.className+="form-group";
    div.appendChild(lab);
    div.appendChild(int);
    document.getElementById("tip").parentElement.insertAdjacentElement('afterend',div);
};

//validation
function validateForm(forma){

	var ime = forma.usr.value;
	var prezime = forma.prz.value;
	var emeil = forma.email.value;
	var nacin = forma.nacin.value;
	var tip = forma.tip.value;
	if (newFieldID=="valCode"){
		var val_code = forma.valCode.value; 
	}else if (newFieldID=="currency"){
		var currency = forma.currency.value;
	};

	
	if (ime==""||prezime==""||email==""||nacin==""){
		alert("Niste popunili polja!");
		return false;
	};
	
	if (nacin=="Kartica"){
		if(tip=="Prazno"){
			alert("Odaberite tip!")
			return false;
		}else if(val_code.length!=3||isNaN(val_code)){
			alert("Validacioni kod mora da ime tri cifre!")
			return false;
		};
	}else if (nacin=="Gotovina"){
		if(tip=="Visa"||tip=="Master"){
			alert("Tip placanja mora  biti prazno!")
			return false;
		}else if(currency.length<2||currency.toUpperCase()!=currency||(!isNaN(currency))){
			alert("Polje mora imati vise od dva karaktera i mora biti napisano velikim slovima!")
			return false;
		};
	};

	return true;
};



