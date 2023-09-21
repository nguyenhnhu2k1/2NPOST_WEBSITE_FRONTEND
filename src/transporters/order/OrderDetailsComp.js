import React, { Component } from 'react';
import { connect } from 'react-redux';


class OrderDetailsComp extends Component {


    render() {

        return (
            <React.Fragment>
                OrderDetailsComp
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsComp);
