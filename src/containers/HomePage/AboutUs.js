import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeHeader from '../Header/HeaderNotLoggedIn';
import HomeFooter from '../Footer/HomeFooter';
import './AboutUs.scss';

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
                        <div className='title-2-base'>
                            HỆ THỐNG VẬN CHUYỂN HÀNG HÓA 2NPOST
                        </div>
                        <div className='text-base'>
                            Hệ thống xây dựng với mục đích giúp cho các nhà vận chuyển tìm kiểm thêm
                            nhiều khách hàng tiềm năng, quảng bá hình ảnh cũng như thương hiệu dễ dàng hơn, từ
                            đó đem lại nguồn thu nhập tốt hơn. Hệ thống cung cấp một môi trường trực tuyến giúp
                            khách hàng dễ dàng tìm kiếm, lựa chọn, đặt đơn vận chuyển từ nhiều nhà vận chuyển
                            khác nhau. Từ đó tìm kiếm được những nhà vận chuyển phù hợp, uy tín, chuyên
                            nghiệp…
                        </div>
                    </div>
                    <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
