/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";


import './Register.scss';
import './Login.scss';
import HeaderAuth from './HeaderAuth';

class Register extends Component {
    constructor(props) {
        super(props);
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

    // ẩn hiện password
    showOrHiddenEye = (event) => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord
        })
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

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                                <form className="mx-1 mx-md-4">

                                                    <div className="align-items-center mb-4">
                                                        <div className='d-flex flex-row'>
                                                            <i class="fas fa-phone fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-phone">Your Phone</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="tel" id="register-form-phone" className="form-control input-css" />
                                                        </div>
                                                    </div>

                                                    <div className="align-items-center mb-4">
                                                        <div className='d-flex flex-row'>
                                                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-password">Your Password</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" id="register-form-password" className="form-control input-css" />
                                                        </div>
                                                    </div>

                                                    <div className="align-items-center mb-4">
                                                        <div className='d-flex flex-row'>
                                                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-repeat-password">Repeat Your Password</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" id="register-form-repeat-password" className="form-control input-css" />
                                                        </div>
                                                    </div>

                                                    <div className="align-items-center mb-4">
                                                        <div className='d-flex flex-row'>
                                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-name">Your Company's Name</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="text" id="register-form-name" className="form-control input-css" />
                                                        </div>
                                                    </div>


                                                    <div className="align-items-center mb-4">
                                                        <div className='d-flex flex-row'>
                                                            <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" for="register-form-founding-date">Founding Date</label>
                                                        </div>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="date" id="register-form-founding-date" className="form-control input-css" />
                                                        </div>
                                                    </div>

                                                    <div className="form-check d-flex justify-content-center mb-5">
                                                        <input className="form-check-input me-2" type="checkbox" value="" id="terms-services" />
                                                        <label className="form-check-label" for="terms-services">
                                                            I agree to all the terms and services
                                                        </label>
                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 btn-register">
                                                        <button type="button" className="btn btn-primary btn-lg">Register</button>
                                                    </div>

                                                </form>

                                            </div>
                                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                    className="img-fluid"
                                                    alt="Sample image"
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
