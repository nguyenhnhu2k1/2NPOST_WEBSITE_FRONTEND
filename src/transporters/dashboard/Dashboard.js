import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts';

import SelectSmall from './SelectSmall ';
import HeaderTrans from '../header/Header';
import './Dashboard.scss'

class Dashboard extends Component {
    constructor(props) {

        super(props);

        this.state = {
            dashboard: {
                orderTotal: this.props.orders ? this.props.orders.length : 0,
                revenueTotal: 0,
                revenueTotalAfterVAT: 0,
                driverTotal: this.props.drivers ? this.props.drivers.length : 0,
                vehicleTotal: this.props.vehicles ? this.props.vehicles.length : 0,
                SE0Total: 0,
                SE1Total: 0,
                SE2Total: 0,
            },
            dashboardToday: {
                orderTotalToday: 0,
                revenueTotalToday: 0,
                revenueTotalAfterVATToday: 0,
            },
            dashboardMonth: {
                revenueTotalMonth: 0,
                VATTotalMonth: 0,
                revenueTotalAfterVATMonth: 0,
                orderTotalMonth: 0,
                processingOrderMonth: 0,
                successfulOrderMonth: 0,
                cancelOrderMonth: 0,
                revenueLast10Month: 0,
                orderLast10Month: 0,
            },
            month: 0,
            year: 0,
        }
    }
    // lấy thống kê dịch vụ
    getServiceStatistics = () => {
        const orders = this.props.orders;
        let SE0Statistics = 0;
        let SE1Statistics = 0;
        let SE2Statistics = 0;
        orders.forEach(order => {
            if (order.keyService === 'SE0') {
                SE0Statistics++;
            }
            else if (order.keyService === 'SE1') {
                SE1Statistics++;
            }
            else if (order.keyService === 'SE2') {
                SE2Statistics++;
            }
        });
        this.setState(prevState => ({
            dashboard: {
                ...prevState.dashboard,
                SE0Total: SE0Statistics,
                SE1Total: SE1Statistics,
                SE2Total: SE2Statistics,
            }
        }))
    }
    formatCalculate = (priceA) => { //chuyển đổi 10,000 về dạng 10000
        let A = priceA ? parseInt(priceA.replace(/,/g, ""), 10) : 0
        return A;
    }
    formatCurrency(number) { //chuyển đổi 10000 về dạng  10,000 VNĐ
        // Chuyển đổi số thành chuỗi và thêm dấu phẩy sau mỗi 3 chữ số
        number = number ? number : 0;
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // Thêm ký tự VNĐ vào cuối chuỗi
        return formattedNumber + " VNĐ";
    }
    // lấy thống kê tổng doanh thu và tổng doanh thu sau chiết khấu
    getRevenueStatistics = () => {
        const orders = this.props.orders;
        let revenueTotal = 0;
        orders.forEach(order => {
            if (order.transportationOrder && order.transportationOrder.payment
                && order.keyOrderStatus === 'TS5') {
                revenueTotal += this.formatCalculate(order.totalCost);
            }
        });
        this.setState(prevState => ({
            dashboard: {
                ...prevState.dashboard,
                revenueTotal: revenueTotal,
                revenueTotalAfterVAT: revenueTotal * 0.9,
            }
        }))
    }
    // kiểm tra ngày createdAt có thuộc ngày hôm nay không
    checkSameDay = (createdAt) => {
        const a = new Date(createdAt);
        // Lấy ngày hôm nay
        const today = new Date();
        a.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây về 0 để so sánh chỉ theo ngày
        today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây về 0 để so sánh chỉ theo ngày
        // So sánh ngày của biến a với ngày hôm nay
        if (a.getTime() === today.getTime()) {
            return true;
        } else {
            return false;
        }
    }
    // Lấy thống kê theo ngày hôm nay
    getDataStatisticToday = () => {
        const orders = this.props.orders;
        let revenueTotal = 0;
        let orderTotal = 0;
        orders.forEach(order => {
            if (this.checkSameDay(order.createdAt)) {
                orderTotal++;
                if (order.transportationOrder && order.transportationOrder.payment && order.keyOrderStatus === 'TS5') {
                    revenueTotal += this.formatCalculate(order.totalCost);
                }
            }
        })
        this.setState({
            dashboardToday: {
                orderTotalToday: orderTotal,
                revenueTotalToday: revenueTotal,
                revenueTotalAfterVATToday: revenueTotal * 0.9,
            }
        })
    }
    // Thay đổi month
    handleMonthChange = (selectedMonth) => {
        this.setState({ month: selectedMonth }, () => {
            if (this.state.month && this.state.year && this.props.orders) {
                this.getDataStatisticMonth();
            }
        });

    };
    // Thay đổi year
    handleYearChange = (selectedYear) => {
        this.setState({ year: selectedYear }, () => {
            if (this.state.month && this.state.year && this.props.orders) {
                this.getDataStatisticMonth();
            }
        });
    };
    // kiểm tra xem createdAt có thuộc month và year đã chọn không
    checkSameMonth = (createdAt) => {
        const a = new Date(createdAt);

        // Biến month và year đã chọn
        const selectedMonth = this.state.month; // Tháng 11 (đếm từ 0)
        const selectedYear = this.state.year;

        // Kiểm tra xem đối tượng a có cùng tháng và năm không
        if (a.getMonth() === selectedMonth && a.getFullYear() === selectedYear) {
            return true;
        } else {
            return false;
        }
    }
    // lấy tất cả dữ liệu theo tháng
    getDataStatisticMonth = () => {
        const orders = this.props.orders;
        const TS5 = this.props.TS5;
        const OS2 = this.props.OS2;

        let revenue = 0;
        orders.forEach(order => {
            if (this.checkSameMonth(order.createdAt)) {
                if (order.transportationOrder && order.transportationOrder.payment && order.keyOrderStatus === 'TS5') {
                    revenue += this.formatCalculate(order.totalCost);
                }
            }
        })
        this.setState({
            dashboardMonth: {
                revenueTotalMonth: revenue,
                VATTotalMonth: revenue * 0.1,
                revenueTotalAfterVATMonth: revenue * 0.9,
                orderTotalMonth: orders.length,
                processingOrderMonth: orders.length - TS5.length - OS2.length,
                successfulOrderMonth: TS5.length,
                cancelOrderMonth: OS2.length,
                revenueLast10Month: 0,
                orderLast10Month: 0,
            }
        })
    }

