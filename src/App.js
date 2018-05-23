import React, { Component } from 'react';
import './App.css';
import WeatherToday from './components/weatherToday';
import Forcast from './components/weatherForcast';


class App extends Component {

  state = {
    supported: true,
    lat: '',
    long: '',
    getForcast: false
}

componentDidMount() { 
    if(!navigator.geolocation) return this.setState({ supported: false });
    navigator.geolocation.getCurrentPosition((pos) => {

        let lat =  pos.coords.latitude;
        let long = pos.coords.longitude;
        this.setState({ lat: lat, long: long });
        this.setState({ getForcast: true });
        
    }, (err) => {console.error(err)}, {enableHighAccuracy: true} );
    let today = new Date().getDate();
    this.setState({ currentDay: today });
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

        <WeatherToday lat={this.state.lat} long={this.state.long} getForcast={this.state.getForcast} />

      </header>

      <main className="main-content">

        <section className="weather-forcast">
          <Forcast lat={this.state.lat} long={this.state.long} getForcast={this.state.getForcast} today={this.state.currentDay} />      
        </section>

      </main>
      
      </div>
    );
  }
}

export default App;
