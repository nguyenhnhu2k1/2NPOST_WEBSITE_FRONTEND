import React, { Component } from 'react';
import { connect } from 'react-redux';

import './RegisterComp.scss';

import registerIMG from '../../../assets/images/homepage/overview_home/register_comp.png'


class RegisterComp extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='register-comp-container'>
                    {/* nội dung */}
                    <div className='register-comp-content row'>
                        <div className='col-md-8 '>
                            <p className='title-1-base register-comp-title'>Vì sao nên trở thành đối tác của 2NPOST</p>
                            <div className='register-comp-text'>
                                <p className='text-base'>Chế độ quản lý đơn hàng: Phân loại tình trạng đơn hàng,  giúp nhà vận chuyển dễ dàng xử lý, chế độ tìm kiếm đơn hàng nhanh thông qua mã đơn hoặc tên người gửi</p>
                                <p className='text-base'>Phân công và quản lý tài xế: giúp doanh nghiệp dễ dàng nắm được lịch trình làm việc của tài xế, phân công tài xế hiệu quả cho những đơn hàng hỏa tốc.</p>
                                <p className='text-base'> Quản lí phương tiện vận chuyển: phương tiện vận chuyển chính là điểm khác biệt của mỗi nhà vận chuyển. Nhà vận chuyển tạo ra phương tiện và hiển thị lên trang thông tin, giúp người dùng dễ dàng lựa chọn.</p>
                                <p className='text-base'>Nhận thông báo đơn hàng: Hệ thống sẽ tự động gửi thông báo đơn hàng dến cho những nhà vận chuyển phù hợp</p>
                                <p className='text-base'>Thống kê: Chức năng thống kê đơn hàng theo ngày/ tháng cho nhà vận chuyển dễ dàng nắm được tình hình hoạt động cũng như doanh thu</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <img src={registerIMG} alt='' />
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComp);
