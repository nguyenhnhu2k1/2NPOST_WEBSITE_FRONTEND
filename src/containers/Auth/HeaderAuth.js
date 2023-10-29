/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './HeaderAuth.scss';
import logoIMG from '../../assets/images/logo/logo.png'


class HeaderAuth extends Component {

    render() {
        return (
            <div className='logo-container'>
                <div className='logo-icon'>
                    <Link to='/home'>
                        <img src={logoIMG} alt='logo' />
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuth);
