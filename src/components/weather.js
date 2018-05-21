import React, { Component } from 'react';
import WeatherController from './fetchRequest';

class Weather extends Component {
    state = {
        supported: true,
        lat: '',
        long: '',
        haveCoords: false,
        weatherData: {},
        weeklyForecast: [],
        currentDay: '',
    }

    componentDidMount() { 
        if(!navigator.geolocation) return this.setState({ supported: false });
        navigator.geolocation.getCurrentPosition((pos) => {

            let lat =  pos.coords.latitude;
            let long = pos.coords.longitude;
            this.setState({ lat: lat, long: long, haveCoords: true });
            
            
        }, (err) => {console.error(err)}, {enableHighAccuracy: true} );
        let today = new Date().getDate();
        this.setState({ currentDay: today });
    }

    render() {

        return (

            <WeatherController lat={this.state.lat} long={this.state.long} haveCoords={this.state.haveCoords}/>
        
        )
    }


}

export default Weather;