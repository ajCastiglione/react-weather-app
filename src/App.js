import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import WeatherToday from './components/weatherToday';
import Forcast from './components/weatherForcast';


class App extends Component {

  state = {
    supported: true,
    lat: '',
    long: '',
    getForcast: false,
    selectedDay: '',
    currentDay: ''
}

componentDidMount() { 
    if(!navigator.geolocation) return this.setState({ supported: false });
    navigator.geolocation.getCurrentPosition((pos) => {

        let lat =  pos.coords.latitude;
        let long = pos.coords.longitude;
        this.setState({ lat: lat, long: long });
        this.setState({ getForcast: true });
        
    }, (err) => {console.error(err)}, {enableHighAccuracy: true} );
    let today = new Date().getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.setState({ currentDay: days[today] });
    
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
          <WeatherToday lat={this.state.lat} long={this.state.long} getForcast={this.state.getForcast} />
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
