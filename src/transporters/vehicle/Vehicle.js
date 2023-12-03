import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { KeyCodeUtils } from '../../utils';
import {
    uploadImage, GetAllCodeByType, GetWeightByVehicle, handleCreateVehicleFromApi,
    handleDeleteVehicleFromApi, handleEditVehicleFromApi, handleDeleteFile
}
    from '../../services/userService';
import { GetVehicleByIdTransporter } from '../../../src/store/actions/userActions';
import HeaderTrans from '../header/Header';
import './Vehicle.scss';

class Vehicle extends Component {
    constructor(props) {

        super(props);
        this.btnCancel = React.createRef();

        this.formRefs = {
            weight: React.createRef(),
            image: React.createRef(),
            type: React.createRef(),
            licensePlates: React.createRef(),
            description: React.createRef(),
            statusOn: React.createRef(),
            statusOff: React.createRef()
        };

        this.state = {
            typeOfVehicle: [],
            weightArr: [],
            image: '',
            type: '',
            weight: '',
            licensePlates: '',
            description: '',
            status: '',
            editFrm: false,
            showImg: '',
            linkImgOnServer: '', //link ảnh PT cũ, trước khi chỉnh sửa => sd cho editVehicle
            id: '',
            showVehicles: this.props.vehicles,
            search: '',
            filter: '',
            oldVehicle: {
                image: '',
                type: '',
                weight: '',
                licensePlates: '',
                description: '',
                status: '',
            }
        }
    }

