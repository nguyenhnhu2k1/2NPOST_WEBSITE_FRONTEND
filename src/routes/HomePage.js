import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from '../containers/HomePage/Home';
import AboutUs from '../containers/HomePage/AboutUs';
import ServicePage from '../containers/HomePage/ServicePage';

class HomePage extends Component {
    render() {
        return (
            <div className="homepage">
                <div className="homepage-list">
                    <Switch>
                        <Route path="/home" exact component={Home} />
                        <Route path="/home/about_us" exact component={AboutUs} />
                        <Route path="/home/service" exact component={ServicePage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
