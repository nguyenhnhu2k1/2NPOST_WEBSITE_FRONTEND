/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Link } from 'react-router-dom';
import * as actions from "../../store/actions";

import './HeaderAuth.scss';


class HeaderAuth extends Component {

    render() {
        return (
            <div className='logo-container'>
                <div className='logo-icon'>
                    <Link to='/home'>
                        <div className='logo'>
                        </div>
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
