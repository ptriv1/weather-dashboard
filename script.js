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
    var myLocation = searchInput.value;
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
            console.log(data.list.main);
            console.log(data.list[0].main.temp);
            createCurrentSection(data);
            doForecast(data, myLocation);
        })
    }

var lat;
var lon;

async function createCurrentSection(data) {
    document.getElementById("current-section").innerHTML = "";
    var citySection = document.createElement("div");
    var cityName = data.list[0].name;
    var cityNode = document.createTextNode(cityName);
    citySection.appendChild(cityNode);
    document.getElementById("current-section").appendChild(citySection);
    var dateSection = document.createElement("div");
    var dateCurrent = data.list[0].dt;
    dateCurrent = moment(dateCurrent*1000).format("MMM Do");     
    var dateNode = document.createTextNode(dateCurrent);
    dateSection.appendChild(dateNode);
    document.getElementById("current-section").appendChild(dateSection);
    var iconSection = document.createElement("div");
    var iconNode = document.createElement("img");
    iconNode.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    iconSection.appendChild(iconNode);
    document.getElementById("current-section").appendChild(iconSection);
    var tempSection = document.createElement("div");
    var temperature = data.list[0].main.temp;
    var tempNode = document.createTextNode(temperature);
    tempSection.appendChild(tempNode);
    document.getElementById("current-section").appendChild(tempSection);
    var humiditySection = document.createElement("div");
    var humidityPercent = data.list[0].main.humidity;
    var humidityNode = document.createTextNode(humidityPercent);
    humiditySection.appendChild(humidityNode);
    document.getElementById("current-section").appendChild(humiditySection);
    var windSection = document.createElement("div");
    var windSpeed = data.list[0].wind.speed;
    var windNode = document.createTextNode(windSpeed);
    windSection.appendChild(windNode);
    document.getElementById("current-section").appendChild(windSection);
    var lat = data.list[0].coord.lat;
    var lon = data.list[0].coord.lon;
    getUVIndex(lat, lon);
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

async function doForecast(data, myLocation) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${myLocation}&units=imperial&appid=${apiKey}`;
    console.log(forecastUrl);
    fetch(forecastUrl) 
        .then(function (response){
            return response.json();
        })
            .then(function (data) {
            console.log(data);
            createForecast(data);
        })
        
}

function createForecast(data) {
    document.getElementById("forecast").innerHTML = "";
    console.log(data.list.length); 
    for (var i = 0; i < data.list.length; i++) {
        console.log(data.list.name);
        console.log(data.list[i].dt);
        console.log(data.list[i].main.temp);
        console.log(data.list[i].main.humidity);
        console.log(data.list[0].wind.speed);
        var dayForecast = moment((data.list[i].dt)*1000).format("MMM Do"); 
        var iconForecastNode = document.createElement("img");
        var iconForecasts;
        iconForecasts.src = `https://openweathermap.org/img/w/${data.list[i].weather[i].icon}.png`;

        if (dayForecast) {
            continue;
        }

    }
    var iconForecastNode = document.createElement("img");
    var iconForecasts;
    iconForecasts.src = `https://openweathermap.org/img/w/${data.list[i].weather[i].icon}.png`;

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

