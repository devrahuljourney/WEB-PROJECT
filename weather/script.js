// Selecting DOM elements using querySelector

// Select the user weather tab using its data attribute
const userTab = document.querySelector('[data-userWeather]');

// Select the search weather tab using its data attribute
const searchTab = document.querySelector('[data-searchWeather]');

// Select the container for weather information
const userContainer = document.querySelector(".weather-container");

// Select the container for granting location access
const grantAccessContainer = document.querySelector(".grant-location-container");

// Select the search form using its data attribute
const searchForm = document.querySelector('[data-searchForm]');

// Select the loading screen container
const loadingScreen = document.querySelector(".loading-container");

// Select the user info container
const userInfoContainer = document.querySelector(".user-info-container");

// Initialize the current active tab
let oldTab = userTab;

// API key for weather data (replace with your own API key)
const API_KEY = "35583b76c99f48d0abcb2f288d7df0da";

// Add the "current-tab" class to the userTab initially
oldTab.classList.add("current-tab");

// Event listeners for tab clicks

// When the user weather tab is clicked
userTab.addEventListener("click", () => {
    switchTab(userTab); // Call the switchTab function and pass userTab as argument
});

// When the search weather tab is clicked
searchTab.addEventListener("click", () => {
    switchTab(searchTab); // Call the switchTab function and pass searchTab as argument
});

// Function to switch tabs
function switchTab(newTab) {
    if (newTab != oldTab) {
        // Remove the "current-tab" class from the current active tab
        oldTab.classList.remove("current-tab");

        // Update the current active tab
        oldTab = newTab;

        // Add the "current-tab" class to the clicked tab
        newTab.classList.add("current-tab");
        if(!searchForm.classList.contains("active"))
        {
             userInfoContainer.classList.remove("active");
             grantAccessContainer.remove("active");
             searchForm.classList.add("active");
        }
        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFromSessionStorage();
        }
    }
}


// check if cordinate are already present in session storage
function getFromSessionStorage(){
    const localCoordinate = sessionStorage.getItems("user-coordinates");
    if(!localCoordinate){
        grantAccessContainer.classList.add("active");
    }
    else{
         const coordinate = JSON.parse(localCoordinate);
         fetchUserWeatherInfo(coordinate);
    }
}


//
async function fetchUserWeatherInfo(coordinate)
{
    const {lat,lon} = coordinate;

    //make grantAccessContainer invisible
    grantAccessContainer.classList.remove("active");

    //make loader visible
    loadingScreen.classList.add("active");

    // api call
    try{
        const response = await fetch(
            'https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API key}'
        );
        const data = await response.json();
        loadingScreen.classList.remove("active"); 
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err)
    {
         loadingScreen.classList.remove("active");
    }
}
function renderWeatherInfo(weatherInfo)
{
    //firstly we have to fetch the elements
    const cityname = document.querySelector('[data-cityName]');
    const countryicon = document.querySelector('[data-countryicon]');
    const desc = document.querySelector('[data-weatherDesc]')
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('[data-temp]');
    const windSpeed = document.querySelector('[data-windSpeed]');
    const Humidity = document.querySelector('[data-Humidity]');
    const cloudiness = document.querySelector('[data-cloud]');


    //fetch value from user 
    cityname.innerText = weatherInfo?.name;
    countryicon.src = 'https://flafcdn.com/144×100/${weatherInfo?.sys?.country.toLowerCase()}.png';
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherinfo?.weather.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windSpeed.innerText = weatherInfo?.wind?.speed;
    Humidity.innerText = weatherInfo?.main?.Humidity;
    cloudiness.innerText= weatherInfo?.clouds?.all;
}
const grantAcessBtn = document.querySelector('[data-grantAccess]');
grantAcessBtn.addEventListener('click', getlocation());
function getlocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showpostion(position)
{
    const userCoordinate = {
        lat: position.coords.latitude,
        lon: position.coords.longitude ,
       
    }
    sessionStorage.setItem("user-container", JSON.stringify(userCoordinate));
    fetchUserWeatherInfo(userCoordinate);
}