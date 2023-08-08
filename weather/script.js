async function showWeather() {
    const API_key = "35583b76c99f48d0abcb2f288d7df0da";
    let city = "faridabad";

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
        const response = await fetch(url);
        const data = await response.json();
        
        const temperature = data.main.temp; // Accessing the temperature from the 'main' object
        
        console.log('Temperature:', temperature);
        
        let newPara = document.createElement('p');
        newPara.textContent = `Temperature: ${temperature-273.15} C`; // Display temperature in Kelvin
        document.body.appendChild(newPara); // Append the new element to the DOM
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

showWeather();
