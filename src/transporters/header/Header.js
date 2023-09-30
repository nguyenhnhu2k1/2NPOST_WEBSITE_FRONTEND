import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp, changeShowNavApp, changeCurrentTag } from '../../store/actions/appActions';
import { processLogout } from '../../store/actions/userActions';

import './Header.scss'

import logoIMG from '../../assets/images/logo/logo.png'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userInfo.transporterName,
        }
    }

    changeCurrentTag = (tag) => {
        this.props.changeCurrentTagAppRedux(tag);
    }

    changeShowNav = (showNav) => {
        this.props.changeShowNavAppRedux(showNav);
    }

    changeLanguage = (language) => {
        if (language === LANGUAGES.VI) language = LANGUAGES.EN;
        else language = LANGUAGES.VI;
        this.props.changeLanguageAppRedux(language)
    }

    componentDidCatch() {
        changeCurrentTag(window.location.pathname);
    }

    processLogout = () => {
        this.props.processLogoutUserRedux();
        <Route>
            <Redirect to='/login'></Redirect>
        </Route>

    }

    render() {
        let language = this.props.language;
        let showNav = this.props.showNav;
        let currentTag = this.props.currentTag ? this.props.currentTag : window.location.pathname;
        return (
            <React.Fragment>
                <div className='header-container'>
                    <div className={`left-component ${showNav ? 'active-nav' : ''}`}>

                        {/* logo */}
                        <div className='logo-component'>
                            <Link to='/transporter/dasboard'>
                                <img src={logoIMG} alt='logo' />
                            </Link>
                        </div>

                        {/* bar */}
                        <div className={`bar-component ${showNav ? '' : 'active-bar'}`}>
                            <i onClick={() => this.changeShowNav(!showNav)} className="fas fa-bars"></i>
                        </div>

                        {/* thanh nav */}
                        <div className='nav-component'>
                            <Link to="/transporter/dasboard" onClick={() => (this.changeCurrentTag('/transporter/dasboard'))} className={`${currentTag === '/transporter/dasboard' ? 'activeTag' : ''}`}> <i className="fas fa-home"></i> Bảng điều khiển</Link>
                            <Link to="/transporter/store-manager" onClick={() => (this.changeCurrentTag('/transporter/store-manager'))} className={`${currentTag === '/transporter/store-manager' ? 'activeTag' : ''}`}><i className="fas fa-store"></i> Cập nhật thông tin</Link>
                            <Link to='/transporter/driver' onClick={() => (this.changeCurrentTag('/transporter/driver'))} className={`${currentTag === '/transporter/driver' ? 'activeTag' : ''}`}><i className="far fa-user"></i> Quản lý tài xế</Link>
                            <Link to="/transporter/vehicle" onClick={() => (this.changeCurrentTag('/transporter/vehicle'))} className={`${currentTag === '/transporter/vehicle' ? 'activeTag' : ''}`}><i className="fas fa-truck"></i> QL Phương tiện</Link>
                            <Link to="/transporter/orders" onClick={() => (this.changeCurrentTag('/transporter/orders'))} className={`${currentTag === '/transporter/orders' ? 'activeTag' : ''}`} ><i className="fas fa-box-open"></i> Quản lý đơn hàng</Link>
                            {/* <Link to="/transporter/dasboard" ><i className="far fa-star"></i> Đánh giá</Link> */}
                        </div>

                    </div>
                    <div className='right-component'>

                        {/* username */}
                        <div className='user-component'>
                            <i className="fas fa-user"></i>
                            <span>{this.state.userName}</span>
                        </div>

                        {/* language */}
                        <div className='language-component'>
                            <div onClick={() => this.changeLanguage(language)}>
                                {language === LANGUAGES.VI && <span style={{ color: '#219751', border: '1px solid #219751' }}>VI</span>}
                                {language === LANGUAGES.EN && <span style={{ color: 'orange', border: '1px solid orange' }}>EN</span>}
                            </div>
                        </div>

                        {/* notification */}
                        <div className='notification-component'>
                            <i className="fas fa-bell"></i>
                        </div>

                        {/* log-out button */}
                        <div className='logout-componenet' onClick={this.processLogout}>
                            <i className="fas fa-sign-out-alt" ></i>
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
        showNav: state.app.showNav,
        currentTag: state.app.currentTag,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        changeShowNavAppRedux: (showNav) => dispatch(changeShowNavApp(showNav)),
        changeCurrentTagAppRedux: (tag) => dispatch(changeCurrentTag(tag)),
        processLogoutUserRedux: () => dispatch(processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
