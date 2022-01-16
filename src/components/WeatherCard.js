import '../App.css';
import React from 'react';
import moment from 'moment';

class WeatherCard extends React.Component {
  //get type of weather
  getTypeOfWeather = () => {
    const { data } = this.props;
    const weatherDec = data.weather[0].main;
    return weatherDec ?? '';
  };

  render() {
    // destructure data
    const { data } = this.props;
    return (
      <div className="App" id="roundedCard">
        <div id="main">
          <h4>{`City: ${data.name}`}</h4>
        </div>

        <div id="main">
          <h4>
            {moment().format('dddd')} {moment().format('LLLL')}
          </h4>
          <h4>{this.getTypeOfWeather()}</h4>
        </div>

        <div id="main">
          <h4>{`Temp: ${data.main.temp} celcius`}</h4>
          <h4>{`Humidity: ${data.main.humidity}`}</h4>
        </div>
        <div id="main">
          <h4>{`Visibility: ${data.visibility}`}</h4>
        </div>
        <div id="main">
          <h4>{`Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleString(
            'en-IN'
          )}`}</h4>
          <h4>{`Sunset: ${new Date(data.sys.sunset * 1000).toLocaleString(
            'en-IN'
          )}`}</h4>
        </div>
      </div>
    );
  }
}

export default WeatherCard;
