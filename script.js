var apiKey = '64049e14167e493d01838b9c3f5dcbb0';
var apiUrl = "https://openweathermap.org";
var apiFutureUrl;
var apiUltraViolet;
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");

var historySearches = document.getElementById("history");

function showSavedLocations() {
    var locations = localStorage.getItem("savedLocations");
    if (locations) {
        var parsedLocations = JSON.parse(locations);
        parsedLocations.forEach(function(item) {
            createHistoryButton(item);
        });
    }
}

function createHistoryButton(location) {
    var listItem = document.createElement('li');
    var content = `<button data-location="${location}">${location}</button>`
    listItem.innerHTML = content;
    historySearches.appendChild(listItem);
}

function updateContentPane(event) {
    var buttonClicked = event.target;
    var location = buttonClicked.getAttribute("data-location");
}

function searchCity(event) {
    event.preventDefault()
    var location = searchInput.value;
    if (location) {
        window.alert("Please enter a location!");
    }

    var url = `$(apiUrl)/data/2.5/find?q=${location}&appid=${appid}`

    fetch(url).then(function(response) {
        if (!response.ok) {
            window.alert('fetch failed');
        }
        return response.json()

    }).then(function(data) {
        if (data.count === 0) {
            window.alert("This is not a valid location!");
        }
        doSuccessfulFetch(data, location);
    })
}

function setEventListeners() {
    historySearches.addEventListener('click', updateContentPane);
    searchInput.addEventListener("click", searchCity)
}

function setLocalStorage(location) {
    var locations = localStorage.getItem("savedLocations");
    var parsedLocations = [];

    if (locations) {
        parsedLocations = JSON.parse(locations);
    }
    var hasLocation = parsedLocations.some(function (loc){
        return loc.toLowerCase() === location.toLowerCase();
    });

    if (!hasLocation) {
        parsedLocations.push(location);
        localStorage.setItem("savedLocations", JSON.stringify(parsedLocations));
    }
}

function doSuccessfulFetch(data, location) {
    createHistoryButton(location);
    setLocalStorage(location)
}

function init() {
    setEventListeners();
    showSavedLocations();
}

init();

