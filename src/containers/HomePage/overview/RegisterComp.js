import React, { Component } from 'react';
import { connect } from 'react-redux';

import './RegisterComp.scss';


class RegisterComp extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='register-comp-container'>
                    introduce
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComp);
