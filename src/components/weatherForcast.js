import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { key } from './apiKey';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.fetchWeather = this.fetchWeather.bind(this);
    }
    
    state = {
        weeklyForecast: (localStorage.forcast !== undefined ? JSON.parse(localStorage.forcast) : []),
        fetchForcast: false,
        currentDay: '',
        chosenDay: 0,
        lat: localStorage.coords !== undefined ? JSON.parse(localStorage.coords)[0] : this.props.lat,
        long: localStorage.coords !== undefined ? JSON.parse(localStorage.coords)[1] : this.props.long
    }

    componentDidMount() {
        let today = new Date().getDay();
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.setState({ currentDay: days[today] });
        this.pushToApp();
        setInterval(this.fetchWeather, 1000 * 300);
    }

    componentDidUpdate() {
        if(this.props.getForcast === true && this.state.fetchForcast !== this.props.getForcast) {
            if(localStorage.forcast !== undefined) return;
            this.setState({ fetchForcast: this.props.getForcast});
            this.fetchWeather();
        }

        
        if(this.props.shouldIUpdate === true) {
            this.fetchWeather();
            this.props.changeStatus();        
        }
    }

    componentWillReceiveProps() {
        
    }

    fetchWeather () {
        $.ajax({
            url: `https://api.darksky.net/forecast/${key}/${this.state.lat},${this.state.long}?exlude=[minutely]?units=[uk2]`,
            dataType: 'JSONP',
            type: 'GET',
            success: function(r) {
                let tempArr = [];
                    for(let day of r.daily.data) {
                        let unixConvert = new Date(day.time * 1000), days = unixConvert.getDay(), tempHigh = day.temperatureHigh;
                        let tempLow = day.temperatureLow, overview = day.summary, icon = day.icon, date = unixConvert.getDate();
                        let wind = day.windSpeed, humidity = day.humidity;
                        
                        switch(icon) {
                            case 'partly-cloudy-day': icon = '/climacons-master/Cloud-sun.svg'; break;
                            case 'rain': icon = '/climacons-master/cloud-rain.svg'; break;
                            case 'cloudy': icon = '/climacons-master/cloud.svg'; break;
                            case 'partly-cloudy-night' : icon = '/climacons-master/cloud-moon.svg'; break;
                            case 'clear-day': icon = '/climacons-master/sun.svg'; break;
                            default: icon = '/climacons-master/compass.svg';
                        }
                        switch(days) {
                            case 0: days = 'Sunday'; break;
                            case 1: days = 'Monday'; break;
                            case 2: days = 'Tuesday'; break;
                            case 3: days = 'Wednesday'; break;
                            case 4: days = 'Thursday'; break;
                            case 5: days = 'Friday'; break;
                            case 6: days = 'Saturday'; break;
                            default: days = 'Undefined'; 
                        }
    
                        tempArr.push({
                            dayOfWeek: days,
                            date: date,
                            high: tempHigh,
                            low: tempLow,
                            cast: overview,
                            wind: wind,
                            humidity: humidity,
                            iconType: icon
                        });
                    }
                    tempArr.pop();
                    tempArr.pop();
                    this.setState({ weeklyForecast: tempArr }, () => {
                        this.pushToApp();
                        localStorage.forcast = JSON.stringify(this.state.weeklyForecast);
                    });
                    this.props.changeText();
                }.bind(this),
                error: function (xhr, status, error) {
                    console.error(xhr, status, error);
            }
        });   
    }

    pushToApp = () => {
        if(this.state.weeklyForecast.length !== 0) {
            this.props.saveForcast(this.state.weeklyForecast);
        } else if( localStorage.forcast !== undefined ) {
            this.props.saveForcast(JSON.parse(localStorage.forcast));
        } else {
            return;
        }
    }

    handleClick = (e, index) => {
        this.props.saveIndex(index);
        $('html, body').animate({ scrollTop: 50 }, 'slow');
    }

    render() {

        return (

            <section className="weather-data-container">

            <article className="inner-weather-data container">
                {
                    this.state.supported === false ?
                    <h2>Your browser does not support geolocation</h2>
                    :
                    null
                }
                <div className="weather-results clearfix">
                {
                    this.state.weeklyForecast.length !== 0 && localStorage.forcast !== null ?

                    this.state.weeklyForecast.map( (obj, index) => (
                        <div className={`forcast-result col-xs-4 col-sm-2 col-lg-2 ${this.props.today === obj.date ? 'forcast-current-day' : ''}`} key={`sr-${index}`}>
                        <Link to={this.state.currentDay === obj.dayOfWeek ? '/' : `/${obj.dayOfWeek}`} onClick={(e) => this.handleClick(e, index)} >
                            <div key={`weekDay-${index}`}>
                                <h4 key={`day${index}`}>{obj.dayOfWeek.substring(0, 3)}</h4>
                            </div>
                            <div key={`ico-${index}`}>
                                <img src={obj.iconType} key={`img-${index}`} alt={obj.iconType} />
                            </div>
                            <div key={`temps-cast-${index}`}>
                                <p className="forcast-temp">{Math.round(obj.high)} / {Math.round(obj.low)}</p>
                                <p>{obj.cast}</p>
                            </div>
                        </Link>
                        </div>
                    ))
                    :
                    <p>Loading forcast...</p>
                }
                </div>
                
            </article>

        </section>
        
        );
    }

}

export default Weather;