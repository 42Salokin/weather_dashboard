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
    //     {
    //     method: 'GET',
    //     headers: {
    //     "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    //     "X-RapidAPI-Key": APIKey,
    //     }
    // }    
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const lat = data.coord.lat;
            console.log(lat);
            const lon = data.coord.lon;
            console.log(lon); 
            const cityName = data.name;
            console.log(cityName); 
            // getForecast(lat, lon, cityName);          
        });
    
}

// ToDo: make a fetch request from a geolocator API
// ToDo: take the input from the form input and put it in local storage
// ToDo: make a function to pull the relevant geolocation info, compare it to the input, 
// and return the lat/long coordinates of that city
// ToDo: make a function to pull the relevant weather info for the lat/long coordinates 
// and put them on the screen 