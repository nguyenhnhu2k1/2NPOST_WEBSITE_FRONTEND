import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleUpdateOrderStatus } from '../../services/userService';
import { getOrdersByStatus } from '../../store/actions';
import './AcceptBtn.scss';
import { handleCreateTransportationOrder } from '../../services/userService';

class AcceptBtn extends Component {
    // xử lý cập nhật trạng thái
    handleAccept = async (id, step) => {
        try {
            const { order, getOrders, userInfo } = this.props;
            // Nếu đơn hàng là tiêu chuẩn thì chuyển trang
            // Nếu đơn hàng không là tiêu chuẩn, thì xem tại trạng thái TS0 đã chọn tài xế hay chưa
            if (order.keyService !== 'SE2') {
                if (step === 'TS0') {
                    if (order.transportationOrder && order.transportationOrder.idDriver && order.transportationOrder.idVehicle) {
                        // bước tiếp theo của trạng thái hiện tại
                        let result = await handleUpdateOrderStatus(id, this.updateStepNext(step))
                        if (result && result.errCode === 0) {
                            alert('Trạng thái đơn hàng có id ' + id + ' đã được cập nhật bước tiếp theo')
                            getOrders(userInfo.idTransporter);
                            if (this.props.getDetail) {
                                this.props.getDetail();
                            }
                        }
                    }
                    else {
                        alert("Mời chọn tài xế và phương tiện trước khi chuyển trạng thái");
                    }
                }
                else {
                    // bước tiếp theo của trạng thái hiện tại
                    let result = await handleUpdateOrderStatus(id, this.updateStepNext(step))
                    if (result && result.errCode === 0) {
                        alert('Trạng thái đơn hàng có id ' + id + ' đã được cập nhật bước tiếp theo')
                        getOrders(userInfo.idTransporter);
                        if (this.props.getDetail) {
                            this.props.getDetail();
                        }
                        if (step === 'OS0') {
                            // Tạo transportation
                            await handleCreateTransportationOrder(id);
                        }

                    }
                }
            }
            else {
                // bước tiếp theo của trạng thái hiện tại
                let result = await handleUpdateOrderStatus(id, this.updateStepNext(step))
                if (result && result.errCode === 0) {
                    alert('Trạng thái đơn hàng có id ' + id + ' đã được cập nhật bước tiếp theo')
                    getOrders(userInfo.idTransporter);
                    if (this.props.getDetail) {
                        this.props.getDetail();
                    }
                    if (step === 'OS0') {
                        // Tạo transportation
                        await handleCreateTransportationOrder(id);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }

    }
    handleCancel = async (id, step) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Bạn có muốn hủy đơn này") === true) {
            try {
                let result = await handleUpdateOrderStatus(id, step)
                if (result && result.errCode === 0) {
                    alert('Trạng thái đơn hàng có id ' + id + ' đã được hủy bỏ')
                    this.props.getOrders(this.props.userInfo.idTransporter);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    updateStepNext = (status) => {
        let stepNext = ''
        const order = this.props.order;
        if (status === 'OS0') { //Chờ xác nhận
            stepNext = 'TS0';
        }
        if (status === 'TS0') { //chờ lấy hàng
            stepNext = 'TS1';
        }
        if (status === 'TS1') { //tài xế đã nhận hàng
            if (order.keyService !== 'SE2') {
                stepNext = 'TS3';
            }
            else {
                stepNext = 'TS2';
            }
        }
        if (status === 'TS2') { //Đơn hàng đang ở kho
            stepNext = 'TS3';
        }
        if (status === 'TS3') { //Đơn hàng đang giao
            stepNext = 'TS4';
        }
        return stepNext;
    }

    render() {

        return (
            <React.Fragment>
                <div className='btn-component'>
                    <button className={`accept-component ${this.props.nameAccept === 'Xem chi tiết' || this.props.nameAccept === 'Chờ khách hàng xác nhận' ? 'disable-style' : ''}`} disabled={this.props.nameAccept === 'Xem chi tiết' || this.props.nameAccept === 'Chờ khách hàng xác nhận'}
                        onClick={() => this.handleAccept(this.props.order.id, this.props.order.keyOrderStatus)}
                    >
                        {this.props.nameAccept}
                    </button>
                    <button className='cancle-component' hidden={this.props.nameAccept === 'Xem chi tiết' || this.props.nameAccept === 'Chờ khách hàng xác nhận'}
                        onClick={() => this.handleCancel(this.props.order.id, 'OS2')}
                    >
                        {this.props.nameCancle}
                    </button>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        TS3: state.user.TS3,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (idTrans) => dispatch(getOrdersByStatus(idTrans)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptBtn);
