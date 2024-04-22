let APIKey = "6afca093eca4db8e4a356c7dbf458132";
let cityInput = document.querySelector("#city");
let cityBtn = document.querySelector("#cityBtn");
const repoList = document.querySelector('ul');
// const queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
// ToDo: make a fetch request from the weather API

cityBtn.addEventListener('click', function (event) {
    event.preventDefault;
    let city = cityInput.value;
    const sidebar = document.querySelector("#sidebar");
    let cityHist = document.createElement("span");
    cityHist.textContent = city;
    sidebar.appendChild(cityHist);
    getAPI(city);
})


function getAPI (city) {
    console.log(city);
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    fetch(queryURL)   
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            weatherNow(data);        
        });    
}

function weatherNow(data) {
    const today = document.querySelector("#today");
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    console.log(data);

    const cityName = document.createElement("p");
    const day = document.createElement("p");
    const temp = document.createElement("p");
    const wind = document.createElement("p");
    const humidity = document.createElement("p");
    const icon = document.createElement("img");

    cityName.textContent = data.name;
    day.textContent = `(${dayjs().format('MM/DD/YYYY')})`
    temp.textContent = `Temp: ${data.main.temp}°F`;
    wind.textContent = `Wind: ${data.wind.speed} MPH`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    today.appendChild(cityName);
    today.appendChild(day);
    today.appendChild(icon);
    today.appendChild(temp);
    today.appendChild(wind);
    today.appendChild(humidity);
}

// getForecast(lat, lon, cityName);
// ToDo: make a fetch request from a geolocator API
// ToDo: take the input from the form input and put it in local storage
// ToDo: make a function to pull the relevant geolocation info, compare it to the input, 
// and return the lat/long coordinates of that city
// ToDo: make a function to pull the relevant weather info for the lat/long coordinates 
// and put them on the screen 