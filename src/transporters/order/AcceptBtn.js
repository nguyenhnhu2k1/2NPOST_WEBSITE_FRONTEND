import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleUpdateOrderStatus } from '../../services/userService';
import { getOrdersByStatus } from '../../store/actions';
import './AcceptBtn.scss';

class AcceptBtn extends Component {
    handleAccept = async (id, step) => {
        try {
            let result = await handleUpdateOrderStatus(id, this.updateStepNext(step))
            if (result && result.errCode === 0) {
                alert('Trạng thái đơn hàng có id ' + id + ' đã được cập nhật bước tiếp theo')
                this.props.getOrders(this.props.userInfo.idTransporter);
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
        if (status === 'OS0') {
            stepNext = 'TS0';
        }
        if (status === 'TS0') {
            stepNext = 'TS1';
        }
        if (status === 'TS1') {
            stepNext = 'TS2';
        }
        if (status === 'TS2') {
            stepNext = 'TS3';
        }
        if (status === 'TS3') {
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
