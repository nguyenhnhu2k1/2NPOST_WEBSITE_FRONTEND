import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss'


class HomeFooter extends Component {

    render() {
        return (
            <div className='footer-container'>
                <div className='footer-information'>
                    &copy; Booking Care. More information, please visit my youtube channer.
                    &rarr; <a target='_blank' href='https://www.youtube.com/playlist?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI'>Click here</a> &larr;
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
