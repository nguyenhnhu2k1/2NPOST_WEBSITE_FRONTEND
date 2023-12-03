import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import { KeyCodeUtils } from '../../utils';
import HeaderTrans from '../header/Header';
import './Driver.scss'
import { uploadImage, CreateNewUserFromApi, handleDeleteFile, handleDeleteDriverFromApi, handleEditDriverFromApi } from '../../services/userService';
import { GetAllDriverOfTransporter } from '../../store/actions';
class Driver extends Component {
    constructor(props) {
        super(props);
        this.btnCancel = React.createRef();

        this.formRefs = {
            image: React.createRef(),
            userName: React.createRef(),
            phone: React.createRef(),
            password: React.createRef(),
            address: React.createRef(),
            email: React.createRef(),
            birthday: React.createRef(),
            male: React.createRef(),
            female: React.createRef(),
            statusOn: React.createRef(),
            statusOff: React.createRef(),
        };
        this.state = {
            showDrivers: this.props.drivers,
            drivers: {
                id: '',
                image: '',
                userName: '',
                phone: '',
                password: '',
                address: '',
                email: '',
                birthday: '',
                keyGender: '',
                linkImgOnServer: '', //link ảnh driver cũ, trước khi chỉnh sửa => sd cho editDriver
                showImg: '',
                status: '',
                inputBirthday: '',
            },
            oldDriver: {
                image: '',
                userName: '',
                phone: '',
                address: '',
                email: '',
                birthday: '',
                keyGender: '',
                status: '',
            },
            editFrm: false,
            search: '',
            filter: '',
            isShowPassWord: false,
        }
    }
    // ẩn hiện password
    showOrHiddenEye = (event) => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord
        })
    }
    // lưu thông tin tài xế vào state
    changeImage = (event) => {
        if (event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            this.setState({
                drivers: {
                    ...this.state.drivers,
                    image: event.target.files[0],
                    showImg: imageUrl,
                }
            });
        }
    }
    changeUserName = (event) => {
        this.setState({
            drivers: {
                ...this.state.drivers,
                userName: event.target.value
            }
        })
    }
    changePhone = (event) => {
        const value = event.target.value;
        if (/^[0-9]*$/.test(value) && value.length <= 10) {
            this.setState({
                drivers: {
                    ...this.state.drivers,
                    phone: event.target.value
                }
            })
        }
    }
    changePassword = (event) => {
        this.setState({
            drivers: {
                ...this.state.drivers,
                password: event.target.value
            }
        })
    }
    changeAddress = (event) => {
        this.setState({
            drivers: {
                ...this.state.drivers,
                address: event.target.value
            }
        })
    }
    changeEmail = (event) => {
        this.setState({
            drivers: {
                ...this.state.drivers,
                email: event.target.value
            }
        })
    }
    changeBirthday = (event) => {
        this.setState({
            drivers: {
                ...this.state.drivers,
                birthday: this.formatDate(event.target.value),
                inputBirthday: (event.target.value).split('/').reverse().join('-')
            }
        })
    }
    // chuyển đổi ngày DD/MM/YYYY
    formatDate = (dateString) => {
        // Hàm này sẽ định dạng lại giá trị thành "DD/MM/YYYY"
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    changeStatus = (event) => {
        this.setState({
            drivers: {
                ...this.state.drivers,
                status: +event.target.value,
            }
        })
    }
    changeGender = (event) => {
        this.setState({
            drivers: {
                ...this.state.drivers,
                keyGender: event.target.value,
            }
        })
    }

    // Tạo tài xế
    handleCreateDriver = async () => {
        const { image, userName, phone, password, address, email, birthday, keyGender, status } = this.state.drivers
        try {
            if (address && userName && phone && password && birthday && (keyGender === 'G0' || keyGender === 'G1') && (status === 1 || status === 0)) {
                if (!email || (email && this.validationEmail(email))) {
                    if (this.isValidPhoneNumber(phone)) {
                        //tải ảnh lên server
                        let img;
                        if (image) {
                            const formData = new FormData();
                            formData.append('profile_pic', image);
                            img = await uploadImage(formData);
                        }
                        // tạo tài xế
                        const driverInput = {
                            idTransporter: this.props.userInfo.idTransporter,
                            image: img ? img.urlImage : '',
                            userName: userName,
                            phone: phone,
                            password: password,
                            address: address,
                            email: email,
                            birthday: birthday,
                            keyGender: keyGender,
                            status: status,
                            keyRole: 'R3'
                        }
                        let driverNew = await CreateNewUserFromApi(driverInput);
                        if (driverNew && driverNew.errCode === 0) {
                            alert(`Tạo tài xế thành công\n phone: ${driverNew.data.phone} \n password: ${driverInput.password}`);
                            this.resetForm();
                            this.props.getAllDriverOfTransporter(this.props.userInfo.idTransporter);
                            this.btnCancel.current.click();
                        }
                        else {
                            alert(driverNew.message)
                            // nếu sửa không thành công, thì xóa hình vừa thêm 
                            if (driverInput.image) {
                                await handleDeleteFile(driverInput.image);
                            }
                        }
                    }
                    else {
                        alert("Định dạng số điện thoại không hợp lệ");
                    }
                }
                else {
                    alert("Định dạng email không hợp lệ");
                }
            }
            else {
                alert("Mời nhập các thông tin bắt buộc");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    validationEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
    isValidPhoneNumber = (phoneNumber) => {
        // Kiểm tra xem số điện thoại chỉ bao gồm các chữ số và có đúng 10 số
        const isNumeric = /^[0-9]+$/.test(phoneNumber);
        const isTenDigits = phoneNumber.length === 10;

        return isNumeric && isTenDigits;
    }

    // reset form thêm tài xế
    resetForm = () => {
        try {
            this.setState({
                drivers: {
                    id: '',
                    image: '',
                    userName: '',
                    phone: '',
                    password: '',
                    address: '',
                    email: '',
                    birthday: '',
                    keyGender: '',
                    linkImgOnServer: '', //link ảnh driver cũ, trước khi chỉnh sửa => sd cho editDriver
                    showImg: '',
                    status: '',
                    inputBirthday: '',
                },
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    // xóa tài xế
    handleDeleteDriver = async (id) => {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Bạn có muốn xóa tài xế này") === true) {
                let driverDel = await handleDeleteDriverFromApi(id);
                if (driverDel && driverDel.errCode === 0) {
                    alert(driverDel.message);
                    this.props.getAllDriverOfTransporter(this.props.userInfo.idTransporter);
                }
                else {
                    alert(driverDel.message)
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    // thay đổi thông tin editFrm khi nhấn edit
    changeEditFrmByEditBtn = (driver) => {
        this.setState({
            editFrm: true,
            drivers: {
                id: driver.id,
                image: driver.image,
                userName: driver.userName,
                phone: driver.phone,
                password: driver.password,
                address: driver.address,
                email: driver.email,
                birthday: driver.birthday,
                keyGender: driver.keyGender,
                linkImgOnServer: driver.image, //link ảnh driver cũ, trước khi chỉnh sửa => sd cho editDriver
                showImg: '',
                status: driver.status,
                inputBirthday: driver.birthday.split('/').reverse().join('-')
            },
            oldDriver: {
                image: driver.image,
                userName: driver.userName,
                phone: driver.phone,
                address: driver.address,
                email: driver.email,
                birthday: driver.birthday,
                keyGender: driver.keyGender,
                status: driver.status,
            },
        })
    }
    // so sánh thông tin tài xế trước và sau
    compareOldDriverAndDriver = () => {
        const { image, userName, phone, address, email, birthday, keyGender, status } = this.state.drivers
        if (image === this.state.oldDriver.image &&
            userName === this.state.oldDriver.userName &&
            phone === this.state.oldDriver.phone &&
            address === this.state.oldDriver.address &&
            email === this.state.oldDriver.email &&
            birthday === this.state.oldDriver.birthday &&
            keyGender === this.state.oldDriver.keyGender &&
            status === this.state.oldDriver.status) {
            return true;
        }
        else return false;
    }
    // xử lý chỉnh sửa tài xế
    handleEditDriver = async () => {
        const { id, image, userName, phone, address, email, birthday, keyGender, linkImgOnServer, status } = this.state.drivers
        try {
            if (address && userName && phone && birthday && (keyGender === 'G0' || keyGender === 'G1') && (status === 1 || status === 0)) {
                if (this.compareOldDriverAndDriver()) {
                    alert('Thông tin không có sự thay đổi')
                }
                else {
                    let img;
                    if (image && linkImgOnServer !== image) {
                        //Nếu ảnh thay đổi 
                        // => tải ảnh lên server 
                        const formData = new FormData();
                        formData.append('profile_pic', image);
                        img = await uploadImage(formData);

                        this.setState({
                            drivers: {
                                ...this.state.drivers,
                                image: img.urlImage,
                            }
                        })
                        // => xóa ảnh cũ
                        await handleDeleteFile(linkImgOnServer);
                    }
                    // tài xế được sửa
                    const driverInput = {
                        id: id,
                        idTransporter: this.props.userInfo.idTransporter,
                        image: this.state.drivers.image,
                        userName: userName,
                        phone: phone,
                        address: address,
                        email: email,
                        birthday: birthday,
                        keyGender: keyGender,
                        status: status,
                        keyRole: 'R3'
                    }
                    let driverNew = await handleEditDriverFromApi(driverInput);
                    if (driverNew && driverNew.errCode === 0) {
                        alert(driverNew.message);
                        this.resetForm();
                        this.props.getAllDriverOfTransporter(this.props.userInfo.idTransporter);
                        this.btnCancel.current.click();
                    }
                    else {
                        alert(driverNew.message)
                        // nếu sửa không thành công, thì xóa hình vừa thêm 
                        if (driverInput.image) {
                            await handleDeleteFile(driverInput.image);
                        }
                    }
                }
            }
            else {
                alert("Mời nhập các thông tin bắt buộc");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    // xử lý tìm kiếm tài xế theo tên
    changeSearchInput = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    HandleSearchDriver = (event) => {
        if (event.keyCode === KeyCodeUtils.ENTER) {
            let driverFind = this.props.drivers.filter((driver) =>
                this.removeAccents(driver.userName.toLowerCase()).includes(this.removeAccents(this.state.search.toLowerCase()))
            )
            if (driverFind) {
                this.setState({
                    showDrivers: driverFind
                })
            }
            else {
                alert("Không tìm thấy phương tiện");
            }
        }
    }
    // xóa dấu tiếng việt =>  dùng cho hàm tìm kiếm tên tài xế
    removeAccents = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }
    // xử lý lọc tài xế theo loại tài khoản
    HandleFilterDriver = (event) => {
        console.log(event.target.value);
        if (event.target.value !== 'all') {
            let driverFind = this.props.drivers.filter((driver) =>
                driver.status.toString().includes(event.target.value.toString())
            )
            if (driverFind) {
                this.setState({
                    showDrivers: driverFind
                })
            }
            else {
                alert("Không tìm thấy phương tiện");
            }
        }
        else {
            this.setState({
                showDrivers: this.props.drivers
            })
        }
    }

    // thay đổi thông tin editFrm khi nhấn add
    changeEditFrmByAddBtn = () => {
        this.setState({
            editFrm: false,
        })
        this.resetForm();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.drivers !== prevProps.drivers) {
            console.log("hi")
            this.setState({
                showDrivers: this.props.drivers,
            })
        }
    }

    render() {
        let showNav = this.props.showNav;
        const { showDrivers } = this.state;
        const { id, image, userName, phone, password, address, email, birthday, keyGender, linkImgOnServer, showImg, status, inputBirthday } = this.state.drivers
        console.log(this.state);
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
                                <input type="text" id="search-input" placeholder="Tìm kiếm bằng tên tài xế..."
                                    onKeyDown={this.HandleSearchDriver} onChange={this.changeSearchInput} />
                            </div>

                            {/* lọc */}
                            <div className='filter-component'>
                                <select id="status-account-type" onChange={this.HandleFilterDriver}>
                                    <option hidden>Trạng thái tài khoản</option>
                                    <option value="all">Tất cả</option>
                                    <option value="1">Tài khoản đang hoạt động</option>
                                    <option value="0">Tài khoản ngưng hoạt động</option>
                                </select>
                            </div>

                            {/* thêm */}
                            <div className='add-component'>

                                {/* nút thêm */}
                                <button id="add-driver-button" data-bs-toggle="modal" data-bs-target="#addDriverFrm"
                                    onClick={this.changeEditFrmByAddBtn}>
                                    <i className="fas fa-plus-circle"></i> Thêm Tài Xế
                                </button>

                                <div className="modal fade" id="addDriverFrm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="addDriverFrmLabel">
                                                    {this.state.editFrm ? "Sửa" : "Thêm"} tài xế
                                                </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>

                                            <div className="modal-body">
                                                {/* show ảnh */}
                                                <div className='show_picture'>
                                                    {!showImg && image
                                                        ? <img src={process.env.REACT_APP_BACKEND_URL + image} alt='type of vehicle' />
                                                        : showImg && image
                                                            ? <img src={showImg} alt='type of vehicle' />
                                                            : <span>Mời chọn ảnh</span>}
                                                </div>

                                                {/* thêm ảnh */}
                                                <div className='picture'>
                                                    <div className="mb-3">
                                                        <label id="formFileImg" className="form-label">Hình ảnh tài xế: </label>
                                                        <input name="profile_pic" className="form-control" type="file" htmlFor="formFileImg"
                                                            accept='image/*' ref={this.formRefs.image} onChange={this.changeImage} />
                                                    </div>
                                                </div>

                                                {/* họ tên */}
                                                <div className='user-name'>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text frm-label-username" htmlFor='user-name' >Họ và tên <span className='asterisk'>*</span></span>
                                                        <input type="text" className="form-control" placeholder="Nhập tên tài xế"
                                                            id="user-name" ref={this.formRefs.userName}
                                                            onChange={this.changeUserName} value={userName}
                                                        />
                                                    </div>
                                                </div>

                                                {/* số điện thoại */}
                                                <div className='phone'>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text frm-label-phone" htmlFor='phone'>Số điện thoại <span className='asterisk'>*</span></span>
                                                        <input type="phone" className="form-control" placeholder="Nhập số điện thoại" id="phone"
                                                            ref={this.formRefs.phone}
                                                            onChange={this.changePhone} value={phone}
                                                        />
                                                    </div>
                                                </div>

                                                {/* mật khẩu */}
                                                <div className='password' hidden={this.state.editFrm}>
                                                    <div className="input-group mb-3 input-password">
                                                        <span className="input-group-text frm-label-password" htmlFor='password'>Mật khẩu <span className='asterisk'>*</span></span>
                                                        <input type={this.state.isShowPassWord ? 'text' : 'password'} className="form-control" placeholder="Nhập mật khẩu" id="password"
                                                            ref={this.formRefs.password}
                                                            onChange={this.changePassword} value={password}
                                                        />
                                                        <div>
                                                            <i className={this.state.isShowPassWord ? 'fas fa-eye-slash show-eye ' : 'fas fa-eye show-eye'} onClick={(event) => this.showOrHiddenEye(event)}></i>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* địa chỉ */}
                                                <div className='address'>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text frm-label-address" htmlFor='address'>Địa chỉ<span className='asterisk'>*</span></span>
                                                        <input type="address" className="form-control" placeholder="Nhập địa chỉ" id="address"
                                                            ref={this.formRefs.address}
                                                            onChange={this.changeAddress} value={address}
                                                        />
                                                    </div>
                                                </div>

                                                {/* email */}
                                                <div className='email'>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text frm-label-email" htmlFor='email'>Email</span>
                                                        <input type="email" className="form-control" placeholder="Nhập email" id="email"
                                                            ref={this.formRefs.email}
                                                            onChange={this.changeEmail} value={email}
                                                        />
                                                    </div>
                                                </div>

                                                {/* ngày sinh */}
                                                <div className='date'>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text frm-label-date" htmlFor='date'>Ngày sinh <span className='asterisk'>*</span></span>
                                                        <input type="date" className="form-control" placeholder="Nhập ngày sinh" id="date"
                                                            ref={this.formRefs.birthday}
                                                            onChange={this.changeBirthday} value={inputBirthday}
                                                        />
                                                    </div>
                                                </div>

                                                {/* giới tính */}
                                                <div className='gender input-group mb-3'>
                                                    <label htmlFor='gender' className='input-group-text frm-label-gender'>Giới tính <span className='asterisk'>*</span></label>
                                                    <div className='form-control gender-choose'>
                                                        <div>
                                                            <input type="radio" id="G0" name='gender' value="G0"
                                                                ref={this.formRefs.male}
                                                                onChange={this.changeGender}
                                                                checked={keyGender === 'G0'}
                                                            />
                                                            <label htmlFor="G0">Nam</label><br />
                                                        </div>
                                                        <div>
                                                            <input type="radio" id="G1" name='gender' value="G1"
                                                                ref={this.formRefs.female}
                                                                onChange={this.changeGender}
                                                                checked={keyGender === 'G1'}
                                                            />
                                                            <label htmlFor="G1">Nữ</label><br />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* trạng thái tài khoản */}
                                                <div className='status input-group mb-3'>
                                                    <label htmlFor='status' className='input-group-text frm-label-status'>Trạng thái tài khoản <span className='asterisk'>*</span></label>
                                                    <div className='form-control status-choose'>
                                                        <div>
                                                            <input type="radio" id="status-on" name='status-on' value="1"
                                                                ref={this.formRefs.statusOn}
                                                                onChange={this.changeStatus}
                                                                checked={status === 1}
                                                            />
                                                            <label htmlFor="status-on">Bật</label><br />
                                                        </div>
                                                        <div>
                                                            <input type="radio" id="status-off" name='status-off' value="0"
                                                                ref={this.formRefs.statusOff}
                                                                onChange={this.changeStatus}
                                                                checked={status === 0}
                                                            />
                                                            <label htmlFor="status-off">Tắt</label><br />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={this.btnCancel}>Thoát</button>
                                                <button type="button" className="btn btn-primary"
                                                    onClick={this.state.editFrm ? this.handleEditDriver : this.handleCreateDriver}
                                                >Lưu thay đổi</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* bảng */}
                        <div className='component-2'>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr className='header-table'>
                                        <th>STT</th>
                                        <th>Hình ảnh</th>
                                        <th>Họ Tên</th>
                                        <th>SĐT</th>
                                        <th>Email</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>Địa chỉ</th>
                                        <th>Trạng thái tài khoản</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showDrivers &&
                                        showDrivers.map((driver, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img
                                                        src={driver.image ? process.env.REACT_APP_BACKEND_URL + driver.image : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'}
                                                        style={{ width: '75px' }}
                                                        alt='driver' /></td>
                                                <td>{driver.userName}</td>
                                                <td>{driver.phone}</td>
                                                <td>{driver.email}</td>
                                                <td>{driver.birthday}</td>
                                                <td>{driver.keyGender === 'G0' ? 'Nam' : driver.keyGender === 'G1' ? 'Nữ' : ''}</td>
                                                <td>{driver.address}</td>
                                                <td style={{ fontWeight: '500', color: driver.status === 1 ? '#077d4a' : '#b70709' }}>
                                                    {driver.status === 1 ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                                                </td>
                                                <td>
                                                    <button className='edit-btn' onClick={() => this.changeEditFrmByEditBtn(driver)}
                                                        data-bs-toggle="modal" data-bs-target="#addDriverFrm" >
                                                        Sửa
                                                    </button>
                                                    <button className='delete-btn' onClick={() => this.handleDeleteDriver(driver.id)}>
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>

                        {/* phân trang */}
                        {/* <div className='component-3'>
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
                        </div> */}
                    </div>
                </div>

            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        showNav: state.app.showNav,
        userInfo: state.user.userInfo,
        drivers: state.user.drivers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDriverOfTransporter: (idTrans) => dispatch(GetAllDriverOfTransporter(idTrans)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Driver);