    // lưu thông tin nhà vận chuyển vào state
    changeImage = (event) => {
        if (event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            this.setState({
                image: event.target.files[0],
                showImg: imageUrl,
            });
        }
    }
    changeWeight = (event) => {
        this.setState({
            weight: event.target.value,
        })
    }
    // xóa dấu tiếng việt 
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
        return str;
    }
    changeLicensePlates = (event) => {
        if (this.state.type) {
            if (this.state.type === 'Xe máy') {
                this.changeMotorbikeLicensePlates(event);
            }
            else {
                console.log('truck')
                this.changeTruckLicensePlates(event);
            }
        }
    }
    changeMotorbikeLicensePlates = (event) => {
        let value = event.target.value;
        if (value.length <= 11) {
            if (value.length === 2) {
                value = value + '-';
            }
            if (value.length === 5) {
                value = value + " ";
            }
            this.setState({
                licensePlates: this.removeAccents(value),
            })
        }
    }
    checkMotorbikeLicensePlates = (licensePlates) => {
        console.log('checkMotorbikeLicensePlates', licensePlates);
        const regex = /^\d{2}-[a-zA-Z][a-zA-Z\d]\s[\d]{4,5}$/;
        return regex.test(licensePlates);
    }
    changeTruckLicensePlates = (event) => {
        let value = event.target.value;
        if (value.length <= 9) {
            if (value.length === 3) {
                value = value + '-';
            }
            this.setState({
                licensePlates: this.removeAccents(value),
            })
        }
    }
    checkTruckLicensePlates = (licensePlates) => {
        console.log('checkTruckLicensePlates', licensePlates);
        const regex = /^\d{2}[a-zA-Z]-[\d]{4,5}$/;
        return regex.test(licensePlates);
    }
    changeDescription = (event) => {
        this.setState({
            description: event.target.value,
        })
    }
    changeStatus = (event) => {
        this.setState({
            status: +event.target.value,
        })
    }

    //lấy loại phương tiện từ api
    getVehicleFromApi = async () => {
        try {
            let vehicles = await GetAllCodeByType('TYPE_OF_VEHICLE');
            if (vehicles) {
                let vehicleArr = [];
                for (let i = 0; i < 3; i++) {
                    vehicleArr.push(vehicles.data[i]);
                }
                this.setState({
                    typeOfVehicle: vehicleArr,
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    // lấy weight dựa vào phương tiện
    getWeightByVehicleFromApi = async (event) => {
        try {
            if (event.target) {
                // khi chọn lại một phương tiện mới thì reset khối lượng lại
                this.formRefs.weight.current.value = '-1';
                const vehicle = this.state.typeOfVehicle[event.target.selectedIndex - 1];
                this.setState({
                    type: vehicle.valueVi,
                    weight: '',
                })
                this.getWeight(vehicle.key);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    getWeight = async (keyVehicle) => {
        let weight = await GetWeightByVehicle(keyVehicle);
        if (weight) {
            let weightByVehicleArr = [];
            for (let i = 0; i < Object.keys(weight.data).length; i++) {
                weightByVehicleArr.push(weight.data[i]);
            }
            this.setState({
                weightArr: weightByVehicleArr,
            })
        }
    }

    // lấy khóa phương tiện dựa vào loại phương tiện
    getKeyVehicleByTypeVehicle = (typeVehicle) => {
        const vehicle = this.state.typeOfVehicle.find((vehicle) => vehicle.valueVi === typeVehicle)
        if (vehicle) return vehicle.key;
        return null;
    }

    // tạo phương tiện vận chuyển
    handleCreateVehicle = async () => {
        const { image, type, weight, licensePlates, description, status, id } = this.state;
        try {
            if (image && type && weight && licensePlates && description && (status === 1 || status === 0)) {
                if ((this.state.type === 'Xe máy' && this.checkMotorbikeLicensePlates(licensePlates))
                    || ((this.state.type === 'Ô tô con' || this.state.type === 'Xe tải')
                        && this.checkTruckLicensePlates(licensePlates))
                ) {

                    //tải ảnh lên server
                    const formData = new FormData();
                    formData.append('profile_pic', image);
                    let img = await uploadImage(formData);

                    // tạo phương tiện
                    const vehicleInput = {
                        id: id,
                        image: img.urlImage,
                        type: type,
                        weight: weight,
                        licensePlates: licensePlates,
                        description: description,
                        status: status,
                        idTransporter: this.props.userInfo.idTransporter
                    }
                    let vehicleNew = await handleCreateVehicleFromApi(vehicleInput);
                    if (vehicleNew && vehicleNew.errCode === 0) {
                        alert("Tạo phương tiện thành công");
                        this.resetForm();
                        this.props.getVehicles(this.props.userInfo.idTransporter);
                        this.btnCancel.current.click();
                    }
                    else {
                        await handleDeleteFile(image);
                        alert(vehicleNew.message)
                    }
                }
                else {
                    alert("Mời nhập đúng định dạng biển số xe máy")
                }
            }
            else {
                alert("Mời nhập đủ thông tin");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    // reset form thêm phương tiện
    resetForm = () => {
        try {
            this.formRefs.image.current.value = ''
            this.formRefs.type.current.value = '-1';
            this.formRefs.weight.current.value = '-1';
            this.formRefs.licensePlates.current.value = '';
            this.formRefs.description.current.value = '';
            this.formRefs.statusOff.current.checked = false;
            this.formRefs.statusOn.current.checked = false;
            this.setState({
                image: '',
                type: '',
                weight: '',
                licensePlates: '',
                description: '',
                status: '',
                id: ''
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    // xóa phương tiện vận chuyển
    handleDeleteVehicle = async (id) => {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Bạn có muốn xóa phương tiện này") === true) {
                let vehicleDel = await handleDeleteVehicleFromApi(id);
                if (vehicleDel.errCode === 0) {
                    alert(vehicleDel.message);
                    this.props.getVehicles(this.props.userInfo.idTransporter);
                }
                else {
                    alert(vehicleDel.message)
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    // thay đổi thông tin editFrm khi nhấn edit
    changeEditFrmByEditBtn = (vehicle) => {
        let typeVehicle = this.getKeyVehicleByTypeVehicle(vehicle.type);
        if (typeVehicle) {
            this.getWeight(typeVehicle);
        }
        this.setState({
            id: vehicle.id,
            editFrm: true,
            image: vehicle.image,
            type: vehicle.type,
            weight: vehicle.weight,
            licensePlates: vehicle.licensePlates,
            description: vehicle.description,
            status: vehicle.status,
            showImg: '',
            linkImgOnServer: vehicle.image,
            oldVehicle: {
                image: vehicle.image,
                type: vehicle.type,
                weight: vehicle.weight,
                licensePlates: vehicle.licensePlates,
                description: vehicle.description,
                status: vehicle.status,
            }
        })
    }

    // thay đổi thông tin editFrm khi nhấn add
    changeEditFrmByAddBtn = () => {
        this.setState({
            editFrm: false,
        })
        this.resetForm();
    }
    // so sánh thông tin phương tiện trước và sau
    compareOldVehicleAndVehicle = () => {
        const { image, type, weight, licensePlates, description, status } = this.state
        if (image === this.state.oldVehicle.image &&
            type === this.state.oldVehicle.type &&
            weight === this.state.oldVehicle.weight &&
            licensePlates === this.state.oldVehicle.licensePlates &&
            description === this.state.oldVehicle.description &&
            status === this.state.oldVehicle.status) {
            return true;
        }
        else return false;
    }
    // xử lý chỉnh sửa phương tiện
    handleEditVehicle = async () => {
        const { image, type, weight, licensePlates, description, status, linkImgOnServer, id } = this.state;
        try {
            if (image && type && weight && licensePlates && description && (status === 1 || status === 0)) {
                if (this.compareOldVehicleAndVehicle()) {
                    alert('Thông tin không có sự thay đổi')
                }
                else {

                    if ((this.state.type === 'Xe máy' && this.checkMotorbikeLicensePlates(licensePlates))
                        || ((this.state.type === 'Ô tô con' || this.state.type === 'Xe tải')
                            && this.checkTruckLicensePlates(licensePlates))
                    ) {

                        let img;
                        if (linkImgOnServer !== image) {
                            //Nếu ảnh thay đổi 
                            // => tải ảnh lên server 
                            const formData = new FormData();
                            formData.append('profile_pic', image);
                            img = await uploadImage(formData);
                            this.setState({
                                image: img.urlImage
                            })
                            // => xóa ảnh cũ
                            await handleDeleteFile(linkImgOnServer);
                        }

                        // phương tiện được sửa
                        const vehicleEdit = {
                            id: id,
                            image: this.state.image,
                            type: type,
                            weight: weight,
                            licensePlates: licensePlates,
                            description: description,
                            status: status,
                        }

                        let vehicleNew = await handleEditVehicleFromApi(vehicleEdit);
                        if (vehicleNew && vehicleNew.errCode === 0) {
                            alert(vehicleNew.message);
                            this.resetForm();
                            this.props.getVehicles(this.props.userInfo.idTransporter);
                            this.btnCancel.current.click();
                        }
                        else {
                            alert(vehicleNew.message)
                            // nếu sửa không thành công, thì xóa hình vừa thêm 
                            if (vehicleEdit.image) {
                                await handleDeleteFile(vehicleEdit.image);
                            }
                        }
                    }
                    else {
                        alert("Mời nhập đúng định dạng biển số xe");
                    }
                }
            }
            else {
                alert("Mời nhập đủ thông tin");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    // xử lý tìm kiếm phương tiện
    HandleSearchVehicle = (event) => {
        if (event.keyCode === KeyCodeUtils.ENTER) {
            let vehicleFind = this.props.vehicles.filter((vehicle) => vehicle.licensePlates.toLowerCase().includes(this.state.search.toLowerCase()))
            if (vehicleFind) {
                this.setState({
                    showVehicles: vehicleFind
                })
            }
            else {
                alert("Không tìm thấy phương tiện");
            }
        }
    }

    // xử lý lọc phương tiện
    HandleFilterVehicle = (event) => {
        if (event.target.value !== 'all') {
            let vehicleFind = this.props.vehicles.filter((vehicle) => vehicle.type.includes(event.target.value))
            if (vehicleFind) {
                this.setState({
                    showVehicles: vehicleFind
                })
            }
            else {
                alert("Không tìm thấy phương tiện");
            }
        }
        else {
            this.setState({
                showVehicles: this.props.vehicles
            })
        }
    }
    changeSearchInput = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    componentDidMount() {
        this.getVehicleFromApi();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.vehicles !== prevProps.vehicles) {
            this.setState({
                showVehicles: this.props.vehicles,
            })
        }
    }
    render() {
        let { showNav } = this.props;
        const { typeOfVehicle, weightArr, editFrm, showVehicles } = this.state;
        const { weight, type, description, image, licensePlates, statusOff, statusOn } = this.formRefs;
        console.log(this.state);
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
                                <input type="text" id="search-input" placeholder="Tìm kiếm bằng biển số xe..."
                                    onKeyDown={this.HandleSearchVehicle} onChange={this.changeSearchInput} />
                            </div>

                            {/* lọc */}
                            <div className='filter-component'>
                                <select id="vehicle-type" onChange={this.HandleFilterVehicle}>
                                    <option hidden>Loại xe</option>
                                    <option value="all">Tất cả</option>
                                    {
                                        Object.keys(this.state.typeOfVehicle).length > 0 &&
                                        typeOfVehicle.map((vehicle, index) =>
                                            <option key={index} value={vehicle.valueVi}>{vehicle.valueVi}</option>
                                        )
                                    }
                                </select>
                            </div>

                            {/* thêm */}
                            <div className='add-component'>

                                {/* nút thêm */}
                                <button id="add-vehicle-button"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    onClick={this.changeEditFrmByAddBtn}
                                >
                                    <i className="fas fa-plus-circle"></i> Thêm Phương Tiện
                                </button>

                                {/* form thêm phương tiện vận chuyển */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    {editFrm ? "Sửa" : "Thêm"} phương tiện vận chuyển
                                                </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>

                                            <div className="modal-body">
                                                {/* show ảnh */}
                                                <div className='show_picture'>
                                                    {!this.state.showImg && this.state.image
                                                        ? <img src={process.env.REACT_APP_BACKEND_URL + this.state.image} alt='type of vehicle' />
                                                        : this.state.showImg && this.state.image
                                                            ? <img src={this.state.showImg} alt='type of vehicle' />
                                                            : <span>Mời chọn ảnh</span>}
                                                </div>


                                                {/* thêm ảnh */}
                                                <div className='picture'>
                                                    <div className="mb-3">
                                                        <label htmlFor="formFileImg" className="form-label">Hình ảnh phương tiện: </label>
                                                        <input name="profile_pic" className="form-control" type="file" id="formFileImg" accept='image/*'
                                                            ref={image} onChange={this.changeImage} />
                                                    </div>
                                                </div>

                                                {/* loai xe */}
                                                <div className='vehicle-type input-group mb-3'>
                                                    <label htmlFor="vehicle-type" className='input-group-text label-vehicle'>Loại xe</label>
                                                    <select id="vehicle-type" className="form-select" value={this.state.type}
                                                        ref={type} onChange={this.getWeightByVehicleFromApi} >
                                                        <option hidden value='-1'>Loại xe</option>
                                                        {
                                                            Object.keys(this.state.typeOfVehicle).length > 0 &&
                                                            typeOfVehicle.map((vehicle, index) =>
                                                                <option key={index} value={vehicle.valueVi}>{vehicle.valueVi}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>

                                                {/* khối lượng */}
                                                <div className='weight input-group mb-3'>
                                                    <label htmlFor="weight" className='input-group-text label-weight'>Khối lượng</label>
                                                    <select id="weight" className="form-select" value={this.state.weight}
                                                        onChange={this.changeWeight} ref={weight}>
                                                        <option hidden key='-1' value='-1'>Khối lượng</option>
                                                        {
                                                            Object.keys(weightArr).length > 0 &&
                                                            weightArr.map((weight, index) =>
                                                                <option key={index} value={weight.valueVi}>{weight.valueVi}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>

                                                {/* biển số xe */}
                                                <div className='license-plates'>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="license-plates">Biển số xe</span>
                                                        <input type="text" className="form-control" placeholder="Nhập vào biển số xe" htmlFor='license-plates'
                                                            ref={licensePlates} onChange={this.changeLicensePlates} value={this.state.licensePlates} />
                                                    </div>
                                                    <div className='mb-3 note-license-plates' style={{ display: this.state.type === 'Xe máy' ? 'block' : 'none' }}>
                                                        Biển số xe máy có dạng VD (65-E1 51933, 65-E1 49876,...)
                                                    </div>
                                                    <div className='mb-3 note-license-plates' style={{ display: (this.state.type === 'Xe tải' || this.state.type === 'Ô tô con') ? 'block' : 'none' }} >
                                                        Biển số xe tải có dạng VD (29C-51933, 29C-49876,...)
                                                    </div>
                                                </div>

                                                {/* mô tả */}
                                                <div className='describe input-group mb-3'>
                                                    <label htmlFor='describe' className='input-group-text label-describe'>Mô tả</label>
                                                    <input type="text" className="form-control" placeholder="Nhập vào mô tả" htmlFor='license-plates'
                                                        ref={description} onChange={this.changeDescription} value={this.state.description} />
                                                </div>

                                                {/* trạng thái */}
                                                <div className='status-vehicle input-group mb-3'>
                                                    <label htmlFor='status-vehicle' className='input-group-text'>Trạng thái hoạt động </label>
                                                    <div className='form-control status'>
                                                        <div>
                                                            <input type="radio" id="status-on" name='status' value="1"
                                                                ref={statusOn} onChange={this.changeStatus}
                                                                checked={this.state.status === 1}
                                                            />
                                                            <label htmlFor="status-on">Bật</label><br />
                                                        </div>
                                                        <div>
                                                            <input type="radio" id="status-off" name='status' value="0"
                                                                ref={statusOff} onChange={this.changeStatus}
                                                                checked={this.state.status === 0}
                                                            />
                                                            <label htmlFor="status-off">Tắt</label><br />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={this.btnCancel}>Thoát</button>
                                                <button type="button" className="btn btn-primary" onClick={editFrm ? this.handleEditVehicle : this.handleCreateVehicle}>Lưu thay đổi</button>
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
                                        <th>Loại xe</th>
                                        <th>Khối lượng</th>
                                        <th>Biển số xe</th>
                                        <th>Mô tả</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showVehicles &&
                                        showVehicles.map((vehicle, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img
                                                        src={process.env.REACT_APP_BACKEND_URL + vehicle.image}
                                                        style={{ width: '75px' }}
                                                        alt='vehicle' /></td>
                                                <td>{vehicle.type}</td>
                                                <td>{vehicle.weight}</td>
                                                <td>{vehicle.licensePlates}</td>
                                                <td>{vehicle.description}</td>
                                                <td
                                                    style={
                                                        vehicle.status === 1
                                                            ? { color: '#077d4a', fontWeight: '500' }
                                                            : { color: '#b70709', fontWeight: '500' }}
                                                >{vehicle.status === 1 ? 'Hoạt động' : 'Ngưng hoạt động'}</td>
                                                <td>
                                                    <button className='edit-btn' onClick={() => this.changeEditFrmByEditBtn(vehicle)}
                                                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Sửa
                                                    </button>
                                                    <button className='delete-btn' onClick={() => this.handleDeleteVehicle(vehicle.id)}>
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

            </React.Fragment >
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        showNav: state.app.showNav,
        language: state.app.language,
        userInfo: state.user.userInfo,
        vehicles: state.user.vehicles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getVehicles: (idTrans) => dispatch(GetVehicleByIdTransporter(idTrans)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
