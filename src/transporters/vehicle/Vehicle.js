import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import HeaderTrans from '../header/Header';
import './Vehicle.scss'

class Vehicle extends Component {
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
                <div className='vehicle'>
                    <div className={`vehicle-component ${showNav ? '' : 'active-show-nav'}`}>
                        <p className='title-1-base'>QUẢN LÝ PHƯƠNG TIỆN VẬN CHUYỂN</p>

                        {/* tìm kiếm, lọc, thêm */}
                        <div className='component-1'>

                            {/* tìm kiếm */}
                            <div className='search-component'>
                                <input type="text" id="search-input" placeholder="Tìm kiếm bằng biển số xe..." />
                            </div>

                            {/* lọc */}
                            <div className='filter-component'>
                                <select id="vehicle-type">
                                    <option hidden>Loại xe</option>
                                    <option value="all">Tất cả</option>
                                    <option value="motorcycle">Xe máy</option>
                                    <option value="car">Ô tô con</option>
                                    <option value="truck">Xe tải</option>
                                </select>
                            </div>

                            {/* thêm */}
                            <div className='add-component'>


                                {/* nút thêm */}
                                <button id="add-vehicle-button"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="fas fa-plus-circle"></i> Thêm Phương Tiện
                                </button>

                                {/* form thêm phương tiện vận chuyển */}
                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Thêm phương tiện vận chuyển</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">

                                                {/* thêm ảnh */}
                                                <div className='picture'>
                                                    <div className="mb-3">
                                                        <label for="formFileImg" className="form-label">Hình ảnh phương tiện: </label>
                                                        <input className="form-control" type="file" id="formFileImg" accept='image/*' />
                                                    </div>
                                                </div>

                                                {/* loai xe */}
                                                <div className='vehicle-type input-group mb-3'>
                                                    <label for="vehicle-type" className='input-group-text label-vehicle'>Loại xe</label>
                                                    <select id="vehicle-type" className="form-select">
                                                        <option value="motorcycle">Xe máy</option>
                                                        <option value="car">Ô tô con</option>
                                                        <option value="truck">Xe tải</option>
                                                    </select>
                                                </div>

                                                {/* khối lượng */}
                                                <div className='weight input-group mb-3'>
                                                    <label for="weight" className='input-group-text label-weight'>Khối lượng</label>
                                                    <select id="weight" className="form-select">
                                                        <option value="">{'>'}20kg</option>
                                                    </select>
                                                </div>

                                                {/* biển số xe */}
                                                <div className='license-plates'>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="license-plates">Biển số xe</span>
                                                        <input type="text" className="form-control" placeholder="Nhập vào biển số xe" for='license-plates' />
                                                    </div>
                                                </div>

                                                {/* mô tả */}
                                                <div className='describe input-group mb-3'>
                                                    <label for='describe' className='input-group-text label-describe'>Mô tả</label>
                                                    <input type="text" className="form-control" placeholder="Nhập vào mô tả" for='license-plates' />
                                                </div>

                                                <div className='status-vehicle input-group mb-3'>
                                                    <label for='status-vehicle' className='input-group-text'>Trạng thái xe </label>
                                                    <div className='form-control status'>
                                                        <div>
                                                            <input type="radio" id="status-on" name='status' value="on" />
                                                            <label for="status-on">Bật</label><br />
                                                        </div>
                                                        <div>
                                                            <input type="radio" id="status-off" name='status' value="off" />
                                                            <label for="status-off">Tắt</label><br />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                                                <button type="button" className="btn btn-primary">Lưu thay đổi</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* bảng */}
                        <div className='component-2'>
                            <table style={{ width: '100%' }}>
                                <tr className='header-table'>
                                    <th>STT</th>
                                    <th>Loại xe</th>
                                    <th>Tải trọng</th>
                                    <th>Biển số xe</th>
                                    <th>Mô tả</th>
                                    <th>Trạng thái</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Xe tải</td>
                                    <td>900</td>
                                    <td>01374</td>
                                    <td>Xe tải ô tô con loại vừa</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Xe tải</td>
                                    <td>900</td>
                                    <td>01374</td>
                                    <td>Xe tải ô tô con loại vừa</td>
                                    <td>50</td>
                                </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
