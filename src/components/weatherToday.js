import React, { Component } from 'react';

class WeatherToday extends Component {

    state = {
        today: JSON.parse(localStorage.forcast),
        icon: ''
    }

    componentDidMount() {
        let icon = this.state.today[0].iconType;
        this.setState({ icon: icon });
    }


    render() {
        console.log(this.state.today)
        return (
            <section className="today-selected-container">
                <div className="container">
                    <div className="col-xs-12 col-sm-6 col-lg-4">
                        {
                            this.state.icon !== '' ?
                            <object type="image/svg+xml" data={this.state.icon}>
                                not supported
                            </object>
                            :
                            <p>Icon Loading...</p>
                        }
                    </div>
                    <p> Current Day: {this.state.today[0].dayOfWeek} </p>
                </div>
            </section>
        )
    }
}

export default WeatherToday;