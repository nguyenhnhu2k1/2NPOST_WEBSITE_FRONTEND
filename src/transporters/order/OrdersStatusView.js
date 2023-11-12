import React, { Component } from 'react';
import { connect } from 'react-redux';

import boxImg from '../../assets/images/orders/box.png';

import AcceptBtn from './AcceptBtn';
import './OrdersStatusView.scss';
import { Link } from 'react-router-dom';
import { handleCreateDriverForOrder, handleCreateVehicleForOrder } from '../../services/userService';
import { getOrdersByStatus } from '../../store/actions';
import { getDatabase, ref, set, get, orderByKey, startAt, endAt, query } from "firebase/database";
import app from '../../firebaseConfig';



import ChatWindow from './ChatWindow'
// import SimpleChat from './SimpleChat';

// Trang hiển thị đơn hàng theo trạng thái
class OrdersStatusView extends Component {
    constructor(props) {
        super(props);
        this.btnCancel = React.createRef();
        this.state = ({
            selectedDriver: '',
            selectedVehicle: '',
            temporarySelectedDriver: '',
            temporarySelectedVehicle: '',
            chatValue: '',
            isShowChatComponent: false,
            isShowChatWindow: false,
            chatList: [],
            lastMessage: [],
        })
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
        if (status === 'OS0') {
            nameAccept = 'Nhận đơn';
        }
        if (status === 'TS0') {
            nameAccept = 'Đã lấy hàng';
        }
        if (status === 'TS1') {
            nameAccept = 'Đã về kho';
        }
        if (status === 'TS2') {
            nameAccept = 'Giao Hàng';
        }
        if (status === 'TS3') {
            nameAccept = 'Thành công';
        }
        if (status === 'TS4') {
            nameAccept = 'Chờ khách hàng xác nhận';
        }
        if (status === 'OS2' || status === 'TS5') {
            nameAccept = 'Xem chi tiết';
        }
        return nameAccept;
    }
    // xử lý chọn tài xế tạm thời
    handleSelectedTemporaryDriver = (index) => {
        this.setState({
            temporarySelectedDriver: index
        })
    }
    // xử lý chọn phương tiện tạm thời
    handleSelectedTemporaryVehicle = (index) => {
        this.setState({
            temporarySelectedVehicle: index
        })
    }
    // xử lý chọn tài xế lên db
    handleSelectedDriver = async (idOrder) => {
        try {
            let idDriver = this.props.drivers[this.state.temporarySelectedDriver].id;
            let selectDriver = await handleCreateDriverForOrder(idOrder, idDriver);
            if (selectDriver) {
                if (this.btnCancel && this.btnCancel.current) {
                    this.btnCancel.current.click();
                }
                this.props.getOrders(this.props.userInfo.idTransporter);
            }
            else {
                alert("Có lỗi khi chọn tài xế");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    // xử lý chọn phương tiện lên db
    handleSelectedVehicle = async (idOrder) => {
        try {
            let idVehicle = this.props.vehicles[this.state.temporarySelectedVehicle].id;
            let selectVehicle = await handleCreateVehicleForOrder(idOrder, idVehicle);
            if (selectVehicle) {
                if (this.btnCancel && this.btnCancel.current) {
                    this.btnCancel.current.click();
                }
                this.props.getOrders(this.props.userInfo.idTransporter);
            }
            else {
                alert("Có lỗi khi chọn tài xế");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    // tìm tài xế dựa vào id Tài xế
    handleSearchDriverByIdDriver = (id) => {
        let driverFind;
        this.props.drivers.map((driver) => {
            if (Number(driver.id) === Number(id)) {
                driverFind = driver;
            }
        }
        )
        return driverFind
    }
    // tìm phương tiện dựa vào id phương tiện
    handleSearchVehicleByIdVehicle = (id) => {
        let vehicleFind;
        this.props.vehicles.map((vehicle) => {
            if (Number(vehicle.id) === Number(id)) {
                vehicleFind = vehicle;
            }
        })
        return vehicleFind
    }
    // Hiển thị chatcomponent
    showChatComponent = (value) => {
        this.setState(
            {
                chatValue: value,
                isShowChatComponent: true
            },
        );
        // if (this.props.simpleChat) { // Kiểm tra xem SimpleChat có sẵn trong props hay không
        //     this.props.simpleChat.readMessage(); // Gọi hàm readMessage từ đối tượng SimpleChat
        // }
    }

    hideChatComponent = () => {
        this.setState({
            isShowChatComponent: false,
            isShowChatWindow: false
        })
    }
    //hiển thị cửa sổ chat
    onChangeShowChatWindow = (value) => {
        this.setState({
            isShowChatWindow: true,
            chatValue: value
        })
    }
    writeUserData = () => {
        const orders = this.props.orders;
        const db = getDatabase(app);
        orders.forEach((order) => {
            console.log(order)
            const chatInfoRef = ref(db, `chat/${order.idTransporter}-${order.idCustomer}/info`);
            // // Nếu đường dẫn đã tồn tại => không làm gì hết
            // // Nếu đường dẫn chưa tồn tại => Thêm đường dẫn
            get(chatInfoRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log("Đường dẫn tồn tại trong database.");
                    } else {
                        console.log("Đường dẫn không tồn tại trong database.");
                        set((chatInfoRef), {
                            idTrans: order.idTransporter,
                            usernameTrans: this.props.userInfo.transporterName,
                            profile_pictureTrans: this.props.userInfo.image,
                            idCus: order.idCustomer,
                            usernameCus: order.user.userName,
                            profile_pictureCus: order.user.image,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi kiểm tra đường dẫn:", error);
                });
        })
    }

    // lưu thời gian nhắn tin cuối cùng lưu vào mảng
    getLastMessage = (chatDataList) => {
        let lastMessage = [];
        chatDataList.forEach(chat => {
            chat = Object.values(chat.message)
            let lastMess = chat[chat.length - 1];
            lastMessage.push(lastMess);
        })
        this.setState({
            lastMessage
        })
    }

    // lấy thời gian nhắn tin cuối cùng của từng khách hàng
    getLastMessageOfCustomer = (messages) => {
        let lastMessage = null;
        let lastTimestamp = 0;

        for (const messageId in messages) {
            const message = messages[messageId];
            if (message.timestamp > lastTimestamp) {
                lastTimestamp = message.timestamp;
                lastMessage = message;
            }
        }

        return lastMessage;
    }

    // sắp xếp thời gian nhắn tin của khách hàng
    sortTimeChatOfCustomerList = (chatList) => {
        chatList.sort((a, b) => {
            console.log(this.getLastMessageOfCustomer(a.message).timestamp)
            console.log(this.getLastMessageOfCustomer(b.message).timestamp)
            return this.getLastMessageOfCustomer(b.message).timestamp - this.getLastMessageOfCustomer(a.message).timestamp
        });
        return chatList;
    }

    readListCustomer = () => {
        const db = getDatabase(app);
        const chatRef = ref(db, "chat/");

        // Sử dụng Firebase Query để lọc dữ liệu
        const que = query(chatRef, orderByKey(), startAt(this.props.userInfo.idTransporter + "-"), endAt(this.props.userInfo.idTransporter + "~"));

        get(que)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let customerListChat = [];
                    const chatData = snapshot.val();
                    const chatDataList = Object.values(chatData);
                    chatDataList.forEach(chatData => {
                        if (chatData.message) {
                            customerListChat.push(chatData);
                        }
                    })
                    console.log('customerListChat', customerListChat)

                    // chatData chứa tất cả dữ liệu có dạng "chat/61-x"
                    // Bạn có thể lặp qua các con của chatData để truy cập dữ liệu cụ thể
                    let chatList = this.sortTimeChatOfCustomerList(customerListChat);
                    console.log('chatList', chatList)

                    this.getLastMessage(chatList);
                    this.setState({
                        chatList
                    })
                } else {
                    console.log("Không có dữ liệu có dạng 'chat/61-x' trong database.");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu:", error);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.orders !== prevProps.orders) {
            this.writeUserData();
            this.readListCustomer();
        }
    }

    componentDidMount() {
        if (this.props.orders) {
            this.writeUserData();
            this.readListCustomer();
        }
    }

    render() {
        let status = this.props.orderStatus;
        console.log(this.state);
        return (
            <React.Fragment>
                <div>
                    {status && status.map((value, index) => (
                        <div className='detail-component' key={index}>

                            <div className='component-1'>

                                <div className='left-component'>
                                    <span>{value.keyServiceAllCode.valueVi}</span>
                                    <button className={`chat-component ${this.state.isShowChatWindow ? 'disable-chat-comp' : ''}`}
                                        disabled={this.state.isShowChatWindow} onClick={() => this.onChangeShowChatWindow(value)}>
                                        <i className="fab fa-rocketchat"></i>
                                        <span>chat</span>
                                    </button>
                                </div>
                                {/* chọn tài xế và phương tiện */}
                                <div className='driver-vehicle'>
                                    <button className='driver' data-bs-toggle="modal" data-bs-target={`#selectDriver${value.id}`}>

                                        {value && value.transportationOrder && value.transportationOrder.idDriver
                                            ? (<div className='show-selected-driver'>
                                                <img src={this.handleSearchDriverByIdDriver(value.transportationOrder.idDriver).image ? process.env.REACT_APP_BACKEND_URL + this.handleSearchDriverByIdDriver(value.transportationOrder.idDriver).image : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'} alt='avt-driver' />
                                                <span>{this.handleSearchDriverByIdDriver(value.transportationOrder.idDriver).userName}</span>
                                            </div>)
                                            : (<div>
                                                <i className="fas fa-plus" style={{ color: '#ee0033' }}></i>
                                                <span>Chọn tài xế</span>
                                            </div>)}
                                    </button>
                                    <button className='vehicle' data-bs-toggle="modal" data-bs-target={`#selectVehicle${value.id}`}>
                                        {value && value.transportationOrder && value.transportationOrder.idVehicle
                                            ? (<div className='show-selected-vehicle'>
                                                <img src={this.handleSearchVehicleByIdVehicle(value.transportationOrder.idVehicle) ? process.env.REACT_APP_BACKEND_URL + this.handleSearchVehicleByIdVehicle(value.transportationOrder.idVehicle).image : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'} alt='avt-driver' />
                                                <span>{this.handleSearchVehicleByIdVehicle(value.transportationOrder.idVehicle) && this.handleSearchVehicleByIdVehicle(value.transportationOrder.idVehicle).licensePlates}</span>
                                            </div>)
                                            : (<div>
                                                <i className="fas fa-plus" style={{ color: '#ee0033' }}></i>
                                                <span>Chọn phương tiện</span>
                                            </div>)}
                                    </button>
                                    <div className="modal fade selectDriver" id={`selectDriver${value.id}`} tabIndex="-1" aria-labelledby="selectDriverLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">
                                                        Chọn tài xế cho đơn hàng #{value.id}
                                                    </h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={this.btnCancel}></button>
                                                </div>
                                                <div className='modal-body'>
                                                    {
                                                        this.props.drivers.map((driver, indexDriver) =>
                                                            <div key={indexDriver} className={`select-driver ${this.state.temporarySelectedDriver === indexDriver ? 'action' : ''} `} onClick={(event) => this.handleSelectedTemporaryDriver(indexDriver)}>
                                                                <img src={driver.image ? process.env.REACT_APP_BACKEND_URL + driver.image : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'} alt='avt-driver' />
                                                                <span>{driver.userName}</span>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-primary" onClick={() => this.handleSelectedDriver(value.id)}>Chọn</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade selectVehicle" id={`selectVehicle${value.id}`} tabIndex="-1" aria-labelledby="selectVehicleLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">
                                                        Chọn phương tiện cho đơn hàng #{value.id}
                                                    </h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className='modal-body'>
                                                    {
                                                        this.props.vehicles.map((vehicle, indexVehicle) =>
                                                            <div key={indexVehicle} className={`select-vehicle ${this.state.temporarySelectedVehicle === indexVehicle ? 'action' : ''} `} onClick={(event) => this.handleSelectedTemporaryVehicle(indexVehicle)}>
                                                                <img src={vehicle.image ? process.env.REACT_APP_BACKEND_URL + vehicle.image : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'} alt='avt-driver' />
                                                                <span>{vehicle.licensePlates}</span>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-primary" onClick={() => this.handleSelectedVehicle(value.id)}>Chọn</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='right-component'>
                                    <div className='status-component'>
                                        <i className="fas fa-truck"></i>
                                        <span>{value && value.keyOrderStatusAllCode && value.keyOrderStatusAllCode.valueVi}</span>
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
                                            <div className='order-quantity-driver-vehicle'>
                                                <div>
                                                    {value.goods && value.goods.map((good, index) =>
                                                        <div className='quantity' key={index}>
                                                            <i className="fas fa-box-open"></i>
                                                            1x{good.quantity}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
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
                                        order={value} nameCancle='Hủy Bỏ'
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* {this.state.isShowChatComponent
                        && <SimpleChat order={this.state.chatValue} hideChat={this.hideChatComponent}
                            ref={(ref) => (this.simpleChatRef = ref)} />} */}
                    <button className='btn-chat' onClick={() => this.onChangeShowChatWindow(null)}>
                        <img src='https://cdn-icons-png.flaticon.com/512/2950/2950711.png' alt='chat' />
                    </button>
                    {this.state.isShowChatWindow && this.state.chatList
                        && <ChatWindow chatList={this.state.chatList} lastMessage={this.state.lastMessage}
                            hideChat={this.hideChatComponent} order={this.state.chatValue} readListCustomer={this.readListCustomer} />}

                </div>
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        vehicles: state.user.vehicles,
        drivers: state.user.drivers,
        userInfo: state.user.userInfo,
        orders: state.user.orders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (idTrans) => dispatch(getOrdersByStatus(idTrans)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersStatusView);
