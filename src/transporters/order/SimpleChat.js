import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SimpleChat.scss'

import { getDatabase, ref, push, onValue, set, get, child } from "firebase/database";
import app from '../../firebaseConfig';
import { KeyCodeUtils } from '../../utils';

// Trang hiển thị đơn hàng theo trạng thái
class OrdersStatusView extends Component {
    constructor(props) {
        super(props);
        this.scrollableContainerRef = React.createRef();
        this.state = {
            newMessage: {
                sender: '',
                reciever: '',
                text: '',
                timestamp: '',
            },
            messages: [],
            miniChat: false
        };
    }

    writeUserData = () => {
        const order = this.props.order;
        const db = getDatabase(app);
        const chatInfoRef = ref(db, `chat/${order.idTransporter}-${order.idCustomer}/info`);
        // Nếu đường dẫn đã tồn tại => không làm gì hết
        // Nếu đường dẫn chưa tồn tại => Thêm đường dẫn
        get(chatInfoRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log("Đường dẫn tồn tại trong database.");
                } else {
                    console.log("Đường dẫn không tồn tại trong database.");
                    set(ref(chatInfoRef), {
                        usernameTrans: this.props.userInfo.transporterName,
                        profile_pictureTrans: this.props.userInfo.image,
                        usernameCus: order.recieverName,
                        profile_pictureCus: order.user.image,
                    });
                }
            })
            .catch((error) => {
                console.error("Lỗi khi kiểm tra đường dẫn:", error);
            });
    }

    handleSendMessage = () => {
        const newMessage = this.state.newMessage.text.trim();
        const order = this.props.order;
        if (newMessage) {
            const database = getDatabase(app);
            const chatRef = ref(database, `chat/${order.idTransporter}-${order.idCustomer}/message`);
            //    kiểm tra đường dẫn chat có tồn tại chưa
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
                            reciever: '',
                            text: '',
                            timestamp: '',
                        },
                    })
                    this.readMessage();
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
            this.handleSendMessage();
        }
        this.setState({
            newMessage: {
                sender: 'transporter',
                reciever: 'customer',
                text: event.target.value,
                timestamp: new Date().getTime(),
            }
        })
    }

    readMessage = () => {
        const order = this.props.order;
        const dbRef = getDatabase(app); // Lấy tham chiếu đến cơ sở dữ liệu
        const conversationRef = ref(dbRef, `chat/${order.idTransporter}-${order.idCustomer}/message`);
        this.setState({
            messages: ''
        })
        // Truy vấn dữ liệu
        get(conversationRef) // Sử dụng conversationRef để truy vấn
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const messages = snapshot.val();
                    const messageList = Object.values(messages);
                    this.setState({
                        messages: messageList
                    })
                    this.scrollToBottom();
                } else {
                    console.log("Không tìm thấy tin nhắn nào.");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi truy vấn dữ liệu: ", error);
            });
    }

    handleMiniChatOn = () => {
        this.setState({
            miniChat: true
        })
    }

    handleMiniChatOff = () => {
        this.setState({
            miniChat: false
        })
    }

    scrollToBottom = () => {
        // Sử dụng Ref để cuộn thành phần xuống cuối cùng
        const container = this.scrollableContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };

    componentDidMount() {
        this.writeUserData();
        this.readMessage();
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <section style={{ backgroundColor: '#eee' }}>
                    <div className="container py-5">

                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-4">

                                <div className={`card message ${this.state.miniChat ? 'minichat' : ''}`} id="chat1" style={{ borderRadius: '15px' }}>
                                    <div
                                        className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                                        style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                                        {
                                            this.state.miniChat
                                                ? <i className="far fa-window-restore" onClick={this.handleMiniChatOff}></i>
                                                : <i className="fas fa-minus" onClick={this.handleMiniChatOn}></i>
                                        }
                                        <p className="mb-0 fw-bold">{this.props.order.user.userName}</p>
                                        <i className="fas fa-times" onClick={this.props.hideChat}></i>
                                    </div>
                                    <div className="card-body" ref={this.scrollableContainerRef}>

                                        {this.state.messages ?
                                            this.state.messages.map((mess, index) =>
                                                <div>
                                                    {mess.sender === 'customer' &&
                                                        <div className="d-flex flex-row justify-content-start mb-4">
                                                            <img src={this.props.order.user.image
                                                                ? process.env.REACT_APP_BACKEND_URL + this.props.order.user.image
                                                                : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'}
                                                                alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                                            <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237,.2)' }}>
                                                                <p className="small mb-0">{mess.text}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                    {mess.sender === 'transporter' &&
                                                        <div className="d-flex flex-row justify-content-end mb-4">
                                                            <div className="p-3 me-3 border" style={{ borderRadius: '15px', backgroundColor: '#fbfbfb' }}>
                                                                <p className="small mb-0">{mess.text}</p>
                                                            </div>
                                                            <img src={this.props.userInfo.image
                                                                ? process.env.REACT_APP_BACKEND_URL + this.props.userInfo.image
                                                                : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'}
                                                                alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                                        </div>
                                                    }

                                                </div>) :
                                            <div style={{ textAlign: 'center' }} >
                                                <img src={this.props.order.user.image
                                                    ? process.env.REACT_APP_BACKEND_URL + this.props.order.user.image
                                                    : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'}
                                                    alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                                <p>Chưa có tin nhắn</p>
                                            </div>}
                                        <div className="form-outline">
                                            <textarea className="form-control" id="textAreaExample" rows="4" placeholder='Nhập tin nhắn tại đây...'
                                                onKeyDown={this.onChangeMessage} value={this.state.newMessage.text} onChange={this.onChangeMessage} />
                                            <i className="far fa-paper-plane" onClick={this.handleSendMessage}></i>
                                            {/* <label className="form-label" htmlFor="textAreaExample">Nhập tin nhắn của bạn</label> */}
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersStatusView);
