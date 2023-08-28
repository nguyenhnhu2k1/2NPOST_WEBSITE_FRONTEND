/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { handleLoginAPI } from '../../services/userService';
import HeaderAuth from './HeaderAuth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            username: '',
            password: '',
            isShowPassWord: false,
            errMessage: '',
        }
    }

    //xử lý nhập vào username
    handleOnchangInputUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    //xử lý nhập vào password
    handleOnchangInputPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    //xử lý đăng nhập
    handleLogin = async (event) => {
        this.setState({
            errMessage: ''
        });

        try {
            let data = await handleLoginAPI(this.state.username, this.state.password);
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.User);
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

    render() {
        console.log('check Login Page', this.props.isLoggedIn)
        return (
            <div className="login-wrapper">
                <HeaderAuth />
                <div className="login-container">
                    <div className="form_login">
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group '>
                            <label className='my-2'>Username</label>
                            <input type='text' className='form-control input-user' placeholder='Enter your username' value={this.state.username} onChange={this.handleOnchangInputUsername}></input>
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
                            <button className='btn-login' onClick={(event) => { this.handleLogin(event) }}>Login</button>
                        </div>
                        <div className="col-12 div-forgot-pass">
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className="col-12 div-redirect-sign-up">
                            <span className='redirect-sign-up'>Không có tài khoản <a>Tạo tài khoản</a></span>
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
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
