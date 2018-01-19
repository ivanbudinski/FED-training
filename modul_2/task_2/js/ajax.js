$(document).ready(function() {
	
	var appid = "appid=3726fe9cef4ab9d506ee77d8d8f7f3d1";
	var api_url="http://api.openweathermap.org/data/2.5/group?";
	var gradoviId = ["3194360", "787237", "3190103", "787657", "1298824", "2019951"];

	var nazivGrada="id="+gradoviId.join(",");

	var req_url=api_url+appid+"&"+nazivGrada;

	$.getJSON(req_url, function(data){
		var gradovi=data.list;
		

		var $tbody=$("tbody");
		$tbody.empty();

		$.each(gradovi, function(index,value){
			var name=value.name;
			var drzava=value.sys.country
			var temp=(value.main.temp-273.15).toFixed(2);
			var opisVremena=value.weather["0"].description;

			var $tr=$("<tr></tr>");
			$tr.attr('id',value.id)
			var $td1=$("<td>" + name +" ("+drzava+")</td>");
			var $td2=$("<td>" + temp+"°C</td>");
			var $td3=$("<td>" + opisVremena +"</td>");
			$tr.append($td1,$td2,$td3);
			$tbody.append($tr);
		});
	});

	$("#btn-naziv").click(function(){
			var naziv ="q="+ $("#inNaziv").val();
			var api_url="http://api.openweathermap.org/data/2.5/weather?"
			var url = api_url + naziv + "&" + appid;

			$.getJSON(url,function(data){


				var name=data.name;
				var drzava=data.sys.country
				var temp=(data.main.temp-273.15).toFixed(2);
				var opisVremena=data.weather["0"].description;
				var opisVremena2=data.weather["0"].main;

				var $trGrada=$("tr#"+data.id);

				if($trGrada.length>0){
					var $tds=$trGrada.children();
					$tds.eq(1).text(temp+"°C");
					$tds.eq(2).text(opisVremena2);
				}else{
					var $tr=$("<tr></tr>");
					$tr.attr('id',data.id)
					var $td1=$("<td>" + name +" ("+drzava+")</td>");
					var $td2=$("<td>" + temp+"°C</td>");
					var $td3=$("<td>" + opisVremena +"</td>");
					$tr.append($td1,$td2,$td3);
					$("tbody").append($tr);
				}
								
			});
	});
});