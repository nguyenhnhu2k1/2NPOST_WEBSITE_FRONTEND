import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ServiceComp.scss';

class ServiceComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceCatalog: 0,
        }
    }

    handleClickServiceCatalog = (index) => {
        this.setState({
            serviceCatalog: index,
        })
    }

    render() {
        let { serviceCatalog } = this.state;

        return (
            <React.Fragment>
                <div className='service-comp-container animation-rise-base row'>
                    <div className='service-catalog col-md-3 col-sm-4 px-3 order-sm-2'>
                        <p className='title title-3-base'>Dịch vụ</p>
                        <p
                            className='content title-4-base'
                            onClick={() => this.handleClickServiceCatalog(0)}
                        >
                            <i className="fas fa-box-open"></i>
                            Nội thành
                        </p>
                        <p
                            className='content title-4-base'
                            onClick={() => this.handleClickServiceCatalog(1)}
                        >
                            <i className="fas fa-globe"></i>
                            Ngoại thành
                        </p>
                    </div>
                    <div className='service-parent col-md-9 col-sm-8 order-sm-1 px-3'>
                        {(serviceCatalog === 0)
                            &&
                            <div className='service-child'>
                                <div className='content-parent'>
                                    <i className="fas fa-rocket service-child-logo"></i>
                                    <p className='title-1-base'>Chuyển phát hỏa tốc nội thành</p>
                                    <p className='text-base'>Là dịch vụ nhận gửi, vận chuyển và phát nhanh chứng từ hàng hóa,
                                        vật phẩm có thứ tự ưu tiên cao nhất trong các dịch vụ chuyển
                                        phát với chỉ tiêu thời gian toàn trình không quá 24 giờ.</p>
                                    <div className='btn-detail'>
                                        <span className='title-4-base'>Chi tiết</span>
                                        <i className="fas fa-long-arrow-alt-right"></i>
                                    </div>
                                </div>
                            </div>
                        }
                        {(serviceCatalog === 1)
                            &&
                            <>
                                <div className='service-child'>
                                    <div className='content-parent'>
                                        <i className="fas fa-truck service-child-logo"></i>
                                        <p className='title-1-base'>Chuyển phát tiêu chuẩn ngoại thành</p>
                                        <p className='text-base'>Là dịch vụ nhận gửi, vận chuyển và phát nhanh chứng từ hàng
                                            hóa, vật phẩm có thứ tự ưu tiên cao nhất trong các dịch
                                            vụ chuyển phát với chỉ tiêu thời gian toàn trình không quá 24 giờ.</p>
                                        <div className='btn-detail'>
                                            <span className='title-4-base'>Chi tiết</span>
                                            <i className="fas fa-long-arrow-alt-right"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='service-child'>
                                    <div className='content-parent'>
                                        <i className="fas fa-rocket service-child-logo"></i>
                                        <p className='title-1-base'>Chuyển phát hỏa tốc ngoại thành</p>
                                        <p className='text-base'>Là dịch vụ nhận gửi, vận chuyển và phát nhanh chứng từ hàng hóa,
                                            vật phẩm có thứ tự ưu tiên cao nhất trong các dịch vụ chuyển
                                            phát với chỉ tiêu thời gian toàn trình không quá 24 giờ.</p>
                                        <div className='btn-detail'>
                                            <span className='title-4-base'>Chi tiết</span>
                                            <i className="fas fa-long-arrow-alt-right"></i>
                                        </div>
                                    </div>
                                </div></>
                        }

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
