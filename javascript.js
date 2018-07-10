$(document).ready(function () {
    displayButtons(buttonArray, "searchButton", "#buttonsWrapper");
    console.log("page loaded");
});

var buttonArray = ["donuts", "cupcakes", "ice cream", "candy", "soda"];

function displayButtons(buttonArray, addClassTo, areaAddTo) {
    $(areaAddTo).empty();
    for (var i = 0; i < buttonArray.length; i++) {
        var a = $("<button>");
        a.addClass(addClassTo);
        a.attr("data-type", buttonArray[i]);
        a.text(buttonArray[i]);
        $(areaAddTo).append(a);

    }
}

$(document).on("click", ".searchButton", function () {
    $("#search").empty();
    var topic = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var divSearch = $("<div class='search-item'>");
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $("<img>");
                image.attr("src", still);
                image.attr("data-still", still);
                image.attr("data-animated", animated);
                image.attr("data-state", "still");
                image.addClass("searchImage");
                divSearch.append(p);
                divSearch.append(image);
                $("#search").append(divSearch);
                console.log(animated);
                console.log(still);


            }
        });

});
$(document).on("click", ".searchImage", function () {
    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
$("#searches").on("click", function () {
    var newSearch = $("input").val().trim();
    buttonArray.push(newSearch);
    displayButtons(buttonArray, "searchButton", "#buttonsWrapper");
    return false;
});