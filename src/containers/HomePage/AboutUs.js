import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeHeader from '../Header/HeaderNotLoggedIn';
import HomeFooter from '../Footer/HomeFooter';
import './AboutUs.scss';

import tanTam from '../../assets/images/homepage/abouUs/tanTam.png';
import nhanhChong from '../../assets/images/homepage/abouUs/nhanhChong.png';
import uyTin from '../../assets/images/homepage/abouUs/uyTin.png';

class AboutUs extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <React.Fragment>
                <div className='about-us-component'>
                    <HomeHeader />

                    <div className='introduce-component'>
                        <div className='content-introduce'>
                            <p className='title-1-base'>HỆ THỐNG VẬN CHUYỂN HÀNG HÓA 2NPOST</p>
                            <span className='title-4-base'>"Hệ thống vận chuyển rộng rãi trên toàn quốc"</span>
                        </div>
                    </div>

                    <div className='introduce2-component'>
                        <div className='describe'>
                            <div className='title-1-base header-describe'>
                                HỆ THỐNG VẬN CHUYỂN HÀNG HÓA 2NPOST
                            </div>
                            <div className='text-base content-describe'>
                                Hệ thống xây dựng với mục đích giúp cho các nhà vận chuyển tìm kiểm
                                thêm nhiều khách hàng tiềm năng, quảng bá hình ảnh cũng như thương hiệu dễ dàng hơn,
                                từ đó đem lại nguồn thu nhập tốt hơn. Hệ thống cung cấp một môi trường trực tuyến
                                giúp khách hàng dễ dàng tìm kiếm, lựa chọn, đặt đơn vận chuyển từ nhiều nhà vận chuyển
                                khác nhau. Từ đó tìm kiếm được những nhà vận chuyển phù hợp, uy tín, chuyên nghiệp…
                            </div>
                        </div>
                        <div className='summary'>
                            <div className='summary_1'>
                                <img className='' src={tanTam} />
                                <span className='span-content'>
                                    <p>TẬN TÂM</p>
                                    <span>Lấy hàng tận nơi</span>
                                </span>
                            </div>
                            <div className='summary_2'>
                                <img className='' src={nhanhChong} />
                                <span className='span-content'>
                                    <p>NHANH CHÓNG</p>
                                    <span>Nhận hàng giao ngay với dịch vụ hỏa tóc</span>
                                </span>
                            </div>
                            <div className='summary_3'>
                                <img className='' src={uyTin} />
                                <span className='span-content'>
                                    <p>UY TÍN</p>
                                    <span>Mạng lưới nhà vận chuyển uy tính</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='introduce-service-component'>
                        <h2>TRẢI NGHIỆM ĐẶT HÀNG VỚI 3 DỊCH VỤ</h2>
                        <div className='servicce-component'>
                            <div className='service-1'>
                                <div className='heading-service'>
                                    <i className="fas fa-rocket service-child-logo"></i>
                                    <p className='title-1-base'>
                                        Giao hàng hỏa tốc nội thành
                                    </p>
                                </div>
                                <div className='text-service'>
                                    <li className='text-base'>Nhận hàng giao ngay</li>
                                    <li className='text-base'>Giao hàng trong 3 giờ</li>
                                    <li className='text-base'>Giá cả phải chăng</li>
                                </div>
                            </div>
                            <div className='service-2'>
                                <div className='heading-service'>
                                    <i className="fas fa-rocket service-child-logo"></i>
                                    <p className='title-1-base'>
                                        Giao hàng hỏa tốc ngoại thành
                                    </p>
                                </div>
                                <div className='text-service'>
                                    <li className='text-base'>Nhận hàng giao ngay</li>
                                    <li className='text-base'>Giao hàng trong ngày</li>
                                    <li className='text-base'>Giá cả phải chăng</li>
                                </div>
                            </div>
                            <div className='service-3'>
                                <div className='heading-service'>
                                    <i className="fas fa-rocket service-child-logo"></i>
                                    <p className='title-1-base'>
                                        Giao hàng tiêu chuẩn ngoại thành
                                    </p>
                                </div>
                                <div className='text-service'>
                                    <li className='text-base'>Giao hàng trong 12 giờ</li>
                                    <li className='text-base'>Tiết kiệm chi phí</li>
                                    <li className='text-base'>Uy tín tận tâm</li>
                                </div>
                            </div>
                        </div>
                    </div>

                    <HomeFooter />
                </div>
            </React.Fragment >
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
