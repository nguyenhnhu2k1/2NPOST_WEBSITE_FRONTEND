import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import { getOrdersByStatus } from '../store/actions/userActions';

import Dashboard from '../transporters/dashboard/Dashboard';
import StoreManager from '../transporters/store-manager/StoreManager';
import Driver from '../transporters/driver/Driver';
import Vehicle from '../transporters/vehicle/Vehicle';
import Order from '../transporters/order/Order'
import OrderDetailsComp from '../transporters/order/OrderDetailsComp';

class Transporter extends Component {

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.getOrders(1);
        }
    }

    render() {

        return (
            <Switch>
                <Route path="/transporter/dasboard" component={Dashboard} />
                <Route path="/transporter/store-manager" component={StoreManager} />
                <Route path="/transporter/driver" component={Driver} />
                <Route path="/transporter/vehicle" component={Vehicle} />
                <Route path="/transporter/orders" component={Order} />
                <Route path="/transporter/detail-orders/:id" component={OrderDetailsComp} />
                <Route path="/transporter" render={() => <Redirect to="/transporter/dasboard" />} />
            </Switch>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        OS0: state.user.OS0,
        TS0: state.user.TS0,
        TS1: state.user.TS1,
        TS2: state.user.TS2,
        TS3: state.user.TS3,
        TS4: state.user.TS4,
        OS2: state.user.OS2,
        orders: state.user.orders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (idTrans) => dispatch(getOrdersByStatus(idTrans)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transporter);
