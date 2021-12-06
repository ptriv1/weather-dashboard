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

// var url = `${apiUrl}/data/2.5/find?q=${city}&appid=${apiKey}`;

var apiKey = 'fa1c6a221cbd23e57c0e663f1b9e184a';
var apiUrl = "https://openweathermap.org";

var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-weather");
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
    buttonClicked.getAttribute("data-location");
}

// var city = document.getElementById("search-input").innerText;

var myLocation;
function searchCity(event) {
    event.preventDefault()
    myLocation = searchInput.value;
    if (myLocation === "") {
        window.alert("Please enter a location!");
    }
    createHistoryButton(myLocation);
    doSearch(myLocation);
}

function setEventListeners() {
    historySearches.addEventListener('click', updateContentPane);
    searchButton.addEventListener("click", searchCity);
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

function doSuccessfulFetch (data, myLocation) {
    createHistoryButton(myLocation);
    setLocalStorage(myLocation);
}



function doSearch(myLocation) { 
    var url = `https://api.openweathermap.org/data/2.5/find?q=${myLocation}&units=imperial&appid=${apiKey}`;
    console.log(url);
    fetch(url) 
        .then(function (response){
            return response.json();
        })
            .then(function (data) {
            console.log(data);
            console.log(data.list);
            console.log(data.list[0].main.temp);
            createCurrentSection(data);
            doForecast(data, myLocation);
        })
    }

var lat;
var lon;

async function createCurrentSection(data) {
    var cityName = data.list[0].name;
    var dateCurrent = data.list[0].dt;
    dateCurrent = moment(dateCurrent*1000).format("MMM Do");
    var iconSection = document.createElement("div");
    var iconNode = document.createElement("img");
    iconNode.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    var temperature = data.list[0].main.temp;
    var humidityPercent = data.list[0].main.humidity;
    var windSpeed = data.list[0].wind.speed;
    var template = `
    <p class="date">City: ${cityName}</p>
    <p class="date">Date: ${dateCurrent}</p>
    <p class="temp">Temp: ${temperature}</p>
    <p class="humidity">Humidity: ${humidityPercent}</p>
    <p class="windSpeed">Windspeed: ${windSpeed}</p>
    `;
    document.getElementById("current-section").innerHTML = template;
    var currentSection = document.createElement("div");
    var lat = data.list[0].coord.lat;
    var lon = data.list[0].coord.lon;
    getUVIndex(lat, lon);
    document.getElementById("current-section").appendChild(currentSection);
}


async function getUVIndex(lat, lon) {
    var apiKey = 'fa1c6a221cbd23e57c0e663f1b9e184a';
    var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(uvUrl) 
        .then(function (response){
            return response.json();
        })
            .then(function (data) {
            console.log(data);
            var uvSection = document.createElement("div");
            var uvIndex = data.current.uvi;
            var uvNode = document.createTextNode(uvIndex);
            uvSection.appendChild(uvNode);
            document.getElementById("current-section").appendChild(uvSection);
        })

}

async function doForecast(lat, lon) { 
    var limit = 5;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
    var cityForecastUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${myLocation}&limit=${limit}&appid=${apiKey}`;
    
    fetch(cityForecastUrl) 
        .then(function (response){
            return response.json();
        })
            .then(function (data) {
            fetch (forecastUrl) 
                .then (function (response) {
                    return response.json();
                })
                    .then(function (data) {
                        console.log(data);
                    })
            createForecast(data);
        })
        
}

function createForecast(data) {
    document.getElementById("forecast").innerHTML = "";
    for (var i = 0; i < data[index].length; i++) {
        var daySection = document.createElement("div");
        var citySection = document.createElement("div");
        var cityName = data[index].city.name;
        var cityNode = document.createTextNode(cityName);
        citySection.appendChild(cityNode);
        var dateSection = document.createElement("div");
        var dateForecastUse = moment((data.list[i].dt)*1000).format("MMM Do");  
        var dateNode = document.createTextNode(dateForecastUse);
        dateSection.appendChild(dateNode);
        daySection.appendChild(citySection);
        daySection.appendChild(dateSection);
        document.getElementById("forecast").appendChild(daySection);
        var dayForecast = moment((data.list[i].dt)*1000).format("MMM Do"); 
        var iconForecastNode = document.createElement("img");
        iconForecastNode.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    }

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
        console.log(data.current.temp);
        }
        doSuccessfulFetch(data, location);
    })
}

function init() {
    setEventListeners();
    showSavedLocations();
}

init();

