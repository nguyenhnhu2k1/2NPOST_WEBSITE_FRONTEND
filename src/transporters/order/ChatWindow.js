import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ChatWindow.scss'
import { getOrdersByStatus } from '../../store/actions';
import { Link } from 'react-router-dom';
import CustomScrollbars from '../../components/CustomScrollbars';
import { getDatabase, ref, get, set, push, onValue } from 'firebase/database';
import app from '../../firebaseConfig';
import { KeyCodeUtils } from '../../utils';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.customScrollbarsRef = React.createRef();
        this.state = {
            messages: [],
            info: '',
            choseCustomerChat: '',
            newMessage: {
                sender: '',
                receiver: '',
                text: '',
                timestamp: '',
            },
            idTransporter: '',
            idCustomer: '',
        };
    }

    chooseMessage = (chat, index) => {
        this.setState({
            messages: Object.values(chat.message),
            info: chat.info,
            choseCustomerChat: index
        });
        this.props.onChangeNewMessengerSender(index, false);
    }

    calculateTimeAgo = (timestamp) => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - timestamp;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return `${seconds} giây trước`;
        }
    }

    // Hàm cuộn xuống cuối cùng
    scrollToBottom = () => {
        if (this.customScrollbarsRef.current) {
            this.customScrollbarsRef.current.scrollToBottom();
        }
    }

    readMessage = (idTrans, idCus) => {
        const dbRef = getDatabase(app); // Lấy tham chiếu đến cơ sở dữ liệu
        const conversationRef = ref(dbRef, `chat/${idTrans}-${idCus}`);
        this.setState({
            messages: ''
        })
        // Truy vấn dữ liệu
        get(conversationRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const messages = snapshot.val();
                    this.setState({
                        messages: messages.message ? Object.values(messages.message) : '',
                        info: messages.info
                    })
                    this.scrollToBottom();
                } else {
                    console.log("Không tìm thấy tin nhắn nào.");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi kiểm tra đường dẫn:", error);
            });
    }

    handleSendMessage = () => {
        const newMessage = this.state.newMessage.text.trim();
        const { info } = this.state;
        if (newMessage) {
            const database = getDatabase(app);
            const chatRef = ref(database, `chat/${info.idTrans}-${info.idCus}/message`);
            //kiểm tra đường dẫn chat có tồn tại chưa
            get(chatRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log("Đường dẫn tồn tại trong database.");
                    } else {
                        console.log("Đường dẫn không tồn tại trong database.");
                        set(ref(chatRef));
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi kiểm tra đường dẫn:", error);
                });

            // Tạo một khóa duy nhất cho tin nhắn mới
            const newMessageRef = push(chatRef);

            // Đặt tin nhắn mới vào cuộc trò chuyện
            set(newMessageRef, this.state.newMessage)
                .then(() => {
                    console.log("Tin nhắn đã được gửi thành công.");
                    this.setState({
                        newMessage: {
                            sender: '',
                            receiver: '',
                            text: '',
                            timestamp: '',
                        },
                        choseCustomerChat: 0,
                    })
                    this.props.onChangeNewMessengerSender(0, false);
                    this.readMessage(info.idTrans, info.idCus);
                })
                .catch((error) => {
                    console.error("Lỗi khi gửi tin nhắn: ", error);
                });
        }
        else {
            console.log("Không bỏ trống tin nhắn")
        }
    }

    onChangeMessage = (event) => {
        if (event.keyCode === KeyCodeUtils.ENTER) {
            if (this.state.info) {
                this.handleSendMessage();
            }
        }
        this.setState({
            newMessage: {
                sender: 'transporter',
                receiver: 'customer',
                text: event.target.value,
                timestamp: new Date().getTime(),
            }
        })
    }
    componentDidMount() {
        if (this.props.order) {
            this.readMessage(this.props.order.idTransporter, this.props.order.idCustomer);
        }
    } 76

    render() {
        console.log(this.props.userInfo)
        return (
            <React.Fragment>
                <section style={{ backgroundColor: '#eee' }}>
                    <div className="container py-3 chat-window-container">

                        <div className="row">
                            <div className='header-x'>
                                <i className="fas fa-times" onClick={this.props.hideChat}></i>
                            </div>
                            {/* <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0"> */}
                            <div className="col-md-6 col-lg-5 col-sm-0">

                                <h5 className="font-weight-bold mb-3 text-center text-lg-start">Tin nhắn</h5>

                                <div className="card">
                                    <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                        <div className="card-body-user">
                                            <ul className="list-unstyled mb-0">
                                                {this.props.chatList && this.props.chatList.map((chat, index) =>
                                                    <li className={`p-2 border-bottom user-chat-list ${this.state.choseCustomerChat === index ? 'action' : ''} `}
                                                        onClick={() => this.chooseMessage(chat, index)}>
                                                        <Link href="#!" className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <img src={chat.info.profile_pictureCus
                                                                    ? process.env.REACT_APP_BACKEND_URL + chat.info.profile_pictureCus
                                                                    : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'} alt="avatar"
                                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="30" />
                                                                <div className="pt-1">
                                                                    <p className="fw-bold mb-0">{chat.info.usernameCus}</p>
                                                                    <p className={`small text-muted ${this.props.newMessengerSender[index] ? 'fw-bold' : ''}`}>{this.props.lastMessage[index].text}</p>
                                                                </div>
                                                            </div>
                                                            <div className="pt-1 time">
                                                                <p className="small text-muted mb-1">{this.calculateTimeAgo(this.props.lastMessage[index].timestamp)}</p>
                                                            </div>
                                                            {this.props.newMessengerSender[index] &&
                                                                <i className='fas fa-circle newMessDot'></i>
                                                            }
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </CustomScrollbars>

                                </div>

                            </div>

                            {/* <div className="col-md-6 col-lg-7 col-xl-8 card-message"> */}
                            <div className="col-md-6 col-lg-7 col-sm-12 card-message">
                                <CustomScrollbars style={{ height: '50vh', width: '100%' }} ref={this.customScrollbarsRef}>
                                    <ul className="list-unstyled">
                                        {
                                            this.state.messages ? (
                                                this.state.messages.map((mess, index) => {
                                                    return mess.sender === 'customer' ? (
                                                        <li className="d-flex justify-content-between mb-4" key={index}>
                                                            <img src={this.state.info.profile_pictureCus
                                                                ? process.env.REACT_APP_BACKEND_URL + this.state.info.profile_pictureCus
                                                                : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'} alt="avatar"
                                                                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                                                            <div className="card w-100">
                                                                <div className="card-header d-flex justify-content-between p-3" style={{ backgroundColor: '#0dcaf0' }}>
                                                                    <p className="fw-bold mb-0">{this.state.info ? this.state.info.usernameCus : ''}</p>
                                                                    <p className="text-muted small mb-0"><i className="far fa-clock"></i> {this.calculateTimeAgo(mess.timestamp)}</p>
                                                                </div>
                                                                <div className="card-body">
                                                                    <p className="mb-0">
                                                                        {mess.text}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ) : (
                                                        <li className="d-flex justify-content-between mb-4" key={index}>
                                                            <div className="card w-100">
                                                                <div className="card-header d-flex justify-content-between p-3" style={{ backgroundColor: '#c5c1c1' }}>
                                                                    <p className="fw-bold mb-0">{this.state.info ? this.state.info.usernameTrans : ''}</p>
                                                                    <p className="text-muted small mb-0"><i className="far fa-clock"></i> {this.calculateTimeAgo(mess.timestamp)}</p>
                                                                </div>
                                                                <div className="card-body">
                                                                    <p className="mb-0">
                                                                        {mess.text}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <img src={this.props.userInfo.image
                                                                ? process.env.REACT_APP_BACKEND_URL + this.props.userInfo.image
                                                                : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'} alt="avatar"
                                                                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60" />
                                                        </li>
                                                    );
                                                })
                                            ) : (
                                                <div style={{ textAlign: 'center' }} >
                                                    <h4 style={{ color: '#0d6efd' }}>{this.props.order && this.props.order.user ? this.props.order.user.userName : ''}</h4>
                                                    <img src={this.props.order && this.props.order.user && this.props.order.user.image
                                                        ? process.env.REACT_APP_BACKEND_URL + this.props.order.user.image
                                                        : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'}
                                                        alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                                    <p>Chưa có tin nhắn</p>
                                                </div>
                                            )
                                        }

                                        <li className="bg-white mb-3">
                                            <div className="form-outline">
                                                <textarea className="form-control" id="textAreaExample2" rows="4" value={this.state.newMessage.text}
                                                    placeholder='Nhập tin nhắn tại đây...' onChange={this.onChangeMessage} onKeyDown={this.onChangeMessage}></textarea>
                                                <label className="form-label" htmlFor="textAreaExample2">Message</label>
                                            </div>
                                        </li>
                                        <button type="button" className="btn btn-info btn-rounded float-end btn-send"
                                            disabled={!this.state.info} onClick={this.handleSendMessage}>
                                            <i className="far fa-paper-plane"></i>
                                        </button>

                                    </ul>
                                </CustomScrollbars>
                            </div>

                        </div>

                    </div>
                </section >
            </React.Fragment >
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (idTrans) => dispatch(getOrdersByStatus(idTrans)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);


