import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ServiceComp.scss';


class ServiceComp extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='service-comp-container row'>
                    <div className='service-parent col-sm-9'>
                        <div className='service-child'>
                            <div className='content-parent'>
                                <p className='title'>Chuyển phát tiêu chuẩn</p>
                                <p className='text-base'>Là dịch vụ nhận gửi, vận chuyển và phát nhanh chứng từ hàng
                                    hóa, vật phẩm có thứ tự ưu tiên cao nhất trong các dịch
                                    vụ chuyển phát với chỉ tiêu thời gian toàn trình không quá 24 giờ.</p>
                                <div className='btn-detail'>
                                    <span>Chi tiết</span>
                                    <i className="fas fa-long-arrow-alt-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className='service-child'>
                            <div className='content-parent'>
                                <p className='title'>Chuyển phát hỏa tốc</p>
                                <p className='text-base'>Là dịch vụ nhận gửi, vận chuyển và phát nhanh chứng từ hàng hóa,
                                    vật phẩm có thứ tự ưu tiên cao nhất trong các dịch vụ chuyển
                                    phát với chỉ tiêu thời gian toàn trình không quá 24 giờ.</p>
                                <div className='btn-detail'>
                                    <span>Chi tiết</span>
                                    <i className="fas fa-long-arrow-alt-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='service-catalog col-sm-3'>
                        <p className='title'>Dịch vụ</p>
                        <p className='content'>
                            <i className="fas fa-box-open"></i>
                            Nội thành
                        </p>
                        <p className='content'>
                            <i className="fas fa-globe"></i>
                            Ngoại thành
                        </p>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceComp);
