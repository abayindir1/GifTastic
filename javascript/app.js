
$(document).ready(function () {

    var topics = ["The Godfather", "Matrix", "The Revenant", "The Hateful Eight", "Interstellar", "12 Angry Men"]
    var imageCount = 0
    var count = 0

    function showContent() {
        var movieName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieName + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({ url: queryURL, method: "GET" })
            .then(function (response) {
                var newDiv = $("<div>")
                newDiv.addClass("animations")
                for (i = 0; i < 11; i++) {
                    var rate = $("<p>")
                    rate.text("Rating: " + response.data[i].rating);
                    var gifs = $("<img>")
                    gifs.addClass("gif")
                    gifs.attr("data-still", response.data[i].images.original_still.url)
                    gifs.attr("data-animated", response.data[i].images.original.url)
                    gifs.attr("data-state", "still")
                    gifs.attr("src", response.data[i].images.original_still.url)
                    clickImage()
                    if (imageCount >= 10) {
                        imageCount=0
                        $(".animations").empty()
                        gifs.attr("data-still", response.data[imageCount].images.original_still.url)
                        gifs.attr("data-animated", response.data[imageCount].images.original.url)
                        gifs.attr("data-state", "still")
                        gifs.attr("src", response.data[imageCount].images.original_still.url)
                    }
                    newDiv.append(rate, "<br>", gifs)
                    newDiv.prependTo($("#gifs-view"))
                    clickImage()
                    imageCount++
                    console.log(count)
                    console.log("bum" + imageCount)
                }
            })
    }

    function clickImage() {
        $(".gif").on("click", function () {
            var state = $(this).attr("data-state")
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animated"));
                $(this).attr("data-state", "animated")
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still")
            }
        })
    }



    function showButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("movies");
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            $("#buttons-view").append(button);
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