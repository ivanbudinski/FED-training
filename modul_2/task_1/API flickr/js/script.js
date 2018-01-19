$(document).ready(function(){

	var rest_url = "https://api.flickr.com/services/rest/?";
	var api_key = "api_key=325b6733bb2c01b6ee5a9d73e9eb8cf9";
	var format= "format=json";
	var jsoncallback= "jsoncallback=?";
	var user_id;

	$("#btnEmail").click(function(){
		var email = "find_email=" + $("#tbInput").val();
		var method="method=flickr.people.findByEmail";
		var url = rest_url+api_key+"&"+method+"&"+format+"&"+email+"&"+jsoncallback;
		$.getJSON(url,setUser);
	});


	$("#btnUsername").click(function(){
		var username="username="+$("#tbInput").val();
		var method="method=flickr.people.findByUsername";
		var url = rest_url+method+"&"+username+"&"+api_key+"&"+format+"&"+jsoncallback;
		$.getJSON(url,setUser);
	});

	$("#btnUrl").click(function(){
		var url="url="+$("#tbInput").val();
		var method="method=flickr.urls.lookupUser";
		var url = rest_url+method+"&"+url+"&"+api_key+"&"+format+"&"+jsoncallback;
		$.getJSON(url,setUser);
	});

	
	$("body").on("click", "#btnGallery", getGallery);
	$("body").on("click", "#btnPhotos", getPublicPhotos);
	
	function setUser(data,status){
		if(status == "success" && data.stat == "ok"){
			user_id = data.user.id;
			$("#userText").text("Pronasao korisnika: ");
			$("#userName").text(data.user.username._content);
			var method = "method=flickr.people.getInfo";
			var user = "user_id="+user_id;

			var $btnPhotos = $("<button></button>");
			$btnPhotos.attr("class","btn btn-primary");
			$btnPhotos.attr("id","btnPhotos");
			$btnPhotos.text("Preuzmi javne slike");

			var $btnGallery = $("<button></button>");
			$btnGallery.attr("class","btn btn-primary");
			$btnGallery.attr("id","btnGallery");
			$btnGallery.text("Preuzmi Galeriju");

			var $divDugme = $("#userButtonGroup");
			$divDugme.empty();
			$divDugme.append($btnPhotos);
			$divDugme.append($btnGallery);

			var url = rest_url+method+"&"+user+"&"+format+"&"+api_key+"&"+jsoncallback;
			$.get(url,function(data,status){
				$("#userName").text(data.person.realname._content);
			},"json");
		}else{
			$("#userText").text("Nisam pronsao korisnika: ");
			$("#userName").text($("#tbInput").val());
		};	
	};

	function getPublicPhotos(){
		var user = "user_id="+user_id;
		var method = "method=flickr.people.getPublicPhotos";
		var extra = "extras=url_m,url_o"
		var url = rest_url+method+"&"+api_key+"&"+user+"&"+extra+"&"+format+"&"+jsoncallback;
		
		$.getJSON(url,function(data,status){
			if (status=="success" && data.stat == "ok"){
				var arrayPhoto = data.photos.photo;
				var $carInner = $(".carousel-inner");
				$carInner.empty();
				$.each(arrayPhoto, function(index,value){
					var div = $("<div></div>");
					div.addClass("item");
					if(index == 0){
						div.addClass("active");
					}
					var img =  $("<img></img>");
					img.attr({
						style : "height:375px",
						src: value.url_m
					});
					div.append(img);
					$carInner.append(div);
				});
			};	
		});
	};

	function getGallery(){
		var user = "user_id="+user_id;
		var method = "method=flickr.galleries.getList";
		var url = rest_url+method+"&"+api_key+"&"+user+"&"+format+"&"+jsoncallback;
		
		$.getJSON(url,function(data,status){
			if (status=="success" && data.stat == "ok"){
				var arrayGallery = data.galleries.gallery;
				var $galleryID = $("#galleryID");
				$galleryID.empty();
				if (data.galleries.pages==0){
					alert("Galeija nije postavljena!");
				}
				$.each(arrayGallery, function(index,value){
					var $a = $("<a href='#' class='list-group-item'></a>");
					$a.text(arrayGallery[index].title._content);
					var $span = $("<span class='badge'></span>");
					$span.text(arrayGallery[index].count_photos);
					$a.append($span);
					$galleryID.append($a);
					$a.click(function(e){
						getPhotos(arrayGallery[index].gallery_id);
					});	
				});
			};	
		});
	};
	
	function getPhotos(gallery_id){
		var gallery = "gallery_id="+ gallery_id;
		var method = "method=flickr.galleries.getPhotos";
		var extra = "extras=url_m,url_o"
		var url = rest_url+method+"&"+api_key+"&"+gallery+"&"+extra+"&"+format+"&"+jsoncallback;
		
		$.getJSON(url,function(data,status){
			if (status=="success" && data.stat == "ok"){
				var arrayPhoto = data.photos.photo;
				var $carInner = $(".carousel-inner");
				$carInner.empty();
				$.each(arrayPhoto, function(index,value){
					var div = $("<div></div>");
					div.addClass("item");
					if(index == 0){
						div.addClass("active");
					}
					var img =  $("<img></img>");
					img.attr({
						style : "height:375px",
						src: value.url_m
					});
					div.append(img);
					$carInner.append(div);
				});
			};	
		});
	};
});