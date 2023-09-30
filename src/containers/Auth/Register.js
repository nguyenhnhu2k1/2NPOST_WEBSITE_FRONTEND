/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyCodeUtils } from '../../utils';
import * as actions from "../../store/actions";
import { Redirect } from 'react-router-dom';

import './Register.scss';
import { handleRegisterAPI } from '../../services/userService';
import HeaderAuth from './HeaderAuth';

class Register extends Component {
    constructor(props) {
        super(props);
        this.btnRegister = React.createRef();
        this.state = {
            phone: '',
            password: '',
            repeatPassword: '',
            transporterName: '',
            foundingDate: '',
            keyRole: 'R2',
            errMessage: '',

        }
    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            event.preventDefault();
            if (!this.btnRegister.current || this.btnRegister.current.disabled) return;
            this.btnRegister.current.click();
        }
    }

    //xử lý nhập vào phone
    handleOnchangInputPhone = (event) => {
        this.setState({
            phone: event.target.value
        })
    }

    //xử lý nhập vào password
    handleOnchangInputPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    //xử lý nhập vào repeat password
    handleOnchangInputRepeatPassword = (event) => {
        this.setState({
            repeatPassword: event.target.value
        })
    }

    //xử lý nhập vào transporterName
    handleOnchangInputtransporterName = (event) => {
        this.setState({
            transporterName: event.target.value
        })
    }

    //xử lý nhập vào foundingDate
    handleOnchangInputFoundingDate = (event) => {
        this.setState({
            foundingDate: this.formatDate(event.target.value)
        })
    }

    // chuyển đổi ngày DD/MM/YYYY
    formatDate = (dateString) => {
        // Hàm này sẽ định dạng lại giá trị thành "DD/MM/YYYY"
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // ẩn hiện password
    showOrHiddenEye = (event) => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord
        })
    }

    //xử lý đăng ký
    handleRegister = async () => {
        this.setState({
            errMessage: ''
        });

        if (this.state.phone.trim() &&
            this.state.password.trim() &&
            this.state.repeatPassword.trim() &&
            this.state.transporterName.trim() &&
            this.state.foundingDate.trim()) {
            if (this.state.password.trim() === this.state.repeatPassword.trim()) {
                try {
                    let transporter = {
                        transporterName: this.state.transporterName,
                        foundingDate: this.state.foundingDate,
                    }
                    let user = {
                        phone: this.state.phone,
                        password: this.state.password,
                        keyRole: this.state.keyRole,
                    }
                    let data = await handleRegisterAPI(transporter, user);
                    console.log(data)
                    if (data && data.errCode === 0) {
                        let userInfo = {
                            ...data.data.user,
                            ...data.data.transporter,
                        }
                        console.log(userInfo)

                        this.props.userLoginSuccess(userInfo);
                        this.props.history.push('/login');
                    }
                    else {
                        this.setState({
                            errMessage: data.message,
                        });
                    }
                }
                catch (e) {
                    // this.setState({
                    //     errMessage: e.response.data.message,
                    // });
                    console.log('catch', e)
                }
            }
            else {
                this.setState({
                    errMessage: 'Nhập lại mật khẩu không chính xác!'
                });
            }
        }
        else {
            this.setState({
                errMessage: 'Không được để trống thông tin!'
            });
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    render() {
        return (
            <div className='register-container'>
                <HeaderAuth />
                <section className="form-register-container">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black">
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>

                                                <form className="mx-1 mx-md-4">

                                                    <div className="align-items-center mb-3">
                                                        <div className='d-flex flex-row'>
                                                            <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-phone">Số điện thoại</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="tel" id="register-form-phone" className="form-control input-css" onChange={this.handleOnchangInputPhone} />
                                                        </div>
                                                    </div>

                                                    <div className="align-items-center mb-3">
                                                        <div className='d-flex flex-row'>
                                                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-password">Mật khẩu</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" id="register-form-password" className="form-control input-css" onChange={this.handleOnchangInputPassword} />
                                                        </div>
                                                    </div>

                                                    <div className="align-items-center mb-3">
                                                        <div className='d-flex flex-row'>
                                                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-repeat-password">Nhắc lại mật khẩu</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" id="register-form-repeat-password" className="form-control input-css" onChange={this.handleOnchangInputRepeatPassword} />
                                                        </div>
                                                    </div>

                                                    <div className="align-items-center mb-3">
                                                        <div className='d-flex flex-row'>
                                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-name">Tên công ty của bạn</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="text" id="register-form-name" className="form-control input-css" onChange={this.handleOnchangInputtransporterName} />
                                                        </div>
                                                    </div>


                                                    <div className="align-items-center mb-3">
                                                        <div className='d-flex flex-row'>
                                                            <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-founding-date">Ngày thành lập</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="date" id="register-form-founding-date" className="form-control input-css" onChange={this.handleOnchangInputFoundingDate} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 errMess">
                                                        {this.state.errMessage}
                                                    </div>
                                                    <div className="form-check d-flex justify-content-center mb-3">
                                                        <input className="form-check-input me-2" type="checkbox" value="" id="terms-services" />
                                                        <label className="form-check-label" for="terms-services">
                                                            Tôi đồng ý với chính sách và dịch vụ
                                                        </label>
                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 btn-register">
                                                        <button type="button" className="btn btn-primary btn-lg" ref={this.btnRegister} onClick={this.handleRegister}>Đăng ký</button>
                                                    </div>
                                                </form>

                                            </div>
                                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                    className="img-fluid" alt=''
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
