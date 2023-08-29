import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ServiceComp.scss';


class ServiceComp extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='service-comp-container'>
                    service - Nhut chinh sua ne
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceComp);
