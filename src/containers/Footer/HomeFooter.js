import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import Login from '../Auth/Login';
import './HomeFooter.scss';
import fbIcon from '../../assets/images/social/fb1.png';
import zaloIcon from '../../assets/images/social/Group-5897.png';
import mailIcon from '../../assets/images/social/Vector-4.png';

class Home extends Component {

    render() {

        return (
            <div className='footer-container'>
                <div className='footer-info'>
                    <div className='component_1'>
                        <h4>HỆ THỐNG GIAO HÀNG UY TÍN 2NPOST</h4>
                        <p>2NPOST là dịch vụ hỗ trợ giao hàng nhanh chóng, giúp khách hàng và nhà vận chuyện có nhiều cơ hội hợp tác với nhau.</p>
                        <div className='contact'>
                            <h4>THÔNG TIN LIÊN HỆ</h4>
                            <p>
                                <i className="fa fa-paper-plane"></i>
                                Giấy chứng nhận Đăng ký Kinh doanh số: ______ do Phòng ĐKKD Thành phố Cần Thơ Cấp lần đầu ngày 01/09/2023
                            </p>
                            <div>
                                <p>
                                    <i className="fa fa-envelope"></i>
                                    cskh@2npost.com.vn
                                </p>
                            </div>
                            <div>
                                <p className='phone'>
                                    <i className="fas fa-phone"></i>
                                    <span>19008095</span>
                                </p>
                            </div>
                        </div>
                        <div className='connect'>
                            <h4>Kết nối cùng 2NPost</h4>
                            <div className='social-icon'>
                                <img src={fbIcon} alt='Facebook icon'></img>
                                <img src={mailIcon} alt='Email icon'></img>
                                <img src={zaloIcon} alt='Zalo icon'></img>
                            </div>
                        </div>
                    </div>
                    <div className='component_2'>
                        <h4>Về 2NPOST</h4>
                        <div className='about-us-link'>
                            <Link to='/login'>
                                Về chúng tôi
                            </Link>
                            <Link to='/login'>
                                Dịch vụ
                            </Link>
                            <Link to='/login'>
                                Tin tức
                            </Link>
                        </div>
                    </div>
                    <div className='component_3'>
                        <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                        <div className='support-customer'>
                            <Link to='/login'>
                                Hướng dẫn sử dụng
                            </Link>
                            <Link to='/login'>
                                Câu hỏi thường gặp
                            </Link>
                            <Link to='/login'>
                                Góp ý dịch vụ
                            </Link>
                        </div>
                    </div>
                    <div className='component_4'>
                        <h4>HỢP TÁC LÀM NHÀ VẬN CHUYỂN</h4>
                        <div className='cooperate'>
                            <div className='phone'>
                                <i className="fas fa-phone"></i>
                                <span>0901258578</span>
                            </div>
                            <div className='mail'>
                                <i className="fa fa-envelope"></i>
                                <span>nvc@2npost.com.vn</span>
                            </div>
                        </div>
                        <div className='register-link'>
                            <Link to='/register'>Đăng ký ngay</Link>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='copyright'>
                    &copy;2NPost 2023
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
