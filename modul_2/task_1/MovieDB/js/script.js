$(document).ready(function(){
	var baseUrl="https://api.themoviedb.org/3/";
	var apiKey="api_key=d6567c81b3f90902e0886a226056f0d6";
	var movie="movie/top_rated?";
	var newPage=1;
	var totalPages;
	var currentPage;


	//Callback
	function addMovies(data, status){
		totalPages=data.total_pages;
		currentPage=data.page;
		newPage=currentPage;

		var $posters=$(".posters");
		$posters.empty();

		$.each(data.results, function(index,value){
			
			var $div=$("<div class='col-md-3'></div>");
			var $img=$("<img class='img-thumbnail'></img>");

			if(index % 4 == 0){
				var $row=$("<div class='row'></div>");
				if (index!=0){
					var $br=$("<br></br>");
					$posters.append($br);
				}
				$posters.append($row);
			};

			$img.attr({ 
				src : "http://image.tmdb.org/t/p/w300" + value.poster_path,
				title: value.title,
				id: value.id,
				class: "img-thumbnail"
			});

			$div.append($img);
			$(".posters .row:last-child").append($div);
		});

		setPagination();
		addClassPagination();
	};

	//Request API
	function loadMovies(e){

		if(e=="<<"){
			newPage=1;
		
		}else if((e=="<") && (currentPage>1)){
			newPage-=1;
		
		}else if((e==">") && (currentPage<totalPages)){
			newPage+=1;
		
		}else if(e==">>"){
			newPage=totalPages;
		
		}else if(!isNaN(e)){
			newPage=parseInt(e);
		}

		var url=baseUrl+movie;
		var req_url=url+apiKey+"&page="+newPage;
		$.getJSON(req_url,addMovies);
	}

	// Pagination
	function setPagination(){
		var $pagination=$("ul.pagination");
		$pagination.empty();

		var $li=$("<li></li>");
		var $a=$("<a href='#' title='<<'> << </a>");
		$li.append($a);
		$pagination.append($li);
		
		var $li=$("<li></li>");
		var $a=$("<a href='#' title='<'> < </a>");
		$li.append($a);
		$pagination.append($li);

		var page = currentPage;

		if (currentPage<=4){
			page = 1;
		} else if (currentPage>4){
			page = currentPage-3;
			if (currentPage>totalPages-3){
				page = totalPages - 6;
			}
		} 

		for(var i=0; i<totalPages;i++){
			var $li=$("<li></li>");
			var $a=$("<a href='#''></a>");
			$a.attr("title", page+i);
			$a.text(page+i);
			$li.append($a);
			$pagination.append($li);
			if (totalPages>5&&i==6){
				break;
			}
		};
		
		var $li=$("<li></li>");
		var $a=$("<a href='#' title='>'> > </a>");
		$li.append($a);
		$pagination.append($li);
		
		var $li=$("<li></li>");
		var $a=$("<a href='#' title='>>'> >> </a>");
		$li.append($a);
		$pagination.append($li);
	}

	function addClassPagination(){
		$(".pagination li a").each(function(){
			$(this).parent().removeClass("active");
			if(this.text==currentPage){
				$(this).parent().addClass("active");
			}
		});
	}

	//--------------------------------------------------------

	$("#topRated").click(function(){
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");
		$("h2.naslov").text("Top Rated Movies");
		movie="movie/top_rated?";
		newPage=1;
		loadMovies();
	});

	$("#upcoming").click(function(){
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");
		$("h2.naslov").text("Upcoming Movies");
		movie="movie/upcoming?";
		newPage=1;
		loadMovies();
	});

	$("#nowplaying").click(function(){
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");
		$("h2.naslov").text("Now Playing");
		movie="movie/now_playing?";
		newPage=1;
		loadMovies();
	});


	$("ul.pagination").on("click","a", function(){
		loadMovies(this.text.trim());
	});

	$(".container").on("click", "button.simmilar", function(){
		var movieId = $(this).attr("id");
		var movieTitle = $(this).attr("title");
		$("h2.naslov").text("Similar to: " + movieTitle);
		newPage=1;
		movie="movie/"+movieId +"/similar?";
		loadMovies();
	});

	$("button.search").click(function(){
		var query = "query="+$("#tbInput").val();
		$("h2.naslov").text("Results for: " + $("#tbInput").val());
		newPage=1;
		movie ="search/movie?"+query+"&";
		loadMovies();
	});


	$(".posters").on("click","img", function(e){
	
		var req_url = baseUrl + "movie/" + $(this).attr("id") + "?" + apiKey;
	
		$.getJSON(req_url,function(data,status){

			var $movieDiv = $(".movie");

			var $img = $movieDiv.find("img");
			$img.attr("src", "http://image.tmdb.org/t/p/w185" + data.poster_path);

			$movieDiv.find("a.title").text(data.title + " (" + data.release_date.split("-")[0] + ")")
									 .attr("href", "http://www.imdb.com/title/" + data.imdb_id);
			
			var $ul = $movieDiv.find("ul");
			$ul.empty();

			$ul.append("<li>" + parseInt(data.runtime/60) + "h " + data.runtime%60 + "min</li>");
			$ul.append("<li>|</li>");
			
			$.each(data.genres, function(index, value){
				var $li = $("<li></li>");
				var text = "" + value.name;

				if(index != data.genres.length-1)
					text +=",";
				
				$li.text(text);
				$ul.append($li);
			});
			$ul.append("<li>|</li>");
			var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
			
			var options = {  year: 'numeric', month: 'long', day: 'numeric' };
			var formater = new Intl.DateTimeFormat("sr",options);
			$ul.append("<li>" + formater.format(new Date(data.birthdaty)) + "</li>");
			$ul.append("<li>|</li>");
			
			$ul.append("<li>Rating: " + data.vote_average + 
				"<span class='glyphicon glyphicon-star' style='color:#ffcc00'></span> - " 
				+ data.vote_count + " votes</li>");

			$movieDiv.find("#description").text(data.overview);

			var productionCompaines = "";
			$.each(data.production_companies,function(index, value){
				productionCompaines += value.name;
				if(index != data.production_companies.length-1)
					productionCompaines += ", ";
			});

			$movieDiv.find("#production").text("Production companies: " + productionCompaines);
			
		
			var l10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
			$movieDiv.find("#budget").text("Budget: " + l10nUSD.format(data.budget));
			$movieDiv.find("#revenue").text("Revenue: " + l10nUSD.format(data.revenue));
			
			$movieDiv.find("#tagline").text("Tagline: " + data.tagline);


			if($movieDiv.css("display") == "none")
				$movieDiv.slideDown("slow");
			else{
				$movieDiv.fadeIn();
			}
				
			$movieDiv.click(function(){
				$(this).fadeOut();
			})

			$("button.simmilar").show(10).attr({
				id: data.id,
				title: $("a.title").text() 
			});
		});
	});

	
	loadMovies();
		
});

