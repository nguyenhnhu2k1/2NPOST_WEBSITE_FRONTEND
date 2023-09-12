import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp, changeShowNavApp } from '../../store/actions/appActions';

import Dashboard from '../dashboard/Dashboard'
import './Header.scss'

import logoIMG from '../../assets/images/logo/logo.png'

class Header extends Component {

    changeShowNav = (showNav) => {
        this.props.changeShowNavAppRedux(showNav);
    }

    changeLanguage = (language) => {
        if (language === LANGUAGES.VI) language = LANGUAGES.EN;
        else language = LANGUAGES.VI;
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;
        let showNav = this.props.showNav;
        return (
            <React.Fragment>
                <div className='header-container'>
                    <div className={`left-component ${showNav ? 'active-nav' : ''}`}>

                        {/* logo */}
                        <div className='logo-component'>
                            <Link to={Dashboard}>
                                <img src={logoIMG} alt='logo' />
                            </Link>
                        </div>

                        {/* bar */}
                        <div className={`bar-component ${showNav ? '' : 'active-bar'}`}>
                            <i onClick={() => this.changeShowNav(!showNav)} className="fas fa-bars"></i>
                        </div>

                        {/* thanh nav */}
                        <div className='nav-component'>
                            <div>
                                <i className="fas fa-home"></i>
                                <Link to="/transporter/dasboard">Bảng điều khiển</Link>
                            </div>
                            <div>
                                <i className="fas fa-store"></i>
                                <Link to="/transporter/store-manager">Cập nhật thông tin</Link>
                            </div>
                            <div>
                                <i className="far fa-user"></i>
                                <Link to={Dashboard}>Quản lý tài xế</Link>
                            </div>
                            <div>
                                <i className="fas fa-truck"></i>
                                <Link to={Dashboard}>QL Phương tiện</Link>
                            </div>
                            <div>
                                <i className="fas fa-box-open"></i>
                                <Link to={Dashboard}>Quản lý đơn hàng</Link>
                            </div>
                            <div>
                                <i className="far fa-star"></i>
                                <Link to={Dashboard}>Đánh giá</Link>
                            </div>
                        </div>
                    </div>
                    <div className='right-component'>

                        <div className='user-component'>
                            <i className="fas fa-user"></i>
                            <span>user-name</span>
                        </div>
                        <div className='language-component'>
                            <div onClick={() => this.changeLanguage(language)}>
                                {language === LANGUAGES.VI && <span style={{ color: '#219751', border: '1px solid #219751' }}>VI</span>}
                                {language === LANGUAGES.EN && <span style={{ color: 'orange', border: '1px solid orange' }}>EN</span>}
                            </div>
                        </div>
                        <div className='notification-component'>
                            <i className="fas fa-bell"></i>
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
        language: state.app.language,
        showNav: state.app.showNav
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        changeShowNavAppRedux: (showNav) => dispatch(changeShowNavApp(showNav)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
