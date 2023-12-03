import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { Link } from 'react-router-dom'


import './HeaderNotLoggedIn.scss';
import ViLogo from '../../assets/images/logo/vi.jpg'
import EnLogo from '../../assets/images/logo/en.jpg'
import logoIMG from '../../assets/images/logo/logo.png'

class HeaderNotLoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNav: false,
        }
    }

    changeLanguage = (language) => {
        if (language === LANGUAGES.VI) language = LANGUAGES.EN;
        else language = LANGUAGES.VI;
        this.props.changeLanguageAppRedux(language)
    }

    changeShowNav = () => {
        this.setState({
            showNav: !this.state.showNav
        })
    }

    render() {
        let language = this.props.language;
        return (
            //header
            <React.Fragment>
                <div className='header-not-logged-in-container'>
                    <div className='logo-header-not-logged-in-container'>
                        <Link to='/home'>
                            <img src={logoIMG} alt='logo' />
                        </Link>
                    </div>
                    <div className={`nav-container ${this.state.showNav ? 'active-nav' : ''}`}>
                        <div><Link to='/home'><FormattedMessage id="login.header-home" /></Link></div>
                        <div><Link to='/home/about_us'><FormattedMessage id="login.header-about" /></Link></div>
                        <div><Link to='/home'><FormattedMessage id="login.header-service" /></Link></div>
                        <div><Link to='/home'><FormattedMessage id="login.header-customer" /></Link></div>
                    </div>
                    <div className='other-container'>
                        <div className='lang-container'>
                            <div onClick={() => this.changeLanguage(language)}>
                                {language === LANGUAGES.VI && <img className='logo-lang' src={ViLogo} alt='' />}
                                {language === LANGUAGES.EN && <img className='logo-lang' src={EnLogo} alt='' />}
                            </div>
                        </div>

                        <div className='acc-container'>

                            <div className='acc-btn'>
                                <button className="acc-btn-a">
                                    <i className="far fa-user"></i>
                                </button>
                            </div>

                            {/* thông tin tài khoản khi click button user */}
                            <div className='div-acc-info'>
                                <div className='acc-info'>
                                    <p className='welcome'>Chào mừng đến với 2NSpost</p>
                                    <Link to='/login'>
                                        <button className='login-info'>Đăng Nhập</button>
                                    </Link>
                                    <Link to='/register'>
                                        <button className='signup-info'>Hợp Tác Làm Nhà Vận Chuyển</button>
                                    </Link>
                                    <p className='policy'>Xem thêm về chính sách của chúng tôi <a href='/home'>Tại Đây</a></p>
                                </div>
                            </div>
                        </div>

                        <div className={`search-container ${this.state.showNav ? 'active-search' : ''}`}>
                            <input type='text' />
                            <i className="fas fa-search"></i>
                        </div>
                        <div className='bar-container'>
                            {this.state.showNav ? <i onClick={this.changeShowNav} className="fas fa-times"></i> : <i onClick={this.changeShowNav} className="fas fa-bars"></i>}
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
