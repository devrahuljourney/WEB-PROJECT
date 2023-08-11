// Selecting DOM elements using querySelector
const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector('[data-searchForm]');
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = userTab;

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

        // Check if search form is active
        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        } else {
            // Hide search form, show user info and check session storage
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFromSessionStorage();
        }
    }
}

// Check if coordinates are already present in session storage
function getFromSessionStorage() {
    const localCoordinate = sessionStorage.getItem("user-coordinates");
    if (!localCoordinate) {
        grantAccessContainer.classList.add("active");
    } else {
        const coordinate = JSON.parse(localCoordinate);
        fetchUserWeatherInfo(coordinate);
    }
}

// Fetch weather information based on coordinates
async function fetchUserWeatherInfo(coordinate) {
    const { lat, lon } = coordinate;

    // Make grantAccessContainer invisible
    grantAccessContainer.classList.remove("active");

    // Make loader visible
    loadingScreen.classList.add("active");

    // API call to fetch weather data
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const data = await response.json();

        // Hide loader, show user info, and render weather data
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        // If error occurs, hide loader
        loadingScreen.classList.remove("active");
    }
}

// Render weather information in the UI
function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector('[data-cityName]');
    const countryicon = document.querySelector('[data-countryicon]');
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('[data-temp]');
    const windSpeed = document.querySelector('[data-windSpeed]');
    const Humidity = document.querySelector('[data-Humidity]');
    const cloudiness = document.querySelector('[data-cloud]');

    // Populate UI elements with weather data
    cityName.innerText = weatherInfo?.name;
    countryicon.src = `https://flafcdn.com/144×100/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherInfo?.weather[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windSpeed.innerText = weatherInfo?.wind?.speed;
    Humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;
}

// Event listener for "Grant Access" button
const grantAcessBtn = document.querySelector('[data-grantAccess]');
grantAcessBtn.addEventListener('click', getLocation);

// Get user's geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

// Handle user's geolocation
function showPosition(position) {
    const userCoordinate = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    // Store coordinates in session storage and fetch weather data
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinate));
    fetchUserWeatherInfo(userCoordinate);
}

// Event listener for search form submission
const searchInput = document.querySelector('[data-searchInput]');
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if (cityName === "") {
        return;
    } else {
        try {
            // Fetch weather data based on city name
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
            const data = await response.json();

            // Hide loader, show user info, and render weather data
            loadingScreen.classList.remove("active");
            userInfoContainer.classList.add("active");
            renderWeatherInfo(data);
        } catch (error) {
            // If error occurs, hide loader
            loadingScreen.classList.remove("active");
        }
    }
});

// async function fetchUserWeatherInfo(city)
// {
//        loadingScreen.classList.add("active");
//        userInfoContainer.classList.remove("active");
//        grantAccessContainer.classList.remove("active");
//        try{
//         const response = await fetch('https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API key}');
//         const data = await response.JSON();
//         loadingScreen.classList.add("active");
//         userInfoContainer.classList.add("active");
//         renderWeatherInfo(data);
//        }
//        catch(e)
//        {

//        }
// }