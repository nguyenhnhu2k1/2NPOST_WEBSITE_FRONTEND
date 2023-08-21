import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;

        return (
            //header
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        {/* left content */}
                        <div className='left-content'>
                            <i className="fas fa-bars menu"></i>
                            <div className='logo'></div>
                        </div>
                        {/* center content */}
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="header-container.specialty"></FormattedMessage></b></div>
                                <div className='subs-title'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='subs-title'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='subs-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='subs-title'>Gói sức khỏe tổng quát</div>
                            </div>
                        </div>
                        {/* right content */}
                        <div className='right-content'>
                            <div className='icon-support'><i className="fas fa-question-circle"></i>Hỗ trợ</div>
                            {/* với LANGUAGES.EN là hằng số trong hàm constant.js */}
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>Tiếng Anh</span></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>Việt Nam</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='content1'>NỀN TẢNG Y TẾ</div>
                        <div className='content2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <div className='design-search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm kiếm chuyên khoa'></input>
                            </div>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <i className="fas fa-hospital"></i>
                            <div className='text'>Khám chuyên khoa</div>
                        </div>
                        <div className='option'>
                            <i className="fas fa-mobile-alt"></i>
                            <div className='text'>Khám từ xa</div>
                        </div>
                        <div className='option'>
                            <i className="fas fa-bed"></i>
                            <div className='text'>Khám tổng quát</div>
                        </div>
                        <div className='option'>
                            <i className="fas fa-prescription-bottle-alt"></i>
                            <div className='text'>Xét nghiệm y học</div>
                        </div>
                        <div className='option'>
                            <i className="fas fa-walking"></i>
                            <div className='text'>Sức khỏe tinh thần</div>
                        </div>
                        <div className='option'>
                            <i className="fas fa-heartbeat"></i>
                            <div className='text'>Khám nha khoa</div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
