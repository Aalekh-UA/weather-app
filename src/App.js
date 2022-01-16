import logo from './logo.svg';
import './App.css';
import React from 'react';
import { GET_WEATHER_USING_LOCATION } from './networkingModule/api';
import { API_KEY } from './networkingModule/secrets';
import WeatherCard from './components/WeatherCard';

class App extends React.Component {
  //state to store data
  state = {
    weatherData: null,
  };

  componentDidMount() {
    this.checkAndGetGeoLocation();
  }

  checkAndGetGeoLocation = () => {
    //first check if laptop supports geolocation
    if (navigator.geolocation) {
      //get the geolocation
      navigator.geolocation.getCurrentPosition((position) => {
        //nullability check
        if (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeatherUsingLocationParams(lat, lon);
        }
      });
    } else {
      //do error case handling
      console.log('location feature unavailable');
    }
  };

  getWeatherUsingLocationParams = async (lat, lon) => {
    //fetch data based on lat and long provided
    const data = await fetch(
      `${GET_WEATHER_USING_LOCATION}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    //convert the readable stream to json
    const jsData = await data.json();
    //consume json
    this.updateWeatherData(jsData);
    console.log(jsData);
  };

  updateWeatherData = (data) => {
    //update state with latest data
    this.setState({
      weatherData: data,
    });
  };

  render() {
    const { weatherData } = this.state;
    return (
      <div className="App">
        {weatherData ? <WeatherCard data={weatherData} /> : null}
      </div>
    );
  }
}

export default App;
