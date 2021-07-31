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
var apiCurrentUrl;
var apiFutureUrl;
var apiUltraViolet;

function citySubmit(event) {
    event.preventDefault();
    document.querySelector("#search-weather").addEventListener("click", getCurrent());
    document.querySelector("#search-weather").addEventListener("click", getFuture());
}

function cityStore() {

}

function getCurrent() {
    fetch(apiCurrentUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
        })
}

function getFuture() {
    fetch(apiFutureUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
        })
}

function showUV() {

}

function showAllConditions() {
    
}

