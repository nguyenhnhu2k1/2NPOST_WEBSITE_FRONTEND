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
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import Header from '../header/Header';
import AcceptBtn from './AcceptBtn';
import './OrderDetailsComp.scss';
import boxImg from '../../assets/images/orders/box.png';

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
            6: <HighlightOffIcon />,
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
        })
    }

    render() {
        let showNav = this.props.showNav;
        const steps = [
            {
                text: 'Chờ lấy hàng',
                date: '10/102001',
            },
            {
                text: 'Tài xế đã nhận hàng',
                date: '10/102001',
            },
            {
                text: 'Đơn hàng đang ở kho',
                date: '10/102001',
            },
            {
                text: 'Đơn hàng đang giao',
                date: '10/102001',
            },
            {
                text: 'Đơn hàng thành công',
                date: '10/102001',
            },
            {
                text: 'Đơn hàng đã hủy',
                date: '10/102001',
            },
        ];
        return (
            <React.Fragment>
                <Header />
                <div className={`order-detail-component ${showNav ? '' : 'active-show-nav'}`}>

                    {/* tiêu đề chi tiết đơn hàng */}
                    <div className='heading-order-detail'>
                        <span className='title-1-base '>CHI TIẾT ĐƠN HÀNG <span className='id-order'>#{this.state.id}</span> </span>
                        <AcceptBtn nameAccept='Accept' nameCancle='Hủy Bỏ' />
                    </div>

                    {/* trạng thái đơn hàng */}
                    <div className='status-order-component'>
                        <Stack sx={{ width: "100%" }} spacing={4}>
                            <Stepper
                                alternativeLabel
                                activeStep={3}
                                connector={<ColorlibConnector />}
                            >
                                {steps.map((label) => (
                                    <Step key={label}>
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
                                    <img src={boxImg} alt='box Img' />
                                    <div className='order-info'>
                                        <div className="create-date-order div-info">
                                            <div className="title create-date-order">Ngày tạo đơn</div>
                                            <div className="content create-date-order">10/10/2001</div>
                                        </div>
                                        <div className="finish-date div-info">
                                            <div className="title finish-date">Ngày giao hàng dự kiến</div>
                                            <div className="content finish-date">17/09/2001</div>
                                        </div>
                                        <div className="service div-info">
                                            <div className="title service">Loại dịch vụ</div>
                                            <div className="content service">Giao hàng hỏa tốc nội thành</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Thông tin người gửi */}
                            <div className='info-sender'>
                                <p className='title-3-base '>Thông tin người gửi</p>
                                <div className='name-phone'>Nguyễn Thị Gửi - 0706926520</div>
                                <div>12/147 khu vực Thới Bình A, phường Thới An, Quận Ô Môn, Thành Phố Cần Thơ</div>
                            </div>

                            {/* Thông tin người nhận */}
                            <div className='info-receiver'>
                                <p className='title-3-base '>Thông tin người nhận </p>
                                <button>Xem đường đi</button>
                                <div className='name-phone'>Nguyễn Thị Nhận - 0706926520</div>
                                <div>12/147 khu vực Thới Bình A, phường Thới An, Quận Ô Môn, Thành Phố Cần Thơ</div>
                            </div>
                        </div>

                        <div className='component-2 col-12 col-md-6'>
                            {/* Thông tin hàng hóa */}
                            <div className='info-goods-component'>
                                <p className='title-3-base'>THÔNG TIN HÀNG HÓA</p>

                                {/* từng đơn hàng */}
                                <div className='content-info-goods'>
                                    <div className='name info-goods'>
                                        <span className='title '>Tên hàng hóa 1</span>
                                        <div className='content'>Bếp gas</div>
                                    </div>
                                    <div className='quanlity info-goods'>
                                        <span className='title '>Số lượng</span>
                                        <div className='content'>1</div>
                                    </div>
                                    <div className='weight info-goods'>
                                        <span className='title '>Khối lượng</span>
                                        <div className='content'>2000g</div>
                                    </div>
                                    <div className='price info-goods'>
                                        <span className='title '>Giá trị</span>
                                        <div className='content'>10.000VNĐ</div>
                                    </div>
                                </div>

                                <div className='total-quanlity info-goods'>
                                    <span className='title '>Tổng khối lượng</span>
                                    <div className='content'>2000g</div>
                                </div>

                                <div className='total-price info-goods'>
                                    <span className='title '>Tổng giá trị</span>
                                    <div className='content'>100.000VNĐ</div>
                                </div>

                                <div className='goods-properties info-goods'>
                                    <span className='title '>Tính chất hàng hóa</span>
                                    <div className='content'>Nguyên khối</div>
                                </div>

                                <div className='note info-goods'>
                                    <span className='title'>Ghi chú</span>
                                    <div className='content'>Ghi chú ở đây nè</div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Thành tiền */}
                    <div className='total-amount-component'>
                        <div className='transportation-costs cost'>
                            <div className='title'>Chi phí vận chuyển</div>
                            <div className='content'>100.000đ</div>
                        </div>
                        <div className='incurred-costs cost'>
                            <div className='title'>Tổng cước phát sinh</div>
                            <div className='content'>5.000đ</div>
                        </div>
                        <div className='total-costs cost'>
                            <div className='title'><AttachMoneyIcon />Thành tiền</div>
                            <div className='content'>105.000đ</div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsComp);
