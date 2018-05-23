import React, { Component } from 'react';
import $ from 'jquery';

class WeatherToday extends Component {

    state = {
        today: (localStorage.today.length > 0 ? JSON.parse(localStorage.today) : []),
        fetchForcast: false,
    }

    componentDidUpdate() {
        if(this.props.getForcast === true && this.state.fetchForcast !== this.props.getForcast) {
            this.setState({ fetchForcast: this.props.getForcast});
            this.getToday();
        }
    }

    getToday = () => {
        $.ajax({
            url: `https://api.darksky.net/forecast/d4c864a8c18bddde907e1454b383e71e/${this.props.lat},${this.props.long}?exlude=[minutely]?units=[uk2]`,
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
        return (
            <section className="today-selected-container">
                <div className="container">
                    <div className="col-xs-12 col-sm-6 col-lg-4">
                        {
                            this.state.today.length > 0 ?
                            <p> Current Day: { this.state.today[0].day } </p>
                            :
                            <p>Loading day...</p>
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default WeatherToday;