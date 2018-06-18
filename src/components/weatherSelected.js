import React, { Component } from 'react';

class weatherSelected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forcast: props.forcast.length <= 0 ? JSON.parse(sessionStorage.forcast) : props.forcast,
            index: props.day === null ? Number(sessionStorage.chosenDay) : props.day,
        }
    }

    componentDidUpdate() {
        if(this.props.day !== this.state.index && this.props.day !== null) {
            this.setState({ index: this.props.day })
        }
    }
    
    render() {
        const { forcast, index } = this.state;
        const local = this.props.location;
        return (
            <section className="today-container">
                <div className="container">
                        {
                            forcast.length !== 0 ?
                            <div className="today-content col-xs-12">
                                <div className="inner-today-content">
                                    <div className="weather-data">
                                        <p className="weather-single-temp">{Math.round(forcast[index].high)} <sup>&deg;F</sup></p>
                                        <p className="weather-single-summary">{forcast[index].cast}</p>
                                        <div className="weather-single-humidity">
                                            <p>humidity</p>
                                            <p>{Math.round(forcast[index].humidity * 100)}%</p>
                                        </div>
                                        <div className="weather-single-wind">
                                            <p>wind</p>
                                            <p>{forcast[index].wind} MPH</p>
                                        </div>
                                    </div>
                                    <div className="location-data">
                                        <p className="weather-single-location">{local}</p>
                                        <p className="weather-single-day">{ forcast[index].dayOfWeek }</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <p>Loading...</p>
                            
                        }
                </div>
            </section>
        )
    }
}

export default weatherSelected;