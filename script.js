var apiKey = '64049e14167e493d01838b9c3f5dcbb0';
var apiCurrentUrl;
var apiFutureUrl;
var apiUltraViolet;
var searchInput = document.getElementById("search-input");

var historySearches = document.getElementById("history");

function showSavedLocations() {
    var locations = localStorage.getItem("savedLocations");
    if (locations) {
        var parsedLocations = JSON.parse(locations);
        parsedLocations.forEach(function(item) {
            var listItem = document.createElement('li');
            var content = `<button data-location="${item}">${item}</button>`
            listItem.innerHTML = content;
            historySearches.appendChild(listItem);
        });
    }
}

function updateContentPane(event) {
    var buttonClicked = event.target;
    var location = buttonClicked.getAttribute("data-location");
}

function setEventListeners() {
    historySearches.addEventListener('click', updateContentPane)
}

function init() {
    setEventListeners();
    showSavedLocations();
}

init();

