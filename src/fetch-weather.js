export function fetchWeatherForCurrentLocation(){
  return (new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })).then( position => {
    return fetch(`https://api.weather.gov/points/${position.coords.latitude},${position.coords.longitude}`)
  }).then( response => {
    return response.json();
  }).then(response => {
    return fetch(response.properties.forecast);
  }).then(response => {
    return response.json();
  });
}
