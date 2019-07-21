import React from 'react';

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
    (new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })).then( position => {
      return fetch(`https://api.weather.gov/points/${position.coords.latitude},${position.coords.longitude}`)
    }).then( response => {
      return response.json();
    }).then(response => {
      return fetch(response.properties.forecast);
    }).then(response => {
      return response.json();
    }).then(forecast => {
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
