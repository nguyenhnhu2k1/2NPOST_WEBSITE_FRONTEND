import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts';

import SelectSmall from './SelectSmall ';
import HeaderTrans from '../header/Header';
import './Dashboard.scss'

class Dashboard extends Component {

    render() {
        let showNav = this.props.showNav;
        const items = [];

        for (let i = 1; i <= 12; i++) {
            items.push({ value: i, month: 'Tháng ' + i });
        }

        return (
            <React.Fragment>
                <HeaderTrans />
                <div className={`dashboard-component ${showNav ? '' : 'active-show-nav'}`}>

                    {/* Thống kê */}
                    <p className='title-1-base'>Thống kê</p>
                    <div className='component-1'>
                        {/* thống kê */}
                        <div className='statistics'>
                            <div className='order-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/1356/1356594.png' alt='order' />
                                <div>Tổng đơn hàng</div>
                                <div>0</div>
                            </div>
                            <div className='revenue-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/4577/4577278.png' alt='revenue' />
                                <div>Tổng doanh thu</div>
                                <div>0</div>
                            </div>
                            <div className='revenue-after-tax-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/10112/10112409.png' alt='order' />
                                <div>Tổng doanh thu sau chiết khấu</div>
                                <div>0</div>
                            </div>
                        </div>
                        {/* biểu đồ */}
                        <div className='chart-statistics'>
                            <div className='pie-chart'>
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: 10, label: 'Hỏa tốc ngoại thành', color: '#f28e2c' },
                                                { id: 1, value: 15, label: 'Hỏa tốc nội thành', color: '#59a14f' },
                                                { id: 2, value: 20, label: 'Tiêu chuẩn ngoại thành', color: '#76b7b2' },
                                            ],
                                        },
                                    ]}
                                    width={350}
                                    height={200}
                                />
                                <span>Biểu đồ sử dụng dịch vụ của doanh nghiệp</span>
                            </div>
                            <div className='driver-vehicle'>
                                <img src='https://cdn-icons-png.flaticon.com/512/2481/2481723.png' alt='' />
                                <div className='driver'>
                                    <div>Số tài xế: </div>
                                    <div>10</div>
                                </div>
                                <img src='https://cdn-icons-png.flaticon.com/512/7429/7429301.png' alt='' />
                                <div className='vehicle'>
                                    <div>Số phương tiện: </div>
                                    <div>10</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thống kê theo tháng */}
                    <div className='component-2'>
                        <div className='title-by-month'>
                            <p className='title-1-base'>Thống kê theo tháng</p>
                            <div className='select-by-month' >
                                <SelectSmall labelProp='Month' itemSelect={items} />
                            </div>
                        </div>

                        {/* doanh thu */}
                        <div className='revenue-statistics-by-month'>
                            <div className='revenue'>
                                <img src='https://cdn-icons-png.flaticon.com/512/762/762613.png' alt='order' />
                                <div>Tổng doanh Thu</div>
                                <div>0</div>
                            </div>
                            <div className='tax'>
                                <img src='https://cdn-icons-png.flaticon.com/512/4222/4222023.png' alt='revenue' />
                                <div>Tổng chiết khấu</div>
                                <div>0</div>
                            </div>
                            <div className='revenue-after-tax'>
                                <img src='https://cdn-icons-png.flaticon.com/512/4021/4021642.png' alt='order' />
                                <div>Tổng doanh thu sau chiết khấu</div>
                                <div>0</div>
                            </div>
                        </div>

                        {/* đơn hàng */}
                        <div className='order-statistics-by-month'>
                            <div className='order'>
                                <img src='https://cdn-icons-png.flaticon.com/512/3500/3500833.png' alt='order' />
                                <div>Tổng đơn hàng</div>
                                <div>0</div>
                            </div>
                            <div className='pending'>
                                <img src='https://cdn-icons-png.flaticon.com/512/5978/5978235.png' alt='revenue' />
                                <div>Đơn hàng đang xử lý</div>
                                <div>0</div>
                            </div>
                            <div className='success'>
                                <img src='https://cdn-icons-png.flaticon.com/512/148/148767.png' alt='order' />
                                <div>Đon hàng thành công</div>
                                <div>0</div>
                            </div>
                            <div className='cancel'>
                                <img src='https://cdn-icons-png.flaticon.com/512/2037/2037541.png' alt='order' />
                                <div>Đơn hàng đã hủy</div>
                                <div>0</div>
                            </div>
                        </div>

                        {/* biểu đồ */}
                        <div className='chart'>
                            <div className='revenue-chart'>
                                <LineChart
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                                            area: true,
                                            color: '#04676d',
                                        },

                                    ]}
                                    width={400}
                                    height={300}
                                />
                                <span>Tổng doanh thu trong 10 tháng gần nhất</span>
                            </div>
                            <div className='order-chart'>
                                <LineChart
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                                            area: true,
                                            color: '#04676d',
                                        },
                                    ]}
                                    width={400}
                                    height={300}
                                />
                                <span>Tổng đơn hàng trong 10 tháng gần nhất</span>
                            </div>
                        </div>

                    </div>

                    {/* Thống kê theo ngày */}
                    <div className='component-3'>
                        <p className='title-1-base'>Thống kê theo ngày</p>
                        {/* thống kê theo ngày*/}
                        <div className='statistics'>
                            <div className='order-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/1356/1356594.png' alt='order' />
                                <div>Tổng đơn hàng</div>
                                <div>0</div>
                            </div>
                            <div className='revenue-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/4577/4577278.png' alt='revenue' />
                                <div>Tổng doanh thu</div>
                                <div>0</div>
                            </div>
                            <div className='revenue-after-tax-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/10112/10112409.png' alt='order' />
                                <div>Tổng doanh thu sau chiết khấu</div>
                                <div>0</div>
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
        userInfo: state.user.userInfo,
        showNav: state.app.showNav,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
