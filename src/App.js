import logo from './logo.svg';
import './App.css';
import React from 'react';
import { GET_WEATHER_USING_LOCATION } from './networkingModule/api';
import { API_KEY } from './networkingModule/secrets';

class App extends React.Component {
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
      `${GET_WEATHER_USING_LOCATION}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    //convert the readable stream to json
    const jsData = await data.json();
    //consume json
    console.log(jsData);
  };

  render() {
    return (
      <div className="App">
        <h1>Hello world</h1>
      </div>
    );
  }
}

export default App;
