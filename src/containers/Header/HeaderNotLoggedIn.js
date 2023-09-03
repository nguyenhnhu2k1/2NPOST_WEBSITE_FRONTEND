import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { Link } from 'react-router-dom'


import './HeaderNotLoggedIn.scss';
import ViLogo from '../../assets/images/logo/vi.jpg'
import EnLogo from '../../assets/images/logo/en.jpg'
class HeaderNotLoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowAccInfo: false,
        }
    }

    changeIsShowAccInfoTrue = () => {
        this.setState({
            isShowAccInfo: true
        })
    }

    changeIsShowAccInfoFalse = () => {
        this.setState({
            isShowAccInfo: false
        })
    }

    changeLanguage = (language) => {
        if (language === LANGUAGES.VI) language = LANGUAGES.EN;
        else language = LANGUAGES.VI;
        console.log(language);
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;
        return (
            //header
            <React.Fragment>
                <div className='header-not-logged-in-container'>
                    <div className='logo-header-not-logged-in-container'>
                        <div className='logo-icon'></div>
                    </div>
                    <div className='nav-container'>
                        <div><Link to='/home'><FormattedMessage id="login.header-home" /></Link></div>
                        <div><Link to='/about_us'><FormattedMessage id="login.header-about" /></Link></div>
                        <div><Link to='#'><FormattedMessage id="login.header-service" /></Link></div>
                        <div><Link to='#'><FormattedMessage id="login.header-customer" /></Link></div>
                    </div>
                    <div className='other-container'>
                        <div className='lang-container'>
                            <div onClick={() => this.changeLanguage(language)}>
                                {language === LANGUAGES.VI && <img className='logo-lang' src={ViLogo}></img>}
                                {language === LANGUAGES.EN && <img className='logo-lang' src={EnLogo}></img>}
                                {language}
                            </div>
                        </div>

                        <div className='acc-container'>

                            <div className='acc-btn'>
                                <button className="acc-btn-a"
                                    onMouseEnter={this.changeIsShowAccInfoTrue}
                                    onMouseLeave={this.changeIsShowAccInfoFalse}>
                                    <i className="far fa-user"></i>
                                </button>
                            </div>

                            {/* thông tin tài khoản khi click button user */}
                            <div className='div-acc-info'
                                onMouseEnter={this.changeIsShowAccInfoTrue}
                                onMouseLeave={this.changeIsShowAccInfoFalse}>
                                {this.state.isShowAccInfo && (
                                    <div className='acc-info'
                                        onMouseEnter={this.changeIsShowAccInfoTrue}
                                        onMouseLeave={this.changeIsShowAccInfoFalse}>
                                        <p className='welcome'>Chào mừng đến với 2NSpost</p>
                                        <button className='login-info'>Đăng Nhập</button>
                                        <button className='signup-info'>Hợp Tác Làm Nhà Vận Chuyển</button>
                                        <p className='policy'>Xem thêm về chính sách của chúng tôi <a href='#'>Tại Đây</a></p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='search-container'>
                            <input type='text' />
                            <i className="fas fa-search"></i>
                        </div>

                    </div>
                </div>
            </React.Fragment >
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNotLoggedIn);
