import React, { Component } from 'react';
import $ from 'jquery';

class Weather extends Component {
    
    state = {
        weatherData: {},
        weeklyForecast: [],
        doOnce: false,
        fetchForcast: this.props.getForcast
    }

    componentWillReceiveProps() {
        console.log(this.props.getForcast)
    }  

    fetchWeather = () => {
        $.ajax({
            url: `https://api.darksky.net/forecast/d4c864a8c18bddde907e1454b383e71e/${this.props.lat},${this.props.long}?exlude=[minutely]?units=[uk2]`,
            dataType: 'JSONP',
            type: 'GET',
            success: function(r) {
                let tempArr = [];
                    for(let day of r.daily.data) {
                        let unixConvert = new Date(day.time * 1000), days = unixConvert.getDay(), tempHigh = day.temperatureHigh;
                        let tempLow = day.temperatureLow, overview = day.summary, icon = day.icon, date = unixConvert.getDate();
                        switch(icon) {
                            case 'partly-cloudy-day': icon = '/climacons-master/Cloud-sun.svg'; break;
                            case 'rain': icon = '/climacons-master/cloud-rain.svg'; break;
                            case 'cloudy': icon = '/climacons-master/cloud.svg'; break;
                            case 'partly-cloudy-night' : icon = '/climacons-master/cloud-moon.svg'; break;
                            default: icon = 'https://cdn1.iconfinder.com/data/icons/image-manipulations/100/13-512.png';
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
                            iconType: icon
                        });
                    }
                    tempArr.pop();
                    this.setState({ weeklyForecast: tempArr });
                    localStorage.forcast = JSON.stringify(this.state.weeklyForecast);
                    console.log( JSON.parse(localStorage.forcast) )
                }.bind(this),
                error: function (xhr, status, error) {
                    console.error(xhr, status, error);
            }
        });   
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
                <div className="weather-results">
                {
                    this.state.weeklyForecast.length !== 0 ?

                    this.state.weeklyForecast.map( (obj, index) => (
                        <div className={`forcast-result col-xs-4 col-sm-3 col-lg-2 ${this.props.today === obj.date ? 'forcast-current-day' : ''}`} key={`sr-${index}`}>
                            <div key={`weekDay-${index}`}>
                                <h4 key={`day${index}`} >{obj.dayOfWeek.substring(0, 3)}</h4>
                            </div>
                            <div key={`ico-${index}`}>
                                <img src={obj.iconType} alt='weather icon' key={`img-${index}`}/>
                            </div>
                            <div key={`temps-${index}`}>
                                <p key={`high-${index}`}>{Math.round(obj.high)} / {Math.round(obj.low)}</p>
                            </div>
                        </div>
                    ))
                    :
                    <p>Loading resutls...</p>
                }
                </div>
                
            </article>

        </section>
        
        );
    }

}

export default Weather;