import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ServicePage.scss';


class ServicePage extends Component {

    render() {

        return (
            <React.Fragment>
                <div >
                    viet di
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);
