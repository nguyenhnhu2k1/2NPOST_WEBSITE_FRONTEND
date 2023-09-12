import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import HeaderTrans from '../header/Header';
import './StoreManager.scss'

class StoreManager extends Component {

    render() {
        let showNav = this.props.showNav;
        console.log(showNav);
        return (
            <React.Fragment>

                {/* header  */}
                <HeaderTrans />

                {/* nội dung trang */}
                <div className='store-manager'>
                    <div className={`store-manager-component ${showNav ? '' : 'active-show-nav'}`}>

                        <p className='title-1-base'>THÔNG TIN NHÀ VẬN CHUYỂN</p>

                        {/* toàn bộ form thông tin */}
                        <div className='information-transporter'>

                            {/* cập nhật thông tin tài khoản */}
                            <div className='information-component'>
                                <p className='title-3-base'>THÔNG TIN TÀI KHOẢN</p>
                                <form>

                                    <div className='info-form-component'>
                                        <label for="transporterName" className="form-label">Tên doanh nghiệp</label>
                                        <input type="text" id="transporterName" className="form-control" />


                                        <label for="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control" />


                                        <label for="phone" className="form-label">Phone</label>
                                        <input type="tel" id="phone" className="form-control" />


                                        <label for="founding-date" className="form-label">Ngày thành lập</label>
                                        <input type="date" id="founding-date" className="form-control" />
                                    </div>

                                    <div className='container-select row'>
                                        {/* cập nhật phạm vi vận chuyển */}
                                        <div className='scope-component col-md-6'>
                                            <p className='title-3-base'>PHẠM VI VẬN CHUYỂN</p>
                                            <div className="scope-select">

                                                <p> Chọn phạm vi vận chuyển có thể lấy hàng và giao hàng: </p>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Nội Thành</label>
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Toàn Quốc</label>
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Miền Nam</label>
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Miền Trung</label>
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Miền Bắc</label>
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>

                                            </div>

                                        </div>

                                        {/* cập nhật dịch vụ cung cấp */}
                                        <div className='service-component col-md-6'>
                                            <p className='title-3-base'>DỊCH VỤ CUNG CẤP</p>

                                            <div className='service-select'>
                                                <p className=''>Chọn loại dịch vụ có thể cung cấp: </p>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Vận chuyển hỏa tốc nội thành</label>
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Vận chuyển hỏa tốc ngoại thành</label>
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Vận chuyển tiêu chuẩn ngoại thành</label>
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='button-div'>
                                        <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                                    </div>
                                </form>
                            </div>




                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        showNav: state.app.showNav,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreManager);
