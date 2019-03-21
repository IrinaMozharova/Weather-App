let appId = "d3db379dc15c42b3ac8e0050436e510d";
let units = "metric";
let searchMethod;

function getSearchMethod(searchTerm) {
  if(searchTerm.legth === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
    searchMethod = "zip";
  else
    searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then((result) => {
    return result.json();
  }).then((result) => {
     init(result);
  });
}

function init(resultFromServer) {
  switch (resultFromServer.weather[0].main){
    case "Clear":
      document.body.style.backgroundImage = "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')";
      break;
      
    case "Clouds":
      document.body.style.backgroundImage = "url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')";
      break;
      
    case "Rain":
      case "Drizzle":
      case "Mist":
      document.body.style.backgroundImage = "url('https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')";
      break;
      
    case "Thunderstorm":
      document.body.style.backgroundImage = "url('https://images.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')";
      break;
      
    case "Snow":
      document.body.style.backgroundImage = "url('https://images.pexels.com/photos/289649/pexels-photo-289649.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')";
      break;
      
    default:
      break;
  }
  
  let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
  
  let temperatureElement = document.getElementById("temperature");
  
  let humidityElement = document.getElementById("humidity");
  
  let windSpeedElement = document.getElementById("windSpeed");
  
  let cityHeader = document.getElementById("cityHeader");
  
  let weatherIcon = document.getElementById("documentIconImg");
  
  weatherIcon.src = "https://openweathermap.org/img/w/" + resultFromServer.weather[0].icon + ".png";
  
  let resultDescription = resultFromServer.weather[0].description;
  
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  
  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176";
  
  windSpeedElement.innerHTML = "Winds at " + Math.floor(resultFromServer.wind.speed) + " m/s";
  
  cityHeader.innerHTML = resultFromServer.name;
  
  humidityElement.innerHTML = "Humidity levels at " + resultFromServer.main.humidity + "%";
  
  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;
  
  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
  weatherContainer.style.visibility = "visible";
}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm)
    searchWeather(searchTerm);
});

