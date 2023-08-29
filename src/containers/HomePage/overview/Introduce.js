import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Introduce.scss';


class Introduce extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='introduce-container'>
                    <h3>2NPost là hệ thống trực tuyến kết nối giữa khách hàng với nhà vận chuyển</h3>
                    <div className='app-customer'>
                        <h3>App khách hàng</h3>
                        <p> App khách hàng hỗ trợ cả HĐH Android và IOS với giao diện thông dụng
                            và gần gũi với đa số khách hàng giúp người dùng dễ dàng trải nghiệm.
                            Tại đây khách hàng có thể yên tâm lựa chọn các nhà vận chuyển phù hợp
                            với nhu cầu giao hàng của bản thân, mang đến một trải nghiệm chất lượng và uy tín.</p>
                    </div>
                    <div className='web-transporter'>
                        <h3>Website cho nhà vận chuyển</h3>
                        <p>Nhà vận chuyển có thể đăng nhập và sử dụng ngay tại website giúp họ dễ dàng theo dõi đơn hàng
                            và quản lý tài xế hiệu quả. Mỗi nhà vận chuyển có thể tạo ra các tài khoản dành cho tài xế,
                            giúp nhà vận chuyển quản lý được tiến độ và cả giờ công của tài xế</p>
                    </div>
                    <div className='app-driver'>
                        <h3>App tài xế</h3>
                        <p>App dành cho tài xế cũng hỗ trợ cả HĐH Androi và IOS, giao diện đơn giản với chức năng chính là cập nhật thông tin đơn hàng</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Introduce);
