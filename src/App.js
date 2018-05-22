import React, { Component } from 'react';
import logo from './logo.svg';
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

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

      <main className="main-content">

      <section className="weather-today">
        <WeatherToday lat={this.state.lat} long={this.state.long} getWeather={this.state.getForcast} />
      </section>

      <section className="weather-forcast">
        <Forcast lat={this.state.lat} long={this.state.long} getForcast={this.state.getForcast} today={this.state.currentDay} />      
      </section>

      </main>
      
      </div>
    );
  }
}

export default App;
