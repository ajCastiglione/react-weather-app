import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import WeatherToday from './components/weatherToday';
import Forcast from './components/weatherForcast';
import WeatherSelected from './components/weatherSelected';

class App extends Component {

  state = {
    supported: true,
    lat: '',
    long: '',
    getForcast: false,
    currentDay: '',
    location: (sessionStorage.currentLocation !== null ? sessionStorage.currentLocation : 'locating...'),
    savedForcast: [],
    selectedDayIndex: null,
    updateWeather: false,
    showUpdating: false,
}

componentDidMount() { 
    if(!navigator.geolocation) return this.setState({ supported: false });
    navigator.geolocation.getCurrentPosition((pos) => {

        let lat =  pos.coords.latitude;
        let long = pos.coords.longitude;
        this.setState({ lat: lat, long: long }, () => {
          sessionStorage.coords = JSON.stringify([this.state.lat, this.state.long]);
          this.setState({ getForcast: true }, () => {
            this.fetchLocation();
          });
        });
        
        
        
    }, (err) => {console.error(err)}, {enableHighAccuracy: true} );
    let today = new Date().getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.setState({ currentDay: days[today] });
    
}

fetchLocation = () => {
  let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=", key = "&key=AIzaSyAGUlxBFrsJbst5nEvwx3QfNOomE8Csrjc";
  fetch(`${url}${this.state.lat},${this.state.long}${key}`)
  .then(res => {return res.json();})
  .then( data => {
    let specific = data.results[0].address_components[3];
    let general = data.results[0].address_components[2];

    if(specific) {
      this.setState({ location: specific.long_name }, () => {
        sessionStorage.currentLocation = this.state.location;
      });
      
    } else {
      this.setState({ location: general.long_name }, () => {
        sessionStorage.currentLocation = this.state.location;
      });      
    }
  });
}

saveForcast = (f) => {
  this.setState({ savedForcast: f });
}
saveIndex = (index) => {
  this.setState({ selectedDayIndex: index }, () => {
    sessionStorage.chosenDay = this.state.selectedDayIndex;
  });
}
updateCurrentWeather = () => {
  this.setState({ updateWeather: !this.state.updateWeather });
  this.setState({ showUpdating: true });  
}
successfullUpdate = () => {
  this.setState({ showUpdating: false });
}

  render() {
    return (
      <div className="App">

      <header className="weather-today">

        <div className="top-header">
          <div className="container">
            <h1>React Weather App</h1>
            <div className='fetch-weather-btn'>
              <button onClick={this.updateCurrentWeather}>{ this.state.showUpdating === false ? 'Update Weather' : 'Updating...' }</button>
            </div>
          </div>
        </div>

        <Route exact path='/' render={() => (
          <WeatherToday 
          lat={this.state.lat} 
          long={this.state.long} 
          getForcast={this.state.getForcast} 
          location={this.state.location}
          changeStatus={this.updateCurrentWeather}
          shouldIUpdate={this.state.updateWeather}
          changeText={this.successfullUpdate}
          />
        )}/>

        <Route path='/:day' render={() => (
          <WeatherSelected 
          lat={this.state.lat} 
          long={this.state.long} 
          location={this.state.location} 
          forcast={this.state.savedForcast} 
          day={this.state.selectedDayIndex} 
          />
        )}/>

      </header>

      <main className="main-content">

        <section className="weather-forcast">
          <Forcast 
          lat={this.state.lat} 
          long={this.state.long} 
          getForcast={this.state.getForcast} 
          today={this.state.currentDay} 
          saveForcast={this.saveForcast} 
          saveIndex={this.saveIndex}
          changeStatus={this.updateCurrentWeather}
          shouldIUpdate={this.state.updateWeather}
          changeText={this.successfullUpdate}
          />      
        </section>

      </main>
      
      </div>
    );
  }
}

export default App;
