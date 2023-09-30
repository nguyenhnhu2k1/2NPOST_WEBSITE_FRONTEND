/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Link } from 'react-router-dom';

import * as actions from "../../store/actions";

import './Login.scss';
import { handleLoginAPI } from '../../services/userService';
import HeaderAuth from './HeaderAuth';
import { KeyCodeUtils } from '../../utils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            phone: '',
            password: '',
            isShowPassWord: false,
            errMessage: '',
        }
    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            event.preventDefault();
            if (!this.btnLogin.current || this.btnLogin.current.disabled) return;
            this.btnLogin.current.click();
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

    //xử lý đăng nhập
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });

        try {
            let data = await handleLoginAPI(this.state.phone, this.state.password, 'R2');
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }
            else {
                this.setState({
                    errMessage: data.message,
                });
            }
        }
        catch (e) {
            this.setState({
                errMessage: e.response.data.message,
            });
        }
    }

    // ẩn hiện password
    showOrHiddenEye = (event) => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord
        })
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    render() {
        return (
            <div className="login-wrapper">
                <HeaderAuth />
                <div className="login-container">
                    <div className="form_login">
                        <div className='col-12 text-login'>Login</div>

                        <div className='col-12 form-group '>
                            <label className='my-2'>Số Điện Thoại</label>
                            <input type='text' className='form-control input-user' placeholder='Enter your number phone' value={this.state.phone} onChange={this.handleOnchangInputPhone}></input>
                        </div>
                        <div className='col-12 form-group my-3'>
                            <label className='my-2'>Password</label>
                            <div className='input-password'>
                                <input type={this.state.isShowPassWord ? 'text' : 'password'} className='form-control' placeholder='Enter your password' value={this.state.password} onChange={this.handleOnchangInputPassword}></input>
                                <div>
                                    <i className={this.state.isShowPassWord ? 'fas fa-eye-slash show-eye ' : 'fas fa-eye show-eye'} onClick={(event) => this.showOrHiddenEye(event)}></i>
                                </div>

                            </div>
                        </div>

                        <div className="col-12 errMess">
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 div-btn-login">
                            <button className='btn-login' id='btnLogin' ref={this.btnLogin} onClick={(event) => { this.handleLogin(event) }}>Login</button>
                        </div>
                        <div className="col-12 div-forgot-pass">
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className="col-12 div-redirect-sign-up">
                            <span className='redirect-sign-up'>Không có tài khoản <Link to='/register'>Tạo tài khoản</Link></span>
                        </div>

                    </div>
                </div>
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
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
