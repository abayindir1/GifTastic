
$(document).ready(function () {

    var topics = ["The Godfather", "Matrix", "The Revenant", "The Hateful Eight", "Interstellar", "12 Angry Men"]

    function showContent() {
        var movieName = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movieName + "&api_key=i6NekEIIc0KswztA8slpxQeF66sYQrqe&limit=10";
        
        $.ajax({url:queryURL, method: "GET"})
        .then(function(response){
            for (i = 0; i < 11; i++){
                var newDiv = $("<div>")
                var rate = $("<p>")
                rate.text(response.data[i].rating);
                var gifs = $("<img>")
                gifs.attr("src", response.data[i].images.original.url);
                rate.appendTo(newDiv)
                gifs.appendTo(newDiv)
                newDiv.prependTo($("#gifs-view"))
            }
        })
    }
        
        function showButtons(){
            $("#buttons-view").empty();
            
        for(i = 0; i<topics.length; i++){
            var b = $("<button>");
            b.addClass("movies");
            b.attr("data-name", topics[i]);
            b.text(topics[i]);
            $("#buttons-view").append(b);
        }
    }
    $(".btn").on("click", function(event){
        event.preventDefault();
        var movie = $("#movie").val().trim();
        topics.push(movie);
        showButtons();
    })
    $(document).on("click", ".movies", showContent);
    showButtons();

})