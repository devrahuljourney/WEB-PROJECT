const userTab = document.querySelector([data-userWeather]);
const searchTab = document.querySelector([searchWeather]);
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector([data-serachForm]);
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


let currentTab = userTab;
const API_KEY = "35583b76c99f48d0abcb2f288d7df0da";
currentTab.classList.add("current-tab");

// switching tab
userTab.addEventListener("click",() => {
    //pass click tab input
    switchTab(userTab)
});
searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

function switchTab(clickedTab)
{
   if(clickedTab != currentTab)
   {
      currentTab.classList.remove("current-tab");
      currentTab = clickedTab;
      clickedTab.classList.add("current-tab");
   }
}
