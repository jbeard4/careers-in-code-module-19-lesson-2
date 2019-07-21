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
    fetch('https://api.weather.gov/points/43.2532,-76.8507').then( response => {
      return response.json();
    }).then(response => {
      return fetch(response.properties.forecast);
    }).then(response => {
      return response.json();
    }).then(forecast => {
      this.setState({ forecast :  forecast.properties.periods })
    });
  }

  render(){
    return <WeatherComponent forecast={this.state.forecast}/>;
  } 
}
