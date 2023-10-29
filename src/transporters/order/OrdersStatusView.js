import React, { Component } from 'react';
import { connect } from 'react-redux';

import boxImg from '../../assets/images/orders/box.png';

import AcceptBtn from './AcceptBtn';
import './OrdersStatusView.scss';
import { Link } from 'react-router-dom';

// trang hiển thị trạng thái đơn hàng
class OrdersStatusView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepAcceptBtn: ''
            // OS0: null,
            // TS0: null,
            // TS1: null,
            // TS2: null,
            // TS3: null,
            // TS4: null,
            // OS2: null,
            // orders: null,
        }
    }


    formatDDMMYYYY = (inputDateString) => {
        // Chuyển đổi thành đối tượng Date
        const date = new Date(inputDateString);
        // Lấy ngày, tháng, năm
        const day = date.getDate();
        const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 nên cần cộng thêm 1.
        const year = date.getFullYear();

        // Tạo định dạng "dd/MM/yyyy"
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        return formattedDate;
    }

    updateNameAccept = (status) => {
        let nameAccept = '';
        let step = '';
        if (status === 'OS0') {
            nameAccept = 'Nhận đơn';
            step = 'TS0';
        }
        if (status === 'TS0') {
            nameAccept = 'Đã lấy hàng';
            step = 'TS1';
        }
        if (status === 'TS1') {
            nameAccept = 'Đã về kho';
            step = 'TS2';
        }
        if (status === 'TS2') {
            nameAccept = 'Giao Hàng';
            step = 'TS3';
        }
        if (status === 'TS3') {
            nameAccept = 'Thành công';
        }
        if (status === 'TS4' || status === 'OS2') {
            nameAccept = 'Xem chi tiết';
        }
        // this.setState({
        //     stepAcceptBtn: step
        // })
        return nameAccept;
    }

    render() {
        let status = this.props.orderStatus;
        return (
            <React.Fragment>
                <div>
                    {status && status.map((value, index) =>
                        <div className='detail-component' key={index}>

                            <div className='component-1'>

                                <div className='left-component'>
                                    <span>{value.keyServiceAllCode.valueVi}</span>
                                    <button className='chat-component'>
                                        <i className="fab fa-rocketchat"></i>
                                        <span>chat</span>
                                    </button>
                                </div>

                                <div className='right-component'>
                                    <div className='status-component'>
                                        <i className="fas fa-truck"></i>
                                        <span>{value.keyOrderStatusAllCode.valueVi}</span>
                                    </div>
                                    <i className="fas fa-question-circle"></i>
                                </div>

                            </div>

                            <Link to={`/transporter/detail-orders/${value.id}`}>
                                <div className='component-2'>
                                    <img src={value.image ? process.env.REACT_APP_BACKEND_URL + value.image : boxImg} alt='order' />

                                    <div className='info-component'>

                                        <div className='info-users'>
                                            <div className='info-sender'>
                                                <span className='text-info'>Thông Tin Người Gửi</span>
                                                <div className='name'>
                                                    <i className="fas fa-user icon-sender"></i>
                                                    {value.senderName} -  {value.senderPhone}
                                                </div>
                                                <div className='address'>
                                                    <i className="fas fa-map-marker-alt icon-sender"></i>
                                                    {value.senderAddress}
                                                </div>
                                            </div>

                                            <div className='info-receiver'>
                                                <span className='text-info'>Thông Tin Người Nhận</span>
                                                <div className='name'>
                                                    <i className="fas fa-user icon-receiver"></i>
                                                    {value.recieverName} -  {value.recieverPhone}
                                                </div>
                                                <div className='address'>
                                                    <i className="fas fa-map-marker-alt icon-receiver"></i>
                                                    {value.recieverAddress}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='info-orders'>
                                            {value.goods && value.goods.map((good, index) =>
                                                <div className='quantity'>
                                                    <i className="fas fa-box-open"></i>
                                                    1x{good.quantity}
                                                </div>
                                            )}
                                            <div className="input-group mb-3 mt-3 note">
                                                <span className="input-group-text title-note">Ghi chú</span>
                                                <div className="form-control content-note">{value.note}</div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </Link>

                            <div className='component-3'>

                                <div className='left-component'>
                                    <span className='date-create'>Ngày tạo đơn: {this.formatDDMMYYYY(value.createdAt)}</span>
                                </div>

                                <div className='right-component'>
                                    <span className='total'>
                                        <i className="fas fa-dollar-sign"></i>
                                        Thành tiền: <span className='price'>{value.totalCost}</span>
                                    </span>
                                </div>

                            </div>

                            <div className='component-4'>
                                <div className='left-component'>
                                    <span>Đơn hàng sẽ được giao trong <span className='hours'>48 giờ</span></span>
                                </div>
                                <div className='right-component'>
                                    <AcceptBtn nameAccept={this.updateNameAccept(value.keyOrderStatus)}
                                        nameCancle='Hủy Bỏ'
                                    // stepAcceptBtn={this.state.stepAcceptBtn}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
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
