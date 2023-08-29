import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import SearchComp from './overview/SearchComp';
import RegisterComp from './overview/RegisterComp';
import ServiceComp from './overview/ServiceComp';
import Introduce from './overview/Introduce';
import HomeHeader from '../Header/HeaderNotLoggedIn';
import HomeFooter from '../Footer/HomeFooter';
import './Home.scss';

import anh1 from '../../assets/images/homepage/huong_duong_1.jpg';
import anh2 from '../../assets/images/homepage/huong_duong_2.jpg';
import anh3 from '../../assets/images/homepage/huong_duong_3.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            introduce: true,
            serviceComp: false,
            searchComp: false,
            registerComp: false
        }
    }

    showIntroduce = () => {
        this.setState({
            introduce: true,
            serviceComp: false,
            searchComp: false,
            registerComp: false
        })
    }

    showServiceComp = () => {
        this.setState({
            serviceComp: true,
            introduce: false,
            searchComp: false,
            registerComp: false
        })
    }

    showSearchComp = () => {
        this.setState({
            introduce: false,
            serviceComp: false,
            searchComp: true,
            registerComp: false
        })
    }

    showRegisterComp = () => {
        this.setState({
            introduce: false,
            serviceComp: false,
            searchComp: false,
            registerComp: true
        })
    }

    render() {

        return (
            <div className='home'>
                <HomeHeader />

                {/* banner */}
                <div className='banner'>
                    {/* <!-- Carousel --> */}
                    <div id="demo" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000000">

                        {/* <!-- Indicators/dots --> */}
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                        </div>

                        {/* <!-- The slideshow/carousel --> */}
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={anh1} alt="Los Angeles" className="d-block" />
                                <div className='carousel-caption'>
                                    <h2>Chúng tôi là 2NPost</h2>
                                    <div className='content-caption'>
                                        <span>Nền tảng giao hàng tiện lợi</span>
                                        <p>Thao tác đơn giản theo dõi đơn hàng của bạn mọi lúc</p>
                                    </div>
                                    <div className='path-caption'>
                                        <a href="#">
                                            Về chúng tôi
                                            <i className="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={anh2} alt="Chicago" className="d-block" />
                                <div className='carousel-caption'>
                                    <h2>Chúng tôi là 2NPost</h2>
                                    <div className='content-caption'>
                                        <span>Chúng tôi kết nối mọi nhu cầu giao hàng của bạn</span>
                                        <p>với mạng lưới nhà vận chuyển đáng tin cậy</p>
                                    </div>
                                    <div className='path-caption'>
                                        <a href="#">
                                            Dịch vụ
                                            <i className="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={anh3} alt="New York" className="d-block" />
                                <div className='carousel-caption'>
                                    <h2>Chúng tôi là 2NPost</h2>
                                    <div className='content-caption'>
                                        <span>Khám phá một cách mới để quản lý giao hàng</span>
                                        <p>tối ưu hóa quá trình vận chuyển mang đến trải nghiệm linh hoạt thông minh</p>
                                    </div>
                                    <div className='path-caption'>
                                        <a href="#">
                                            Hợp tác
                                            <i className="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Left and right controls/icons --> */}
                        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </button>
                    </div>

                </div>

                <div className='overview'>
                    <div className='heading'>
                        <div
                            className={`introduce-component ${this.state.introduce ? 'active' : ''}`}
                            onClick={this.showIntroduce}>
                            <i className="fas fa-industry"></i>
                            Giới thiệu sản phẩm
                        </div>
                        <div
                            className={`service-component ${this.state.serviceComp ? 'active' : ''}`}
                            onClick={this.showServiceComp}>
                            <i className="fas fa-truck"></i>
                            Tổng quan dịch vụ
                        </div>
                        <div
                            className={`search-component ${this.state.searchComp ? 'active' : ''}`}
                            onClick={this.showSearchComp}>
                            <i className="fas fa-search"></i>
                            Tra cứu mã đơn
                        </div>
                        <div
                            className={`register-component ${this.state.registerComp ? 'active' : ''}`}
                            onClick={this.showRegisterComp}>
                            <i className="fas fa-user-plus"></i>
                            Đăng ký hợp tác
                        </div>
                    </div>
                    <div className='show-component'>
                        {this.state.introduce && <Introduce />}
                        {this.state.serviceComp && <ServiceComp />}
                        {this.state.searchComp && <SearchComp />}
                        {this.state.registerComp && <RegisterComp />}
                    </div>
                </div>

                <HomeFooter />
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
