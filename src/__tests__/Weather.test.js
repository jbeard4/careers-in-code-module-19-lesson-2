// Link.react.test.js
import React from 'react';
import { WeatherComponent, WeatherContainer } from '../Weather';
import renderer from 'react-test-renderer';
import forecastMock from './forecast.mock.json';
jest.mock('../fetch-weather');


test('Test WeatherComponent render', () => {
  const component = renderer.create(
    <WeatherComponent forecast={forecastMock.properties.periods}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('Test WeatherContainer successful render', () => {
  const component = renderer.create(
    <WeatherContainer />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      resolve()
    }, 10);
  });
});
