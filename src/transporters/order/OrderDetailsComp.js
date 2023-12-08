import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import Header from '../header/Header';
import AcceptBtn from './AcceptBtn';
import './OrderDetailsComp.scss';
import boxImg from '../../assets/images/orders/box.png';
import { GetOrderDetailByIdOrder } from '../../services/userService';
import ShowPolyline from './ShowPolyline';

// hiệu ứng trạng thái đơn hàng
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

// css cho trạng thái đơn hàng
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

// nội dung trạng thái đơn hàng
class ColorlibStepIcon extends Component {
    render() {
        const { active, completed, className, icon } = this.props;

        const icons = {
            1: <AccessAlarmIcon />,
            2: <SensorOccupiedIcon />,
            3: <WarehouseIcon />,
            4: <LocalShippingIcon />,
            5: <CheckCircleOutlineIcon />,
            6: <DoneOutlineIcon />,
            7: <HighlightOffIcon />,
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(icon)]}
            </ColorlibStepIconRoot>
        );
    }
}

//trang chi tiết đơn hàng
class OrderDetailsComp extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            //id của đơn hàng
            id: this.props.match.params.id,
            order: '',
            totalWeight: 0,
            totalValue: 0,
            statusStep: '',
            steps: [
                {
                    status: 'TS0',
                    text: 'Chờ lấy hàng',
                },
                {
                    status: 'TS1',
                    text: 'Tài xế đã nhận hàng',
                },
                {
                    status: 'TS2',
                    text: 'Đơn hàng đang ở kho',
                },
                {
                    status: 'TS3',
                    text: 'Đơn hàng đang giao',
                },
                {
                    status: 'TS4',
                    text: 'Đơn hàng đã giao',
                },
                {
                    status: 'TS5',
                    text: 'Đơn hàng thành công',
                },
                {
                    status: 'OS2',
                    text: 'Đơn hàng đã hủy',
                },
            ]

        })
    }
    // nhập keyStatus => thứ tự của trạng thái đó dựa vào step
    getIndexByKeyStatusOnStep = (statusText) => {
        const steps = this.state.steps;

        const index = steps.findIndex(step => step.status === statusText);
        return index;
    }

    getOrderDetail = async () => { //lấy chi tiết đơn hàng từ api
        try {
            const { id } = this.state;
            if (id) {
                let orderFind = await GetOrderDetailByIdOrder(id);
                if (orderFind && orderFind.errCode === 0) {
                    this.setState({
                        order: orderFind.data,
                    })
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    formatDDMMYYYY = (inputDateString) => {
        // Chuyển đổi thành đối tượng Date
        const date = new Date(inputDateString);
        // Lấy ngày, tháng, năm
        const day = date.getDate();
        const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 nên cần cộng thêm 1.
        const year = date.getFullYear();

        // Tạo định dạng "dd/MM/yyyy"
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        return formattedDate;
    }

    //lấy 2 ngày sau
    calculateTwoDaysAfter(inputDateStr) {
        // Chuyển đổi ngày từ chuỗi "dd/MM/yyyy" sang đối tượng ngày
        const dateParts = inputDateStr.split("/");
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Giá trị tháng trong JavaScript bắt đầu từ 0
        const year = parseInt(dateParts[2], 10);
        const inputDate = new Date(year, month, day);

        // Tính toán 2 ngày sau
        inputDate.setDate(inputDate.getDate() + 2);

        // Chuyển đổi ngày kết quả thành chuỗi "dd/MM/yyyy"
        const dayAfter = inputDate.getDate();
        const monthAfter = inputDate.getMonth() + 1; // Chú ý cộng thêm 1 vì giá trị tháng bắt đầu từ 0
        const yearAfter = inputDate.getFullYear();
        const resultDateStr = `${dayAfter}/${monthAfter}/${yearAfter}`;

        return resultDateStr;
    }

    getTotalWeightAndTotalValue = () => { //tính toán tổng KL và tổng GT
        const { order } = this.state;
        let totalWeight = 0;
        let totalValue = 0;
        if (order && order.goods) {
            order.goods.map((good, index) => {
                totalValue += parseInt(good.value.replace(/,/g, ""), 10);
                totalWeight += +good.weight;
            }
            )
        }
        this.setState({
            totalWeight,
            totalValue: this.formatCurrency(totalValue)
        })
    }

    formatCurrency(number) { //chuyển đổi 10000 về dạng  10,000 VNĐ
        // Chuyển đổi số thành chuỗi và thêm dấu phẩy sau mỗi 3 chữ số
        number = number ? number : 0;
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // Thêm ký tự VNĐ vào cuối chuỗi
        return formattedNumber + " VNĐ";
    }

    transportationCost = (priceA, priceB) => { //chuyển đổi 10,000 về dạng 10000
        let A = priceA ? parseInt(priceA.replace(/,/g, ""), 10) : 0
        let B = priceB ? parseInt(priceB.replace(/,/g, ""), 10) : 0
        return this.formatCurrency(A - B)
    }

    updateNameAccept = (value) => {
        let nameAccept = '';
        if (value.keyOrderStatus === 'OS0') {
            nameAccept = 'Nhận đơn';
        }
        if (value.keyOrderStatus === 'TS0') {
            nameAccept = 'Đã lấy hàng';
        }
        if (value.keyOrderStatus === 'TS1') {
            if (value.keyService !== 'SE2') {
                nameAccept = 'Giao Hàng';
            }
            else {
                nameAccept = 'Đã về kho';
            }
        }
        if (value.keyOrderStatus === 'TS2') {
            nameAccept = 'Giao Hàng';
        }
        if (value.keyOrderStatus === 'TS3') {
            nameAccept = 'Thành công';
        }
        if (value.keyOrderStatus === 'TS4') {
            nameAccept = 'Chờ khách hàng xác nhận';
        }
        if (value.keyOrderStatus === 'OS2' || value.keyOrderStatus === 'TS5') {
            nameAccept = 'Xem chi tiết';
        }
        return nameAccept;
    }

    // tìm tài xế dựa vào id Tài xế
    handleSearchDriverByIdDriver = (id) => {
        let driverFind;
        this.props.drivers.map((driver) => {
            if (Number(driver.id) === Number(id)) {
                driverFind = driver;
            }
        }
        )
        return driverFind
    }

    // tìm phương tiện dựa vào id phương tiện
    handleSearchVehicleByIdVehicle = (id) => {
        let vehicleFind;
        this.props.vehicles.map((vehicle) => {
            if (Number(vehicle.id) === Number(id)) {
                vehicleFind = vehicle;
            }
        })
        return vehicleFind
    }

    componentDidMount() {
        this.getOrderDetail();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.order !== prevState.order) {
            this.getTotalWeightAndTotalValue();
        }
    }
    render() {
        let showNav = this.props.showNav;
        const { order, id, totalValue, totalWeight, steps } = this.state;
        const driver = order.transportationOrder && order.transportationOrder.idDriver
            ? this.handleSearchDriverByIdDriver(order.transportationOrder.idDriver) : '';
        const vehicle = order.transportationOrder && order.transportationOrder.idVehicle
            ? this.handleSearchVehicleByIdVehicle(order.transportationOrder.idVehicle) : ''
        console.log('this.state', this.state);
        return (
            <React.Fragment>
                <Header />
                <div className={`order-detail-component ${showNav ? '' : 'active-show-nav'}`}>

                    {/* tiêu đề chi tiết đơn hàng */}
                    <div className='heading-order-detail'>
                        <span className='title-1-base '>CHI TIẾT ĐƠN HÀNG <span className='id-order'>#{id}</span> </span>
                        <AcceptBtn nameAccept={order && this.updateNameAccept(order)} getDetail={this.getOrderDetail}
                            order={order} nameCancle='Hủy Bỏ' />
                    </div>

                    {/* trạng thái đơn hàng */}
                    <div className='status-order-component'>
                        <Stack sx={{ width: "100%" }} spacing={4}>
                            <Stepper
                                alternativeLabel
                                activeStep={this.getIndexByKeyStatusOnStep(order.keyOrderStatus)}
                                connector={<ColorlibConnector />}
                            >
                                {steps.map((label, index) => (
                                    <Step key={index}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                                            {label.text}
                                            <Typography variant="body2" color="textSecondary">
                                                {label.date}
                                            </Typography>
                                        </StepLabel>

                                    </Step>
                                ))}
                            </Stepper>
                        </Stack>
                    </div>

                    <div className='component row'>
                        <div className='component-1 col-12 col-md-6'>

                            {/* Thông tin đơn hàng */}
                            <div className='info-order-component'>
                                <p className='title-3-base '>THÔNG TIN ĐƠN HÀNG</p>

                                <div className='content-info-order'>
                                    <img src={order.image ? process.env.REACT_APP_BACKEND_URL + order.image : boxImg} alt='box Img' />
                                    <div className='order-info'>
                                        <div className="create-date-order div-info">
                                            <div className="title create-date-order">Ngày tạo đơn</div>
                                            <div className="content create-date-order">{this.formatDDMMYYYY(order.createdAt)}</div>
                                        </div>
                                        <div className="finish-date div-info">
                                            <div className="title finish-date">Ngày giao hàng dự kiến</div>
                                            <div className="content finish-date">{this.calculateTwoDaysAfter(this.formatDDMMYYYY(order.createdAt))}</div>
                                        </div>
                                        <div className="service div-info">
                                            <div className="title service">Loại dịch vụ</div>
                                            <div className="content service">{order && order.keyServiceAllCode && order.keyServiceAllCode.valueVi}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Thông tin người gửi */}
                            <div className='info-sender'>
                                <p className='title-3-base '>Thông tin người gửi</p>
                                <div className='name-phone'>{order.senderName} - {order.senderPhone}</div>
                                <div>{order.senderAddress}</div>
                            </div>

                            {/* Thông tin người nhận */}
                            <div className='info-receiver'>
                                <p className='title-3-base '>Thông tin người nhận </p>
                                <button data-bs-toggle="modal" data-bs-target='#showPolyline'>Xem đường đi</button>
                                <div className='name-phone'>{order.recieverName} - {order.recieverPhone}</div>
                                <div>{order.recieverAddress}</div>
                            </div>
                            {/* xem đường đi */}
                            {/* Chọn vị trí google map */}
                            <div className="modal fade" id="showPolyline" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <ShowPolyline order={this.state.order} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='component-2 col-12 col-md-6'>
                            {/* Thông tin hàng hóa */}
                            <div className='info-goods-component'>
                                <p className='title-3-base'>THÔNG TIN HÀNG HÓA</p>

                                {/* từng đơn hàng */}
                                {order.goods && order.goods.map((good, index) =>
                                    <div className='content-info-goods' key={index}>
                                        <div className='name info-goods'>
                                            <span className='title '>Tên hàng hóa 1</span>
                                            <div className='content'>{good.name}</div>
                                        </div>
                                        <div className='quanlity info-goods'>
                                            <span className='title '>Số lượng</span>
                                            <div className='content'>{good.quantity}</div>
                                        </div>
                                        <div className='weight info-goods'>
                                            <span className='title '>Khối lượng</span>
                                            <div className='content'>{good.weight}</div>
                                        </div>
                                        <div className='price info-goods'>
                                            <span className='title '>Giá trị</span>
                                            <div className='content'>{good.value}</div>
                                        </div>
                                    </div>
                                )}


                                <div className='total-quanlity info-goods'>
                                    <span className='title '>Tổng khối lượng</span>
                                    <div className='content'>{totalWeight} gram</div>
                                </div>

                                <div className='total-price info-goods'>
                                    <span className='title '>Tổng giá trị</span>
                                    <div className='content'>{totalValue}</div>
                                </div>

                                <div className='goods-properties info-goods'>
                                    <span className='title '>Tính chất hàng hóa</span>
                                    <div className='type-of-good-component'>
                                        {order && order.typeOfGoods.map((typeGood, index) =>
                                            <div className='content' key={index}>{typeGood.keyTypeOfGoodsAllCode.valueVi}<br style={{ width: '1px' }}></br></div>
                                        )}
                                    </div>
                                </div>

                                <div className='note info-goods'>
                                    <span className='title'>Ghi chú</span>
                                    <div className='content'>{order.note}</div>
                                </div>

                            </div>
                            {/* Thông tin tài xế và phương tiện driver*/}
                            {driver &&
                                <div className='info-driver-component'>
                                    <p className='title-3-base '>THÔNG TIN TÀI XẾ</p>

                                    <div className='content-info-driver'>
                                        <img src={driver.image ? process.env.REACT_APP_BACKEND_URL + driver.image
                                            : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'}
                                            alt='box Img' />
                                        <div className='driver-info'>
                                            <div className="username div-info">
                                                <div className="title username">Họ tên</div>
                                                <div className="content username">{driver.userName}</div>
                                            </div>
                                            <div className="phone div-info">
                                                <div className="title phone">Số điện thoại</div>
                                                <div className="content phone">{driver.phone}</div>
                                            </div>
                                            <div className="address div-info">
                                                <div className="title address">Địa chỉ</div>
                                                <div className="content address">{driver.address}</div>
                                            </div>
                                            <div className='birthday div-info'>
                                                <div className="title">Ngày sinh</div>
                                                <div className="content">{driver.birthday}</div>
                                            </div>
                                            <div className='gender div-info'>
                                                <div className="title">Giới tính</div>
                                                <div className="content">{driver.keyGender === 'G0' ? 'Nam' : 'Nữ'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            {vehicle &&
                                <div className='info-vehicle-component'>
                                    <p className='title-3-base '>THÔNG TIN PHƯƠNG TIỆN</p>

                                    <div className='content-info-vehicle'>
                                        <img src={process.env.REACT_APP_BACKEND_URL + vehicle.image}
                                            alt='vehicle Img' />
                                        <div className='vehicle-info'>
                                            <div className="licensePlates div-info">
                                                <div className="title licensePlates">Biến số xe</div>
                                                <div className="content licensePlates">{vehicle.licensePlates}</div>
                                            </div>
                                            <div className="type div-info">
                                                <div className="title type">Loại xe</div>
                                                <div className="content type">{vehicle.type}</div>
                                            </div>
                                            <div className="weight div-info">
                                                <div className="title weight">Khối lượng</div>
                                                <div className="content weight">{vehicle.weight}</div>
                                            </div>
                                            <div className='description div-info'>
                                                <div className="title description">Mô tả</div>
                                                <div className="content description">{vehicle.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}

                        </div>
                    </div>

                    {/* Thành tiền */}
                    <div className='total-amount-component'>
                        <div className='transportation-costs cost'>
                            <div className='title'>Chi phí vận chuyển</div>
                            <div className='content'>{order.totalCost ? this.transportationCost(order.totalCost, this.formatCurrency(order.typeOfGoods.length * 5000)) : '0'} VNĐ</div>
                        </div>
                        <div className='incurred-costs cost'>
                            <div className='title'>Tổng cước phát sinh</div>
                            <div className='content'>{order && order.typeOfGoods && this.formatCurrency(order.typeOfGoods.length * 5000)}</div>
                        </div>
                        <div className='total-costs cost'>
                            <div className='title'><AttachMoneyIcon />Thành tiền</div>
                            {/* <div className='content'>{order && order.typeOfGoods && this.calculateTotal(order.totalCost, this.formatCurrency(order.typeOfGoods.length * 5000))}</div> */}
                            <div className='content'>{order.totalCost ? order.totalCost : '0'}</div>
                        </div>
                        <div className='payment'>
                            <div className='title-payment'>
                                <span className={`${order.transportationOrder && order.transportationOrder.payment ? 'paid' : 'unpaid'}`}>{order.transportationOrder && order.transportationOrder.payment ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }

}

const mapStateToProps = state => {
    return {
        showNav: state.app.showNav,
        drivers: state.user.drivers,
        vehicles: state.user.vehicles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsComp);
