// search the collection using a JSON call
function search(query) {
return $.getJSON("https://www.rijksmuseum.nl/api/nl/collection?q=Q&key=CdGbwlYs&format=json".replace("Q", query));
}

function setup() {

// creates a thumbnail image for the specified art object
function thumbnail(object) {
return $("<div>")
.addClass("thumb")
.css("background-image", "url(" + object.webImage.url.replace("s0", "s128") +")");
}

// fire the search query
search($("#query").val())
.done(function(results) {
$("#example3-container").empty();

var $table = $("#example3-container");
$table.html("");

// create a row for each art object found
$.each(results.artObjects, function(index, object) {
  console.log(object);

  var $row = $('<tr class="child"><td>'
    + object.objectNumber
    +'</td><td class="thumbnail">'
    +'</td><td>'
    + object.title
    +'</td></tr>').appendTo($table);

  $row.find(".thumbnail").append(thumbnail(object));

  // make each row clickable, navigating to the relevant page on the Rijksmuseum website
  $row.on("click", function() {
    document.location = object.links.web;
  });
})
});
