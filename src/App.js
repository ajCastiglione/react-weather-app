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
    selectedDay: '',
    currentDay: '',
    location: localStorage.currentLocation !== null ? localStorage.currentLocation : 'locating...'
}

componentDidMount() { 
    if(!navigator.geolocation) return this.setState({ supported: false });
    navigator.geolocation.getCurrentPosition((pos) => {

        let lat =  pos.coords.latitude;
        let long = pos.coords.longitude;
        this.setState({ lat: lat, long: long });
        this.setState({ getForcast: true });
        this.fetchLocation();
        
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
      this.setState({ location: specific.long_name });
      localStorage.currentLocation = this.state.location;
    } else {
      this.setState({ location: general.long_name });
      localStorage.currentLocation = this.state.location;
    }
  });
}

changeSelectedDay = (chosenDay) => {
  console.log(chosenDay);
  this.setState({ selectedDay: chosenDay });
}

  render() {
    return (
      <div className="App">

      <header className="weather-today">

        <div className="top-header">
          <div className="container">
            <h1>React Weather App</h1>
          </div>
        </div>

        <Route exact path='/' render={() => (
          <WeatherToday lat={this.state.lat} long={this.state.long} getForcast={this.state.getForcast} location={this.state.location} />
        )}/>

        <Route path='/:day' render={() => (
          <WeatherSelected lat={this.state.lat} long={this.state.long}/>
        )}/>

      </header>

      <main className="main-content">

        <section className="weather-forcast">
          <Forcast lat={this.state.lat} long={this.state.long} getForcast={this.state.getForcast} today={this.state.currentDay} selectDay={this.changeSelectedDay} />      
        </section>

      </main>
      
      </div>
    );
  }
}

export default App;
