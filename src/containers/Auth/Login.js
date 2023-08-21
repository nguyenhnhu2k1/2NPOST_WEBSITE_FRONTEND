/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { handleLoginAPI } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            username: 'nhunguyen@gmail.com',
            password: '10102001',
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

    // ẩn hiện mắt
    showOrHiddenEye = (event) => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord
        })
    }

    render() {

        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="form_login">
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group '>
                            <label>Username</label>
                            <input type='text' className='form-control' placeholder='Enter your username' value={this.state.username} onChange={this.handleOnchangInputUsername}></input>
                        </div>
                        <div className='col-12 form-group my-3'>
                            <label>Password</label>
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
                        <div className="col-12 my-3">
                            <button className='btn-login' onClick={(event) => { this.handleLogin(event) }}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className="col-12 login-with">
                            <span className='login-with-text'>Or Login with:</span>
                            <div className="col-12 icon-social">
                                <i className="fab fa-google google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
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
