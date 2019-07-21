import React from 'react';
import { fetchWeatherForCurrentLocation } from './fetch-weather';

const weatherRowComponents = [
  ({name}) => <td>{name}</td>,
  ({isDaytime}) => <td>{isDaytime}</td>,
  ({temperature, temperatureUnit}) => <td>{temperature}&deg;{temperatureUnit}</td>,
  ({temperatureTrend}) => <td>{temperatureTrend}</td>,
  ({windSpeed}) => <td>{windSpeed}</td>,
  ({windDirection}) => <td>{windDirection}</td>,
  ({shortForecast, icon}) => <td><img alt={shortForecast} src={icon}/></td>,
  ({shortForecast}) => <td>{shortForecast}</td>,
  ({detailedForecast}) => <td>{detailedForecast}</td>
];

export function WeatherComponent({forecast}){
  return forecast ? 
    <table>
      <tbody>
        {
          weatherRowComponents.map( (C, i) => <tr key={i}>
              {
                forecast.map( period => <C key={period.name} {...period}/> )
              }
            </tr>
          )
        }
      </tbody>
    </table>:
    <p>Loading forecast</p>;
}


export class WeatherContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {forecast : null};
    fetchWeatherForCurrentLocation().then(forecast => {
      this.setState({ forecast :  forecast.properties.periods })
    }).catch(e => {
      this.setState({ error : e })
    });
  }

  render(){
    return this.state.error ? 
      <div>Error loading weather: {this.state.error.message}</div> :
      <WeatherComponent forecast={this.state.forecast}/>;
  } 
}
