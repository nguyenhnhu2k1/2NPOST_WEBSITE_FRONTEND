import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Introduce.scss';


class Introduce extends Component {

    render() {

        return (
            <React.Fragment>
                TEST
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

export default connect(mapStateToProps, mapDispatchToProps)(Introduce);
