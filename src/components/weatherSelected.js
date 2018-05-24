import React, { Component } from 'react';

class weatherSelected extends Component {

    
    render() {
        const { lat, long, forcast, day } = this.props;

        return (
            <section>
                <p>{`${lat} + ${long}`}</p>
                <p>{console.log(forcast[day])}</p>
            </section>
        )
    }
}

export default weatherSelected;