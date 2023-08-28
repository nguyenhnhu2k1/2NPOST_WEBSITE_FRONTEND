import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SearchComp.scss';


class SearchComp extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='search-comp-container'>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchComp);
