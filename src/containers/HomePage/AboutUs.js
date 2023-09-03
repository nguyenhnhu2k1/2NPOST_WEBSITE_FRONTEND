import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../Header/HeaderNotLoggedIn';
import HomeFooter from '../Footer/HomeFooter';

class AboutUs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                hi
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
