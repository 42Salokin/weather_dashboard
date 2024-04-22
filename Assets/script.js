let APIKey = "6afca093eca4db8e4a356c7dbf458132";
let cityInput = document.querySelector("#city");
let cityBtn = document.querySelector("#cityBtn");
const repoList = document.querySelector('ul');

// On click, appends city name to page, calls fetch function with city name
cityBtn.addEventListener('click', function (event) {
    event.preventDefault;
    let city = cityInput.value;
    const sidebar = document.querySelector("#sidebar");
    empty(sidebar);
    let cityHist = document.createElement("a");
    cityHist.setAttribute("class", "pastCity");
    cityHist.textContent = city;
    sidebar.appendChild(cityHist);

    getAPI(city);
})

// ToDo: On click, log city to local storage,
// Clear all current cities in list,
// Pull list of cities from local storage,
// Display on screen

function empty(element) {
    while(element.firstElementChild) {
        element.firstElementChild.remove();
    }
}



// Sends fetch request to API for current weather info, calls weather display function with info
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

// Creates current weather display on page, calls forecast fetch function
function weatherNow(data) {
    const today = document.querySelector("#today");
    empty(today);
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

    today.append(cityName, day, icon, temp, wind, humidity);

    getFore(data);
}

// Sends fetch request for forecast, calls weather forecast display function
function getFore(data) {
    const queryURL2 = `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&units=imperial&appid=${APIKey}`;
    fetch(queryURL2)   
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            weatherFore(data);
        });  
}

// Takes five-day data and displays each day as list on page
function weatherFore(data) {
    console.log(data);
    const foreArray = [data.list[4], data.list[12], data.list[20], data.list[28], data.list[36]];
    console.log(foreArray);
    const foreDiv = document.querySelector("#forecast");
    empty(foreDiv);
    for (const fore of foreArray) {
        const card = document.createElement("ul");
        const date = document.createElement("li");
        const icon = document.createElement("img");
        const temp = document.createElement("li");
        const wind = document.createElement("li");
        const humidity = document.createElement("li");

        date.textContent = dayjs.unix(fore.dt).format('MM/DD/YYYY');
        icon.src = `https://openweathermap.org/img/wn/${fore.weather[0].icon}.png`;
        temp.textContent = `Temp: ${fore.main.temp}°F`;
        wind.textContent = `Wind: ${fore.wind.speed} MPH`;
        humidity.textContent = `Humidity: ${fore.main.humidity} %`;

        card.append(date, icon, temp, wind, humidity);
        foreDiv.append(card);
    }
}



