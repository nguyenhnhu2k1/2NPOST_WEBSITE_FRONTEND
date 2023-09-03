import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SearchComp.scss';


class SearchComp extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='search-comp-container animation-rise-base'>
                    <p className='title-1-base'>Tra cứu mã đơn hàng</p>
                    <p className='title-5-base'>(Xem thông tin đơn hàng hiện tại của bạn bằng cách nhập vào ID đơn hàng)</p>
                    <p className='text-base'> App khách hàng hỗ trợ cả HĐH Android và IOS với giao diện thông dụng
                        và gần gũi với đa số khách hàng giúp người dùng dễ dàng trải nghiệm.
                        Tại đây khách hàng có thể yên tâm lựa chọn các nhà vận chuyển phù hợp
                        với nhu cầu giao hàng của bản thân, mang đến một trải nghiệm chất lượng và uy tín.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchComp);
