import React, { Component } from 'react';
import $ from 'jquery';
import { key } from './apiKey';

class WeatherToday extends Component {

    state = {
        today: (localStorage.today !== null ? JSON.parse(localStorage.today) : []),
        fetchForcast: false,
    }

    componentDidUpdate() {
        if(this.props.getForcast === true && this.state.fetchForcast !== this.props.getForcast) {
            if(localStorage.today !== null) return;
            this.setState({ fetchForcast: this.props.getForcast});
            this.getToday();
        }
    }

    getToday = () => {
        $.ajax({
            url: `https://api.darksky.net/forecast/${key}/${this.props.lat},${this.props.long}?exlude=[minutely]?units=[uk2]`,
            dataType: 'JSONP',
            type: 'GET',
            success: function(r) {
                let today = r.currently;
                let unixConvert = new Date(today.time * 1000), day = unixConvert.getDay(), temp = today.temperature, summary = today.summary;
                switch(day) {
                    case 0: day = 'Sunday'; break;
                    case 1: day = 'Monday'; break;
                    case 2: day = 'Tuesday'; break;
                    case 3: day = 'Wednesday'; break;
                    case 4: day = 'Thursday'; break;
                    case 5: day = 'Friday'; break;
                    case 6: day = 'Saturday'; break;
                    default: break;
                }
                this.setState({ today: [{day: day, temp: temp, summary: summary}] });
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
                                <div className="weather-data col-xs-7 col-sm-6 col-lg-8">
                                    <p>{local}</p>
                                    <p>{today[0].summary}</p>                                    
                                </div>
                                <div className="location-data col-xs-5 col-sm-6 col-lg-4">
                                    {Math.round(today[0].temp)}
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