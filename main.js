let searchInput = document.getElementById("search")
let searchBtn = document.getElementById("searchBtn")
let weatherData = [];

searchInput.addEventListener("input" , function(){
    let city =  searchInput.value
    console.log(city);
    getCity(city)    
})


searchBtn.addEventListener("input" , function(){
    let city =  searchInput.value
    console.log(city);
    getCity(city)    
})


async function getCity(city) {
    try {
        // Fetch weather data for 3 days
        let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=efd11146a36e401490405038240712&q=${city}&days=3`);
        weatherData = await res.json();
        console.log(weatherData);

        displayData();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData() {
    let cartona = ``;
    
    let days = weatherData.forecast.forecastday;

    //first card (Today)
    cartona += `
    <div class="col-md-4 rounded-5">
        <div class="head-card d-flex justify-content-between text-white align-items-center pt-2">
            <p class="ps-3 day">${new Date(days[0].date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <p class="pe-3 month">${new Date(days[0].date).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</p>
        </div>

        <div class="body-card text-white">
            <p class="country pt-5 ps-3">${weatherData.location.name}</p>
            <p class="temp ms-2">${days[0].day.avgtemp_c}°C</p>
            <img src="${days[0].day.condition.icon}" class="w-25 ms-3" alt="${days[0].day.condition.text}">
            <span class="d-block ps-3 weather-status">${days[0].day.condition.text}</span>

            <div class="icons-weather d-flex pt-3 pb-4 ps-3">
                <div class="pe-3">
                    <img src="weather-imgs/IMage4.png" class="w-25" alt="umbrella">
                    <span>${days[0].day.daily_chance_of_rain}%</span>
                </div>
                <div class="pe-3">
                    <img src="weather-imgs/IMage5.png" class="w-25" alt="wind">
                    <span>${days[0].day.maxwind_kph} km/h</span>
                </div>
                <div class="pe-3">
                    <img src="weather-imgs/IMage6.png" class="w-15" alt="compass">
                    <span>Humidity: ${days[0].day.avghumidity}%</span>
                </div>
            </div>
        </div>
    </div>
    `;

    // second card (Tomorrow)
    cartona += `
    <div class="col-md-4 rounded-5">
        <div class="head-card2 text-center text-white pt-2 d-flex align-items-center justify-content-center">
            <p class="ps-3 day">${new Date(days[1].date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
        </div>

        <div class="body-card2 pb-5 text-center text-white">
            <img src="${days[1].day.condition.icon}" class="pt-5" alt="${days[1].day.condition.text}">
            <p class="temp2">${days[1].day.avgtemp_c}°C</p>
            <p class="low-temp">${days[1].day.mintemp_c}°C</p>
            <span class="weather-status">${days[1].day.condition.text}</span>
        </div>
    </div>
    `;

    // third card (Day After Tomorrow)
    cartona += `
    <div class="col-md-4 rounded-5">
        <div class="head-card text-center text-white pt-2 d-flex align-items-center justify-content-center">
            <p class="ps-3 day">${new Date(days[2].date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
        </div>

        <div class="body-card3 pb-5 text-center text-white">
            <img src="${days[2].day.condition.icon}" class="pt-5" alt="${days[2].day.condition.text}">
            <p class="temp2">${days[2].day.avgtemp_c}°C</p>
            <p class="low-temp">${days[2].day.mintemp_c}°C</p>
            <span class="weather-status">${days[2].day.condition.text}</span>
        </div>
    </div>
    `;

    // Inject generated HTML into the DOM
    document.getElementById("rowData").innerHTML = cartona;
}

// Call the function to fetch and display weather data
getCity("Cairo");


