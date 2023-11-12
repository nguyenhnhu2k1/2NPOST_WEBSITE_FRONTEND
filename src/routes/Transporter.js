import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import {
    getOrdersByStatus, GetVehicleByIdTransporter, GetServiceOfTransporter,
    GetAllDriverOfTransporter
} from '../store/actions/userActions';

import Dashboard from '../transporters/dashboard/Dashboard';
import StoreManager from '../transporters/store-manager/StoreManager';
import Driver from '../transporters/driver/Driver';
import Vehicle from '../transporters/vehicle/Vehicle';
import Order from '../transporters/order/Order'
import OrderDetailsComp from '../transporters/order/OrderDetailsComp';

class Transporter extends Component {

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.getOrders(this.props.userInfo.idTransporter);
            this.props.getVehicles(this.props.userInfo.idTransporter);
            this.props.getServiceOfTransporter(this.props.userInfo.idTransporter);
            // this.props.getScopeOfTransporter(this.props.userInfo.idTransporter);
            this.props.getAllDriverOfTransporter(this.props.userInfo.idTransporter);
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (idTrans) => dispatch(getOrdersByStatus(idTrans)),
        getVehicles: (idTrans) => dispatch(GetVehicleByIdTransporter(idTrans)),
        getAllDriverOfTransporter: (idTrans) => dispatch(GetAllDriverOfTransporter(idTrans)),
        getServiceOfTransporter: (idTrans) => dispatch(GetServiceOfTransporter(idTrans)),
        // getScopeOfTransporter: (idTrans) => dispatch(GetScopeOfTransporter(idTrans)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transporter);
