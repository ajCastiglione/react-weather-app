import React, { Component } from 'react';
import $ from 'jquery';
import { key } from './apiKey';

class WeatherToday extends Component {

    state = {
        today: (localStorage.today !== undefined ? JSON.parse(localStorage.today) : []),
        fetchForcast: false,
    }

    componentDidMount() {
        setInterval(this.getToday, 1000 * 300);
    }

    componentDidUpdate() {
        if(this.props.getForcast === true && this.state.fetchForcast !== this.props.getForcast) {
            if(localStorage.today !== undefined) return;
            this.setState({ fetchForcast: this.props.getForcast});
            this.getToday();
        }
    }

    getToday = () => {
        $.ajax({
            url: `https://api.darksky.net/forecast/${key}/${this.props.lat},${this.props.long}?exlude=minutely?units=uk2`,
            dataType: 'JSONP',
            type: 'GET',
            success: function(r) {
                let today = r.currently;
                let unixConvert = new Date(today.time * 1000), day = unixConvert.getDay(), temp = today.temperature, summary = today.summary, wind = today.windSpeed, humidity = today.humidity;
                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

                this.setState({ today: [{day: days[day], temp: temp, summary: summary, wind: wind, humidity: humidity}] });
                localStorage.today = JSON.stringify(this.state.today);
            }.bind(this),
            error: function (xhr, status, error) {
                console.error(xhr, status, error);
            }
        });
    }


    render() {
        const local = this.props.location;
        const today = this.state.today;
        return (
            <section className="today-container">
                <div className="container">
                        {
                            this.state.today.length !== 0 && localStorage.today !== null ?
                            <div className="today-content col-xs-12">
                                <div className="inner-today-content">
                                    <div className="weather-data">
                                        <p className="weather-single-temp">{Math.round(today[0].temp)} <sup>&deg;F</sup></p>
                                        <p className="weather-single-summary">{today[0].summary}</p>
                                        <div className="weather-single-humidity">
                                            <p>humidity</p>
                                            <p>{today[0].humidity * 100}%</p>
                                        </div>
                                        <div className="weather-single-wind">
                                            <p>wind</p>
                                            <p>{today[0].wind} MPH</p>
                                        </div>
                                    </div>
                                    <div className="location-data">
                                        <p className="weather-single-location">{local}</p>
                                        <p className="weather-single-day">{ today[0].day }</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <p>Loading... {this.getToday}</p>
                            
                        }
                </div>
            </section>
        )
    }
}

export default WeatherToday;