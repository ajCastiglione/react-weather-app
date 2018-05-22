import React, { Component } from 'react';

class WeatherToday extends Component {

    state = {
        today: JSON.parse(localStorage.forcast)
    }


    render() {
        return (
            <section className="today-selected-container">
                <p>Today / the selected day will show here. Going to utilize local storage so i dont have to send a ton of requests for the weather</p>

                <p> Current Day: {this.state.today[0].dayOfWeek} </p>
            </section>
        )
    }
}

export default WeatherToday;