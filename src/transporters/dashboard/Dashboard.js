import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderTrans from '../header/Header';
import './Dashboard.scss'

class Dashboard extends Component {

    render() {
        return (
            <React.Fragment>
                <HeaderTrans />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
