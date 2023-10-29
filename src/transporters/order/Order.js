import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import DateRangePickerValue from './DateRangePickerValue';
import OrdersStatusView from './OrdersStatusView';
import HeaderTrans from '../header/Header';
import './Order.scss'

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatus: 'orders',
        }
    }

    changeOrderStatus = (orderStatus) => {
        this.setState({
            orderStatus: orderStatus,
        })
    }

    render() {

        let showNav = this.props.showNav;
        let { orders, OS0, TS0, TS1, TS2, TS3, TS4, OS2 } = this.props;
        const { orderStatus } = this.state;
        return (
            <React.Fragment>

                {/* header  */}
                <HeaderTrans />

                {/* nội dung trang */}
                <div className='order'>

                    <div className={`order-component ${showNav ? '' : 'active-show-nav'}`}>
                        <h1 className='title-1-base'>QUẢN LÝ ĐƠN HÀNG</h1>

                        <div className='status-order-component'>

                            {/* trạng thái đơn hàng */}
                            <div className='status-order'>
                                <div className={orderStatus === 'orders' ? 'action' : ''} onClick={() => this.changeOrderStatus('orders')}>Tất cả</div>
                                <div className={orderStatus === 'OS0' ? 'action' : ''} onClick={() => this.changeOrderStatus('OS0')}>Chờ xác nhận</div>
                                <div className={orderStatus === 'TS1' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS1')}>Chờ lấy hàng</div>
                                <div className={orderStatus === 'TS2' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS2')}>Tài xế đã nhận hàng</div>
                                <div className={orderStatus === 'TS3' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS3')}>Đơn hàng đang ở kho</div>
                                <div className={orderStatus === 'TS4' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS4')}>Đơn hàng đang giao</div>
                                <div className={orderStatus === 'TS5' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS5')}>Đơn hàng thành công</div>
                                <div className={orderStatus === 'OS2' ? 'action' : ''} onClick={() => this.changeOrderStatus('OS2')}>Đã hủy</div>
                            </div>

                            {/* tìm kiếm + lọc */}
                            <div className='search-filter-component'>
                                <div className='search'>
                                    <div className="input-group mb-3">
                                        <select className='input-group-text' id='search'>
                                            <option value="1">Mã đơn</option>
                                            <option value="2">Tên khách hàng</option>
                                        </select>
                                        <input type="text" className="form-control" placeholder="Nhập nội dung cần tìm" aria-describedby="search" />
                                    </div>
                                </div>
                                <div className='filter-by-service'>
                                    <select className="form-select">
                                        <option defaultValue hidden>Chọn loại dịch vụ</option>
                                        <option value="1">Hỏa tốc nội thành</option>
                                        <option value="2">Hỏa tốc ngoại thành</option>
                                        <option value="3">Tiêu chuẩn ngoại thành</option>
                                    </select>
                                </div>
                                <div className='filter-by-date'>
                                    <DateRangePickerValue />
                                </div>
                            </div>

                            {/* hiển thị đơn hàng */}
                            <div>
                                {this.state.orderStatus === 'orders' && <OrdersStatusView orderStatus={orders} />}
                                {this.state.orderStatus === 'OS0' && <OrdersStatusView orderStatus={OS0} />}
                                {this.state.orderStatus === 'TS1' && <OrdersStatusView orderStatus={TS0} />}
                                {this.state.orderStatus === 'TS2' && <OrdersStatusView orderStatus={TS1} />}
                                {this.state.orderStatus === 'TS3' && <OrdersStatusView orderStatus={TS2} />}
                                {this.state.orderStatus === 'TS4' && <OrdersStatusView orderStatus={TS3} />}
                                {this.state.orderStatus === 'TS5' && <OrdersStatusView orderStatus={TS4} />}
                                {this.state.orderStatus === 'OS2' && <OrdersStatusView orderStatus={OS2} />}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
