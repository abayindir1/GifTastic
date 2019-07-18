
$(document).ready(function () {

    var topics = ["The Godfather", "Matrix", "The Revenant", "The Hateful Eight", "Interstellar", "12 Angry Men"]

    function showContent() {
        var movieName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieName + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({ url: queryURL, method: "GET" })
            .then(function (response) {
                var newDiv = $("<div>")
                for (i = 0; i < 11; i++) {
                    var rate = $("<p>")
                    rate.text("Rating: " + response.data[i].rating);
                    var gifs = $("<img>")
                    gifs.attr("src", response.data[i].images.original.url);
                    newDiv.append(rate, "<br>", gifs)
                    newDiv.prependTo($("#gifs-view"))
                }
            })
    }

    // $(img).on("click", function (){
    //     var state = $(this).attr("data-state");

    //     if(state = "still"){
    //         $(this).attr("src", $(this).attr("data-animate"))
    //         $(this).attr("data-state", "animate")
    //     }else{
    //         $(this).attr("src", $(this).attr("data-still"))
    //         $(this).attr("data-state", "still")
    //     }
    // })

    function showButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var b = $("<button>");
            b.addClass("movies");
            b.attr("data-name", topics[i]);
            b.text(topics[i]);
            $("#buttons-view").append(b);
        }
    }
    $(".btn-submit").on("click", function (event) {
        event.preventDefault();
        var movie = $("#movie").val().trim();
        topics.push(movie);
        showButtons();
    })
    

    $("#buttons-view").on("click", ".movies", showContent);
    showButtons();
})