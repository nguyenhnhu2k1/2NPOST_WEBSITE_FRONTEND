import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import HeaderTrans from '../header/Header';
import './Driver.scss'

class Driver extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {
        let showNav = this.props.showNav;

        return (

            <React.Fragment>

                {/* header  */}
                <HeaderTrans />

                {/* nội dung trang */}
                <div className='driver'>
                    <div className={`driver-component ${showNav ? '' : 'active-show-nav'}`}>
                        <p className='title-1-base'>QUẢN LÝ TÀI XẾ</p>

                        {/* tìm kiếm, lọc, thêm */}
                        <div className='component-1'>

                            {/* tìm kiếm */}
                            <div className='search-component'>
                                <input type="text" id="search-input" placeholder="Tìm kiếm bằng tên tài xế..." />
                            </div>

                            {/* lọc */}
                            <div className='filter-component'>
                                <select id="status-account-type">
                                    <option hidden>Trạng thái tài khoản</option>
                                    <option value="all">Tất cả</option>
                                    <option value="status-on">Tài khoảng đang hoạt động</option>
                                    <option value="status-off">Tài khoảng chưa hoạt động</option>
                                </select>
                            </div>

                            {/* thêm */}
                            <div className='add-component'>

                                {/* nút thêm */}
                                <button id="add-driver-button">
                                    <i className="fas fa-plus-circle"></i> Thêm Tài Xế
                                </button>

                            </div>
                        </div>

                        {/* bảng */}
                        <div className='component-2'>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr className='header-table'>
                                        <th>STT</th>
                                        <th>Hình ảnh</th>
                                        <th>Username</th>
                                        <th>SĐT</th>
                                        <th>Email</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>Địa chỉ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><img src='https://i.pinimg.com/564x/01/94/59/01945995d11d95a14f94de93b8b15788.jpg' alt='avatar'></img></td>
                                        <td>900</td>
                                        <td>01374</td>
                                        <td>Xe tải ô tô con loại vừa</td>
                                        <td>50</td>
                                        <td>50</td>
                                        <td>50</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td><img src='https://i.pinimg.com/564x/01/94/59/01945995d11d95a14f94de93b8b15788.jpg' alt='avatar'></img></td>
                                        <td>900</td>
                                        <td>01374</td>
                                        <td>Xe tải ô tô con loại vừa</td>
                                        <td>50</td>
                                        <td>50</td>
                                        <td>50</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* phân trang */}
                        <div className='component-3'>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button className="page-link" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </button>
                                    </li>
                                    <li className="page-item"><button className="page-link">1</button></li>
                                    <li className="page-item"><button className="page-link">2</button></li>
                                    <li className="page-item"><button className="page-link">3</button></li>
                                    <li className="page-item">
                                        <button className="page-link" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Driver);
