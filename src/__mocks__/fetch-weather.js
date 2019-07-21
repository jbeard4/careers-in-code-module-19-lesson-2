import forecastMock from '../__tests__/forecast.mock.json';

export function fetchWeatherForCurrentLocation (url) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve(forecastMock)
    );
  });
}