    // Lấy tất cả dữ liệu trang thống kê
    getDataForDashboard = () => {
        this.getServiceStatistics();
        this.getRevenueStatistics();
        this.getDataStatisticToday();
        this.setState(prevState => ({
            dashboard: {
                ...prevState.dashboard,
                orderTotal: this.props.orders.length,
                driverTotal: this.props.drivers.length,
                vehicleTotal: this.props.vehicles.length
            }
        }));
    }
    componentDidMount() {
        if (this.props.orders && this.props.vehicles && this.props.drivers) {
            this.getDataForDashboard();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.orders !== prevProps.orders || this.props.vehicles !== prevProps.vehicles
            || this.props.drivers !== prevProps.drivers) {
            this.getDataForDashboard();
        }
    }
    render() {
        let showNav = this.props.showNav;
        // Thiết lập tháng
        const items = [];
        const itemYears = [{ month: 2022, value: 2022 }, { month: 2023, value: 2023 }]
        for (let i = 1; i <= 12; i++) {
            items.push({ value: i, month: 'Tháng ' + i });
        }

        // gáng biến
        const { orderTotal, revenueTotal, revenueTotalAfterVAT, driverTotal, vehicleTotal, SE0Total, SE1Total, SE2Total } = this.state.dashboard;
        const { orderTotalToday, revenueTotalToday, revenueTotalAfterVATToday } = this.state.dashboardToday;
        const { revenueTotalMonth, VATTotalMonth, revenueTotalAfterVATMonth, orderTotalMonth, processingOrderMonth,
            successfulOrderMonth, cancelOrderMonth } = this.state.dashboardMonth;

        console.log(this.state);
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
                                <div>{orderTotal}</div>
                            </div>
                            <div className='revenue-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/4577/4577278.png' alt='revenue' />
                                <div>Tổng doanh thu</div>
                                <div>{this.formatCurrency(revenueTotal)}</div>
                            </div>
                            <div className='revenue-after-tax-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/10112/10112409.png' alt='order' />
                                <div>Tổng doanh thu sau chiết khấu</div>
                                <div>{this.formatCurrency(revenueTotalAfterVAT)}</div>
                            </div>
                        </div>
                        {/* biểu đồ */}
                        <div className='chart-statistics'>
                            <div className='pie-chart'>
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: SE0Total, label: 'Hỏa tốc nội thành', color: '#f28e2c' },
                                                { id: 1, value: SE1Total, label: 'Hỏa tốc ngoại thành', color: '#59a14f' },
                                                { id: 2, value: SE2Total, label: 'Tiêu chuẩn ngoại thành', color: '#76b7b2' },
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
                                    <div>{driverTotal}</div>
                                </div>
                                <img src='https://cdn-icons-png.flaticon.com/512/7429/7429301.png' alt='' />
                                <div className='vehicle'>
                                    <div>Số phương tiện: </div>
                                    <div>{vehicleTotal}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thống kê theo tháng */}
                    <div className='component-2'>
                        <div className='title-by-month'>
                            <p className='title-1-base'>Thống kê theo tháng</p>
                            <div className='select-by-month' >
                                {/* chọn tháng và năm */}
                                <SelectSmall labelProp='Month' itemSelect={items} onValueChange={this.handleMonthChange} />
                                <SelectSmall labelProp='Year' itemSelect={itemYears} onValueChange={this.handleYearChange} />
                            </div>
                        </div>

                        {/* doanh thu */}
                        <div className='revenue-statistics-by-month'>
                            <div className='revenue'>
                                <img src='https://cdn-icons-png.flaticon.com/512/762/762613.png' alt='order' />
                                <div>Tổng doanh Thu</div>
                                <div>{this.formatCurrency(revenueTotalMonth)}</div>
                            </div>
                            <div className='tax'>
                                <img src='https://cdn-icons-png.flaticon.com/512/4222/4222023.png' alt='revenue' />
                                <div>Tổng chiết khấu</div>
                                <div>{this.formatCurrency(VATTotalMonth)}</div>
                            </div>
                            <div className='revenue-after-tax'>
                                <img src='https://cdn-icons-png.flaticon.com/512/4021/4021642.png' alt='order' />
                                <div>Tổng doanh thu sau chiết khấu</div>
                                <div>{this.formatCurrency(revenueTotalAfterVATMonth)}</div>
                            </div>
                        </div>

                        {/* đơn hàng */}
                        <div className='order-statistics-by-month'>
                            <div className='order'>
                                <img src='https://cdn-icons-png.flaticon.com/512/3500/3500833.png' alt='order' />
                                <div>Tổng đơn hàng</div>
                                <div>{orderTotalMonth}</div>
                            </div>
                            <div className='pending'>
                                <img src='https://cdn-icons-png.flaticon.com/512/5978/5978235.png' alt='revenue' />
                                <div>Đơn hàng đang xử lý</div>
                                <div>{processingOrderMonth}</div>
                            </div>
                            <div className='success'>
                                <img src='https://cdn-icons-png.flaticon.com/512/148/148767.png' alt='order' />
                                <div>Đon hàng thành công</div>
                                <div>{successfulOrderMonth}</div>
                            </div>
                            <div className='cancel'>
                                <img src='https://cdn-icons-png.flaticon.com/512/2037/2037541.png' alt='order' />
                                <div>Đơn hàng đã hủy</div>
                                <div>{cancelOrderMonth}</div>
                            </div>
                        </div>

                        {/* biểu đồ */}
                        {this.state.dashboard.orderTotal && this.state.dashboard.revenueTotal &&
                            (
                                <div className='chart'>

                                    <div className='revenue-chart'>
                                        <LineChart
                                            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                                            series={[
                                                {
                                                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, this.state.dashboard.revenueTotal],
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
                                            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                                            series={[
                                                {
                                                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, this.state.dashboard.orderTotal],
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
                            )}

                    </div>

                    {/* Thống kê theo ngày */}
                    <div className='component-3'>
                        <p className='title-1-base'>Thống kê theo ngày <span style={{ fontSize: 'medium' }}>(Thống kê các đơn hàng được đặt và hoàn thành trong hôm nay và đã thanh toán)</span></p>
                        {/* thống kê theo ngày*/}
                        <div className='statistics'>
                            <div className='order-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/1356/1356594.png' alt='order' />
                                <div>Tổng đơn hàng</div>
                                <div>{orderTotalToday}</div>
                            </div>
                            <div className='revenue-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/4577/4577278.png' alt='revenue' />
                                <div>Tổng doanh thu</div>
                                <div>{this.formatCurrency(revenueTotalToday)}</div>
                            </div>
                            <div className='revenue-after-tax-statistics'>
                                <img src='https://cdn-icons-png.flaticon.com/512/10112/10112409.png' alt='order' />
                                <div>Tổng doanh thu sau chiết khấu</div>
                                <div>{this.formatCurrency(revenueTotalAfterVATToday)}</div>
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
        vehicles: state.user.vehicles,
        drivers: state.user.drivers,
        orders: state.user.orders,
        TS5: state.user.TS5,
        OS2: state.user.OS2,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
