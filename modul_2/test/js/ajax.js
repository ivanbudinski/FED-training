$(document).ready(function() {
	
    var api_key = "api_key=d6567c81b3f90902e0886a226056f0d6";
    var base_url ="https://api.themoviedb.org/3";
    var page = 5;
    var total_pages;

    function getPopularPerson(){
        var url=base_url+"/person/popular?"+api_key +"&page="+ page;
        $.getJSON(url).success(setPopularPerson);
    };

    function setPopularPerson(data){
        page=data.page;
        total_pages=data.total_pages;
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
                src : "http://image.tmdb.org/t/p/w300" + value.profile_path,
                title: value.name,
                id: value.id,
                class: "img-thumbnail"
            });

            $div.append($img);
            $(".posters .row:last-child").append($div);
        });
    };

    //Pagination
    $("#prev").on("click",function(){
        if(page>1){
            page-=1;
        }
        getPopularPerson();
    });

    $("#next").on("click",function(){
        if(page<total_pages){
            page+=1;
        }
        getPopularPerson();
    });


    $(".container").on("mouseenter",".posters img",function(){
        $(this).fadeTo(50,0.7);
    });

    $(".container").on("mouseleave",".posters img",function(){
        $(this).fadeTo(50,1);
    });

    $(".posters").on("click","img",function(){
        $(".movie").fadeIn();
        $("html body").animate({
            scrollTop:$(".movie").offset().top
            }, 1000);
      
        var url = base_url+"/person/"+$(this).attr("id")+"?"+api_key;

        $.getJSON(url, function(data,success){
            var movieDiv=$(".movie");
            movieDiv.find("img").attr("src","http://image.tmdb.org/t/p/w185"+data.profile_path);
            movieDiv.find(".title").text(data.name)
                                   .attr({
                                    href:"http://www.imdb.com/name/" + data.imdb_id,
                                    target:"_blank"
                                    });
            $("#biography").text(data.biography);
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var formater = new Intl.DateTimeFormat("en-US",options);
            $("#birthday").text("Born on: "+formater.format(new Date(data.birthday)));
            $("#placeofbirth").text("Place of birth: "+ data.place_of_birth);
            if(data.deathday!=null){
                $("#deathday").remove();
                $span=$("<span id='deathday'></span>");
                $span.text("Death on: " + formater.format(new Date(data.deathday)));
                $("#placeofbirth").parent().append($span);
            }else{
                $("#deathday").remove();
            }
        });

        var url = base_url+"/person/"+$(this).attr("id")+"/movie_credits?"+api_key;
        $.getJSON(url, function(data,success){
            var selMovie=$("#cbInput");
            selMovie.empty();
            selMovie.append($(new Option("Izaberite film","")));
            $.each(data.cast,function(index,value){
                selMovie.append($(new Option(value.title,value.id)));
            })

        });
    });

    $("#cbInput").change(function(){
        var id = this.value;
        if (id!=null){
            $("#btnImdb").attr("disabled",false)
                         .click(function(){
                var url = base_url+"/movie/"+id+"?"+api_key;
                $.getJSON(url, function(data,success){
                    openInNewTab("http://www.imdb.com/title/"+data.imdb_id);
                });
            });
        }else{
             $("#btnImdb").attr("disabled",true);
        };
    });
    getPopularPerson();

});

function openInNewTab(url) {
  var win = window.open(url,'_blank');
  win.focus();
}

