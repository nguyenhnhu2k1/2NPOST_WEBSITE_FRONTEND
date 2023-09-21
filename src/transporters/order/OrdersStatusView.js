import React, { Component } from 'react';
import { connect } from 'react-redux';


class OrdersStatusView extends Component {


    render() {

        return (
            <React.Fragment>
                <div>{this.props.nameStatus}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersStatusView);
