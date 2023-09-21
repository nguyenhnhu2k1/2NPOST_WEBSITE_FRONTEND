import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import OrdersStatusView from './OrdersStatusView';
import HeaderTrans from '../header/Header';
import './Order.scss'

class Order extends Component {

    render() {

        let showNav = this.props.showNav;
        return (
            <React.Fragment>

                {/* header  */}
                <HeaderTrans />

                {/* nội dung trang */}
                <div className='order'>

                    <div className={`order-component ${showNav ? '' : 'active-show-nav'}`}>
                        <h1 className='title-1-base'>QUẢN LÝ ĐƠN HÀNG</h1>

                        <div className='status-order-component'>
                            <div className='status-order'>
                                <div className=''>Tất cả</div>
                                <div className=''>Chờ xác nhận</div>
                                <div className=''>Chờ lấy hàng</div>
                                <div className=''>Tài xế đã nhận hàng</div>
                                <div className=''>Đơn hàng đang ở kho</div>
                                <div className=''>Đơn hàng đang giao</div>
                                <div className=''>Đơn hàng thành công</div>
                                <div className=''>Đã hủy</div>
                            </div>
                            <div>
                                <OrdersStatusView idStatus='nameStatus' />
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        showNav: state.app.showNav,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
