import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import DateRangePickerValue from './DateRangePickerValue';
import OrdersStatusView from './OrdersStatusView';
import HeaderTrans from '../header/Header';
import KeyCodeUtils from '../../utils/KeyCodeUtils.js';
import './Order.scss'
import dayjs from 'dayjs';


class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatus: 'orders',
            search: 'idOrder',
            showOrder: this.props.orders,
            startDate: new Date(),
            endDate: new Date(),
        }
    }

    changeOrderStatus = (orderStatus) => {
        this.setState({
            orderStatus: orderStatus,
        })
    }

    // Xác định loại tìm kiếm
    onChangeSearchType = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    // xóa dấu tiếng việt =>  dùng cho hàm tìm kiếm tên tài xế
    removeAccents = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }

    // xử lý tìm kiếm phương tiện
    HandleSearch = (event) => {
        if (event.keyCode === KeyCodeUtils.ENTER) {
            let orderFind;
            // Tìm kiếm theo mã đơn
            if (this.state.search === 'idOrder') {
                orderFind = this.props.orders.filter((order) =>
                    order.id.toString().includes(event.target.value.toString())
                )
            }
            // tìm kiếm theo tên khách hàng
            else {
                orderFind = this.props.orders.filter((order) =>
                    this.removeAccents(order.senderName.toLowerCase()).includes(this.removeAccents(event.target.value.toLowerCase()))
                )
            }
            if (orderFind) {
                this.setState({
                    showOrder: orderFind
                })
            }
            else {
                alert("Không tìm thấy đơn hàng");
            }
            this.changeOrderStatus('orders');
        }
    }
    // Lọc đơn hàng theo dịch vụ
    handleFilterByService = (event) => {
        if (event.target.value !== 'all') {
            let orderFind = this.props.orders.filter((order) => order.keyService.includes(event.target.value))
            if (orderFind) {
                this.setState({
                    showOrder: orderFind
                })
            }
            else {
                alert("Không tìm thấy đơn hàng");
            }
        }
        else {
            this.setState({
                showOrder: this.props.orders
            })
        }
    }
    // định dạng ngày tháng
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
    // Hàm callback để cập nhật startDate và endDate
    handleDateChange = (startDate, endDate) => {
        this.setState({
            startDate,
            endDate,
        }, () => {
            this.searchByCreateDate(); // Gọi hàm searchByCreateDate sau khi cập nhật startDate và endDate
        });
    };
    // tìm kiếm theo ngày tạo đơn
    searchByCreateDate = () => {
        let orderFind = this.props.orders.filter((order) => {
            console.log(dayjs(order.createdAt).toDate().getTime())
            return dayjs(order.createdAt).toDate().getTime() > this.state.startDate.getTime()
                && dayjs(order.createdAt).toDate().getTime() < this.state.endDate.getTime();
        })
        if (orderFind) {
            this.setState({
                showOrder: orderFind
            })
        }
        else {
            alert("Không tìm thấy đơn hàng");
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.orders !== prevProps.orders) {
            this.setState({
                showOrder: this.props.orders,
            })
        }
    }
    render() {

        let showNav = this.props.showNav;
        let { OS0, TS0, TS1, TS2, TS3, TS4, TS5, OS2 } = this.props;
        const { orderStatus } = this.state;
        console.log(this.state);
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
                                <div className={orderStatus === 'TS0' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS0')}>Chờ lấy hàng</div>
                                <div className={orderStatus === 'TS1' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS1')}>Tài xế đã nhận hàng</div>
                                <div className={orderStatus === 'TS2' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS2')}>Đơn hàng đang ở kho</div>
                                <div className={orderStatus === 'TS3' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS3')}>Đơn hàng đang giao</div>
                                <div className={orderStatus === 'TS4' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS4')}>Đơn hàng đã giao</div>
                                <div className={orderStatus === 'TS5' ? 'action' : ''} onClick={() => this.changeOrderStatus('TS5')}>Đơn hàng hoàn thành</div>
                                <div className={orderStatus === 'OS2' ? 'action' : ''} onClick={() => this.changeOrderStatus('OS2')}>Đã hủy</div>
                            </div>

                            {/* tìm kiếm + lọc */}
                            <div className='search-filter-component'>
                                <div className='search'>
                                    <div className="input-group mb-3">
                                        <select className='input-group-text' id='search' onChange={this.onChangeSearchType}>
                                            <option value="idOrder">Mã đơn</option>
                                            <option value="customerName">Tên khách hàng</option>
                                        </select>
                                        <input type="text" className="form-control" onKeyDown={this.HandleSearch}
                                            placeholder="Nhập nội dung cần tìm" aria-describedby="search" />
                                    </div>
                                </div>
                                <div className='filter-by-service'>
                                    <select className="form-select" onChange={this.handleFilterByService}>
                                        <option defaultValue hidden>Chọn loại dịch vụ</option>
                                        <option value="all">Tất cả dịch vụ</option>
                                        <option value="SE0">Hỏa tốc nội thành</option>
                                        <option value="SE1">Hỏa tốc ngoại thành</option>
                                        <option value="SE2">Tiêu chuẩn ngoại thành</option>
                                    </select>
                                </div>
                                <div className='filter-by-date'>
                                    <DateRangePickerValue onDateChange={this.handleDateChange} />
                                </div>
                            </div>

                            {/* hiển thị đơn hàng */}
                            <div>
                                {this.state.orderStatus === 'orders' && <OrdersStatusView orderStatus={this.state.showOrder} />}
                                {this.state.orderStatus === 'OS0' && <OrdersStatusView orderStatus={OS0} />}
                                {this.state.orderStatus === 'TS0' && <OrdersStatusView orderStatus={TS0} />}
                                {this.state.orderStatus === 'TS1' && <OrdersStatusView orderStatus={TS1} />}
                                {this.state.orderStatus === 'TS2' && <OrdersStatusView orderStatus={TS2} />}
                                {this.state.orderStatus === 'TS3' && <OrdersStatusView orderStatus={TS3} />}
                                {this.state.orderStatus === 'TS4' && <OrdersStatusView orderStatus={TS4} />}
                                {this.state.orderStatus === 'TS5' && <OrdersStatusView orderStatus={TS5} />}
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
        TS5: state.user.TS5,
        OS2: state.user.OS2,
        orders: state.user.orders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
