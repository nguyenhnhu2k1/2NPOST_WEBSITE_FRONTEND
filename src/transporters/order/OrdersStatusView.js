import React, { Component } from 'react';
import { connect } from 'react-redux';

import boxImg from '../../assets/images/orders/box.png';

import AcceptBtn from './AcceptBtn';
import './OrdersStatusView.scss';
import { Link } from 'react-router-dom';

// trang hiển thị trạng thái đơn hàng
class OrdersStatusView extends Component {


    render() {
        let status = this.props.orderStatus;

        return (
            <React.Fragment>
                <div>
                    {status.map((value, index) => (
                        <div className='detail-component'>

                            <div className='component-1'>

                                <div className='left-component'>
                                    <span>Loại dịch vụ</span>
                                    <button className='chat-component'>
                                        <i className="fab fa-rocketchat"></i>
                                        <span>chat</span>
                                    </button>
                                </div>

                                <div className='right-component'>
                                    <div className='status-component'>
                                        <i className="fas fa-truck"></i>
                                        <span>Trạng thái đơn hàng</span>
                                    </div>
                                    <i className="fas fa-question-circle"></i>
                                </div>

                            </div>

                            <Link to={`/transporter/detail-orders/${value.id}`}>
                                <div className='component-2'>
                                    <img src={boxImg} alt='order' />

                                    <div className='info-component'>

                                        <div className='info-users'>
                                            <div className='info-sender'>
                                                <span className='text-info'>Thông Tin Người Gửi</span>
                                                <div className='name'>
                                                    <i className="fas fa-user icon-sender"></i>
                                                    Tên người gửi -  Số điện thoại
                                                </div>
                                                <div className='address'>
                                                    <i className="fas fa-map-marker-alt icon-sender"></i>
                                                    Địa chỉ người gửi
                                                </div>
                                            </div>

                                            <div className='info-receiver'>
                                                <span className='text-info'>Thông Tin Người Nhận</span>
                                                <div className='name'>
                                                    <i className="fas fa-user icon-receiver"></i>
                                                    Tên người nhận -  Số điện thoại
                                                </div>
                                                <div className='address'>
                                                    <i className="fas fa-map-marker-alt icon-receiver"></i>
                                                    Địa chỉ người nhận
                                                </div>
                                            </div>
                                        </div>

                                        <div className='info-orders'>
                                            <div className='quantity'>
                                                <i class="fas fa-box-open"></i>
                                                1x1
                                            </div>
                                            <div class="input-group mb-3 mt-3 note">
                                                <span class="input-group-text title-note">Ghi chú</span>
                                                <div class="form-control content-note">Ghi chú ở đây nè nghe</div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </Link>

                            <div className='component-3'>

                                <div className='left-component'>
                                    <span className='date-create'>Ngày tạo đơn: 01/01/2001</span>
                                </div>

                                <div className='right-component'>
                                    <span className='total'>
                                        <i class="fas fa-dollar-sign"></i>
                                        Thành tiền: <span className='price'>100.000VNĐ</span>
                                    </span>
                                </div>

                            </div>

                            <div className='component-4'>
                                <div className='left-component'>
                                    <span>Đơn hàng sẽ được giao trong <span className='hours'>48 giờ</span></span>
                                </div>
                                <div className='right-component'>
                                    <AcceptBtn nameAccept='Accept' nameCancle='Hủy Bỏ' />
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
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
