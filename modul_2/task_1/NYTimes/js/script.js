$(document).ready(function(){
	var apiKey = "api-key=c287b7ba21374bf7a30cbe3911adafbe";
	var topStoriesURL = "https://api.nytimes.com/svc/topstories/v2";
	var articleSearchURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

	$("#btnSearch").click(function(){
		// Built by LucyBot. www.lucybot.com
		var q="q="+$("#query").val();
		$.getJSON(articleSearchURL+"?"+apiKey+"&"+q).success(getSearch);
	});

	$("#btnTop").click(function(){
		var q=$("#select").val();
		$.getJSON(topStoriesURL+"/"+q+".json"+"?"+apiKey).success(getTopStories);
	});

	$.ajax({
		  url: topStoriesURL+"/home.json"+"?"+apiKey,
		  method: "get",
		  dataType: "json",
		  success:getTopStories,
		  error: function (data, status){
		  	alert("Error: " + data + " " + status);
		  }
	});

	function getTopStories(data, status){
		var $stories=$("#stories");
		$stories.empty();

		$.each(data.results, function(index,value){
			var $div=$("<div></div>");
				$div.css("width", "300px");
				$div.css("height", "200px");
			var $br=$("<br/>");

			var $div2=$("<div></div>");
			var $a=$("<a></a>");
				$a.attr("href",value.url);
			var $h4=$("<h4></h4>");
				$h4.text(value.title);
				$a.append($h4);
				$div2.append($a);

			var $h6=$("<h6></h6>");
				$h6.text(value.byline);

			var $p2=$("<p></p>");
				$p2.text(value.abstract);

				$div.append($div2,$br,$h6,$br,$p2);
				$stories.append($div);
		});

		$("#copyRight").empty();
		var $div=$("<div></div>");
		var $hr = $("<hr></hr>");
		$("#copyRight").append($div,$hr,data.copyright);
	};

	function getSearch(data, status){
		var $stories=$("#stories");
		$stories.empty();

		$.each(data.response.docs, function(index,value){
			var $div=$("<div></div>");
				$div.css("width", "300px");
				$div.css("height", "200px");
			var $br=$("<br/>");

			var $div2=$("<div></div>");
			var $a=$("<a></a>");
				$a.attr("href",value.web_url);
			var $h4=$("<h4></h4>");
				$h4.text(value.headline.main);
				$a.append($h4);
				$div2.append($a);

			var $h6=$("<h6></h6>");
				$h6.text(value.byline.original);

			var $p2=$("<p></p>");
				$p2.text(value.snippet);

				$div.append($div2,$br,$h6,$br,$p2);
				$stories.append($div);
		});

		$("#copyRight").empty();
		var $div=$("<div></div>");
		var $hr = $("<hr></hr>");
		$("#copyRight").append($div,$hr,data.copyright);
	};
});