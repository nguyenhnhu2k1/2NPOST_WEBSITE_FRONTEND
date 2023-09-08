import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import HomeHeader from '../Header/HeaderNotLoggedIn';
import HomeFooter from '../Footer/HomeFooter';
import './AboutUs.scss';

import tanTam from '../../assets/images/homepage/abouUs/tanTam.png';
import nhanhChong from '../../assets/images/homepage/abouUs/nhanhChong.png';
import uyTin from '../../assets/images/homepage/abouUs/uyTin.png';
import downloadAPK from '../../assets/images/homepage/abouUs/Download-APK-from-Play-Store.png'

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
                        <h2 className='title-1-base'>TRẢI NGHIỆM ĐẶT HÀNG VỚI 3 DỊCH VỤ</h2>
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
                                    <i class="fas fa-truck"></i>
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
                    {/* Gợi ý download cho người dùng khách hàng*/}
                    <div className='download-customer-component'>

                        <h2 className='title-1-base'>TẢI APP KHÁCH HÀNG</h2>
                        <div className='download-customer row'>
                            <div className='download-container col-md-4 title-1-base'>
                                <div className='download-title'>
                                    Mạng lưới giao hàng <br /> trên 63 tỉnh thành
                                </div>
                                <div className='download-link'>
                                    <Link to='/login'>
                                        < img src={downloadAPK} />
                                    </Link>
                                </div>
                            </div>

                            <div className='content-container col-md-8'>
                                <div className='number-Of-Users'>
                                    <i className="fas fa-users"></i>
                                    <div className='title-3-base'>
                                        <p>HÀNG NGHÌN</p>
                                        <span>KHÁCH HÀNG TIN DÙNG</span>
                                    </div>
                                </div>
                                <div className='number-Of-Orders'>
                                    <i className="fas fa-box-open"></i>
                                    <div className='title-3-base'>
                                        <p>HÀNG NGHÌN</p>
                                        <span>ĐƠN HÀNG ĐANG VẬN CHUYỂN</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='ordering-process-component'>
                        <div className='title-1-base ordering-header'>
                            QUY TRÌNH ĐẶT HÀNG
                        </div>
                        <div className='ordering-content'>
                            <div className='step-1'>
                                <div className='step-heading title-3-base'>
                                    <i class="fas fa-star"></i>
                                    Bước 1
                                </div>
                                <div className='step-content'>Tạo đơn hàng</div>
                            </div>
                            <div className='step-2'>
                                <div className='step-heading title-3-base'>
                                    <i class="fas fa-star"></i>
                                    Bước 2
                                </div>
                                <div className='step-content'>Nhập thông tin đơn hàng</div>
                            </div>
                            <div className='step-3'>
                                <div className='step-heading title-3-base'>
                                    <i class="fas fa-star"></i>
                                    Bước 3
                                </div>
                                <div className='step-content'>Thanh toán</div>
                            </div>
                            <div className='step-4'>
                                <div className='step-heading title-3-base'>
                                    <i class="fas fa-star"></i>
                                    Bước 4
                                </div>
                                <div className='step-content'>Tài xế đến lấy hàng</div>
                            </div>
                            <div className='step-5'>
                                <div className='step-heading title-3-base'>
                                    <i class="fas fa-star"></i>
                                    Bước 5
                                </div>
                                <div className='step-content'>Giao hàng đến tay người nhận</div>
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
