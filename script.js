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

var apiKey = '9add3f1517db1996021516ac1dcd2b3d';
var apiUrl = "https://openweathermap.org";
var apiFutureUrl;
var apiUltraViolet;
var city;
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
    var location = buttonClicked.getAttribute("data-location");
}

function searchCity(event) {
    event.preventDefault()
    var location = searchInput.value;
    if (location === "") {
        window.alert("Please enter a location!");
    }
    doSearch(city);
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

function doSuccessfulFetch(data, location) {
    createHistoryButton(location);
    setLocalStorage(location);
}



function doSearch(city) {
    var url = `https://api.openweathermap.org/data/2.5/find?q=austin&appid=9add3f1517db1996021516ac1dcd2b3d`;
    // var data = await doFetch(url);
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
        })
    }

 async function createCurrentSection(data) {
    var url = `https://api.openweathermap.org/data/2.5/find?q=austin&appid=9add3f1517db1996021516ac1dcd2b3d`;
    var citySection = document.createElement("div");
    var cityName = data.list[0].name;
    var cityNode = document.createTextNode(cityName);
    citySection.appendChild(cityNode);
    document.getElementById("current-section").appendChild(citySection);
    var dateSection = document.createElement("div");
    var dateCurrent = data.list[0].dt;
    var dateNode = document.createTextNode(dateCurrent);
    dateSection.appendChild(dateNode);
    document.getElementById("current-section").appendChild(dateSection);
    var iconSection = document.createElement("div");
    var iconNode = document.createElement("img");
    iconNode.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    iconSection.appendChild(iconNode);
    document.getElementById("current-section").appendChild(iconSection);
}

/* function getCoordinates() {
    var latitude;
    var longitude;
    fetch() {
        .then(response)
        .then(data)
    }
} */

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

