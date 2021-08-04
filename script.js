/* GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city */

var apiKey = '64049e14167e493d01838b9c3f5dcbb0';
var apiUrl = "https://openweathermap.org";
var url = `$(apiUrl)/data/2.5/find?q=${location}&appid=${appid}`
var apiFutureUrl;
var apiUltraViolet;
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var historySearches = document.getElementById("history");
var data = await doFetch(url);

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
    setLocalStorage(location);
}

function displayConditions() {
    
    var currentCard = document.createElement('div');
    var cityName = document.createElement('p');
    var cityNameContent = data.current.temp;
    console.log(cityNameContent);
}

function doFetch() {
    fetch(url).then(function(response) {
        if (!response.ok) {
            window.alert('fetch failed');
        }
        return response.json()

    }).then(function(data) {
        if (data.count === 0) {
            window.alert("This is not a valid location!");
            console.log(current.temp);
        }
        doSuccessfulFetch(data, location);
    })
}

function init() {
    setEventListeners();
    showSavedLocations();
}

init();

