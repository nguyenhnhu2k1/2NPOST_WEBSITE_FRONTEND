import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import * as actions from "../../store/actions";

import {
    getAllUserLocationByIdUserAPI, handleDeleteUserLocationByIdAPI, handleCreateUserLocationFromApi, handleEditTransporterFromApi,
    handleDeleteServiceOfTransporterFromApi, handleCreateServiceOfTransporterFromApi, getAllCostCodeFromAPI, getCostTransporterFromAPI, updateCostTransporterFromAPI,
    handleCreateCostOfTransporterFromApi, uploadImage, handleDeleteFile
} from '../../services/userService';
import HeaderTrans from '../header/Header';
import './StoreManager.scss';
import SimpleMap from '../SimpleMap';


class StoreManager extends Component {
    constructor(props) {
        super(props);
        this.btnCancel = React.createRef();
        this.state = {
            transInfo: {
                image: this.props.userInfo.image,
                showImg: '',
                transporterName: this.props.userInfo.transporterName,
                email: this.props.userInfo.email,
                phone: this.props.userInfo.phone,
                description: this.props.userInfo.description,
                foundingDate: this.props.userInfo.foundingDate,
                address: this.props.userInfo.address,
                id: this.props.userInfo.id,
                idTransporter: this.props.userInfo.idTransporter,
                idDefaultLocation: ''
            },
            oldTransInfo: {
                image: this.props.userInfo.image,
                transporterName: this.props.userInfo.transporterName,
                email: this.props.userInfo.email,
                phone: this.props.userInfo.phone,
                description: this.props.userInfo.description,
                foundingDate: this.props.userInfo.foundingDate,
                address: this.props.userInfo.address,
            },
            // lưu địa chỉ tạm thời
            temporaryAddress: this.props.userInfo.address,
            temporaryDefaultLocation: {
                lat: '',
                lng: ''
            },
            // lưu tọa độ
            defaultLocation: {
                lat: '',
                lng: ''
            },
            // ngày thành lập đầu vào
            inputDate: this.props.userInfo.foundingDate
                ? this.props.userInfo.foundingDate.split('/').reverse().join('-') : '',
            // lấy dịch vụ và phạm vi từ
            services: [],
            // scope: [],
            // lấy dịch vụ và phạm vi ban đầu
            oldServices: this.props.services,
            // oldScope: this.props.scope,
            // kiểm tra xem phạm vi vùng miền có được chọn hay không
            checkedDomain: false,
            // lưu giá trị phạm vi
            // scopeInput: '',
            // -----------xử lý giá-------------

            suggestedPrice: {
                SE0: [],
                SE1: [],
                SE2: []
            },
            currentPrice: {
                SE0: [],
                SE1: [],
                SE2: []
            },
            newPrice: {
                SE0: [],
                SE1: [],
                SE2: []
            }
        };
        this.serviceRef = {
            SE0: React.createRef(),
            SE1: React.createRef(),
            SE2: React.createRef()
        }
        // this.scopeRef = {
        //     S: React.createRef(),
        //     S0: React.createRef(),
        //     S1: React.createRef(),
        //     S2: React.createRef(),
        //     S3: React.createRef(),
        //     S4: React.createRef()
        // }
    }
    changeImage = (event) => {
        if (event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            this.setState({
                transInfo: {
                    ...this.state.transInfo,
                    image: event.target.files[0],
                    showImg: imageUrl,
                }
            });
        }
    }
    onChangeTransporterName = (event) => {
        this.setState({
            transInfo: {
                ...this.state.transInfo,
                transporterName: event.target.value
            }
        })
    }
    onChangeEmail = (event) => {
        this.setState({
            transInfo: {
                ...this.state.transInfo,
                email: event.target.value
            }
        })
    }
    onChangeDescription = (event) => {
        this.setState({
            transInfo: {
                ...this.state.transInfo,
                description: event.target.value
            }
        })
    }
    onChangeFoundingDate = (event) => {
        if (event.target.value) {
            this.setState({
                transInfo: {
                    ...this.state.transInfo,
                    foundingDate: this.formatDateDDMMYYY(event.target.value)
                },
                inputDate: (event.target.value).split('/').reverse().join('-')
            })
        }
    }
    // lưu địa chỉ tạm thời
    getAddress = (address, lngLat) => {
        this.setState({
            temporaryAddress: address,
            temporaryDefaultLocation: lngLat //lat, lng
        })
    }
    // cập nhật địa chỉ
    updateLocation = () => {
        if (this.state.temporaryAddress && this.state.temporaryDefaultLocation) {
            this.setState({
                transInfo: {
                    ...this.state.transInfo,
                    address: this.state.temporaryAddress
                },
                defaultLocation: this.state.temporaryDefaultLocation
            })
            this.btnCancel.current.click();
        }
        else {
            alert("Chưa có địa chỉ được chọn!");
        }
    }

    // chuyển đổi ngày DD/MM/YYYY
    formatDateDDMMYYY = (dateString) => {
        // Hàm này sẽ định dạng lại giá trị thành "DD/MM/YYYY"
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    // chuyển đổi ngày YYYY/MM/DD
    formatDateYYYYMMDD = (dateString) => {
        // Tách ngày, tháng và năm từ chuỗi
        const dateParts = dateString.split("/");
        const day = String(dateParts[0]).padStart(2, '0');
        const month = String(dateParts[1]).padStart(2, '0');
        const year = dateParts[2];

        // Chuyển đổi sang định dạng "YYYY/MM/DD"
        return `${year}-${month}-${day}`;
    }

    // gán dịch vụ vào giao diện
    getServiceOfTransporter = (ArrService) => {
        this.setState({
            services: this.props.services,
            oldServices: this.props.services
        })
        ArrService.forEach((service) => {
            if (service === 'SE0') {
                this.serviceRef.SE0.current.checked = true;
            }
            if (service === 'SE1') {
                this.serviceRef.SE1.current.checked = true;
            }
            if (service === 'SE2') {
                this.serviceRef.SE2.current.checked = true;
            }
        })
    }
    // gán phạm vi hoạt động vào giao diện
    // getScopeOfTransporter = (ArrScope) => {
    //     if (ArrScope) {
    //         ArrScope.forEach((scope) => {
    //             if (scope === 'S0') {
    //                 this.onChangeChooseScope('S0')
    //             }
    //             else if (scope === 'S1') {
    //                 this.onChangeChooseScope('S1')
    //             }
    //             else {
    //                 if (scope === 'S2') {
    //                     this.scopeRef.S2.current.checked = true;
    //                 }
    //                 if (scope === 'S3') {
    //                     this.scopeRef.S3.current.checked = true;
    //                 }
    //                 if (scope === 'S4') {
    //                     this.scopeRef.S4.current.checked = true;
    //                 }
    //                 this.onChangeChooseScope('S')
    //             }
    //         })
    //     }
    // }
    // xử lý chọn 1 trong 3 phạm vi
    // onChangeChooseScope = (value) => {
    //     this.setState({
    //         scopeInput: value
    //     })
    //     if (value === 'S') {
    //         this.setState({
    //             scope: []
    //         })
    //         if (this.scopeRef.S2.current.checked) {
    //             this.setState((prevState) => {
    //                 if (!prevState.scope.includes('S2')) {
    //                     return { scope: [...prevState.scope, 'S2'] };
    //                 }
    //             });
    //         }
    //         if (this.scopeRef.S3.current.checked) {
    //             this.setState((prevState) => {
    //                 if (!prevState.scope.includes('S3')) {
    //                     return { scope: [...prevState.scope, 'S3'] };
    //                 }
    //             });
    //         }
    //         if (this.scopeRef.S4.current.checked) {
    //             this.setState((prevState) => {
    //                 if (!prevState.scope.includes('S4')) {
    //                     return { scope: [...prevState.scope, 'S4'] };
    //                 }
    //             });
    //         }
    //         this.setState({
    //             checkedDomain: true,
    //         })
    //     }
    //     else {
    //         this.setState({
    //             scope: value,
    //             checkedDomain: false
    //         })
    //     }
    // }
    //xử lý chọn miền
    // onChangeChooseDomain = (event) => {
    //     const value = event.target.value;
    //     const isChecked = event.target.checked;
    //     this.setState((prevState) => {
    //         if (isChecked) {
    //             return { scope: [...prevState.scope, value] }
    //         }
    //         else {
    //             return {
    //                 scope: prevState.scope.filter((s) => s !== value)
    //             }
    //         }
    //     })
    // }
    // định dạng email
    validationEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
    // so sánh thông tin nhà vận chuyển
    compareInfoTrans = () => {
        const { image, transporterName, email, description, foundingDate, address } = this.state.transInfo;
        if (image === this.state.oldTransInfo.image && transporterName === this.state.oldTransInfo.transporterName
            && email === this.state.oldTransInfo.email && description === this.state.oldTransInfo.description
            && foundingDate === this.state.oldTransInfo.foundingDate && address === this.state.oldTransInfo.address) {
            return true;
        }
        else return false;
    }
    // so sánh dịch vụ + phạm vi cung cấp trước và sau
    compareArr = (arr1, arr2) => {
        if (arr1 && arr2) {
            if (!Array.isArray(arr1)) {
                arr1 = arr1.split(',');
            }
            if (!Array.isArray(arr2)) {
                arr2 = arr2.split(',');
            }
            const sortedArr1 = arr1.slice().sort();
            const sortedArr2 = arr2.slice().sort();
            return sortedArr1.length === sortedArr2.length && sortedArr1.every((value, index) => value === sortedArr2[index]);
        }
        return false;
    }
    compareArrToAddAndDelete = (newServices, currentServices) => {
        if (newServices && !Array.isArray(newServices)) {
            newServices = newServices.split(',');
        }
        if (currentServices && !Array.isArray(currentServices)) {
            currentServices = currentServices.split(',');
        }
        // So sánh danh sách mới và danh sách hiện tại để xác định dịch vụ cần thêm và xóa
        const servicesToAdd = newServices.filter(service => !currentServices.some(s => s === service));
        const servicesToDelete = currentServices.filter(s => !newServices.includes(s));
        const result = {
            servicesToAdd: servicesToAdd,
            servicesToDelete: servicesToDelete
        };
        return result;
    }
    // nhấn lưu thông tin nhà vận chuyển
    handleSaveChangesInfoTrans = async () => {
        const { image, transporterName, email, description, foundingDate, address } = this.state.transInfo
        const { oldimage, oldtransporterName, oldemail, olddescription, oldfoundingDate, oldaddress } = this.state.oldTransInfo
        if (image && transporterName && email && description && foundingDate && address) {
            if (this.validationEmail(email)) {
                if (this.state.services.length) {
                    // if (this.state.scope.length) {

                    if (this.compareInfoTrans() && this.compareArr(this.state.services, this.state.oldServices) && this.compareArr(this.state.scope, this.state.oldScope)) {
                        alert("Chưa có sự thay đổi nào");
                    }
                    else {
                        try {
                            // cập nhật khi thông tin nvc thay đổi
                            if (!this.compareInfoTrans()) {
                                // cập nhật vị trí
                                // kiểm tra vị trí có thay đổi hay không
                                if (oldaddress !== address) {
                                    let allUserLocation = await getAllUserLocationByIdUserAPI(this.props.userInfo.id);
                                    if (allUserLocation.errCode === 0 && allUserLocation.data.length > 0) {
                                        await handleDeleteUserLocationByIdAPI(allUserLocation.data[0].id);
                                    }
                                    const userLocationInput = {
                                        lat: this.state.defaultLocation.lat,
                                        lng: this.state.defaultLocation.lng,
                                        idUser: this.props.userInfo.id,
                                        detailAddress: address
                                    }
                                    await handleCreateUserLocationFromApi(userLocationInput);
                                    let findUserLocation = await getAllUserLocationByIdUserAPI(this.props.userInfo.id);
                                    console.log(findUserLocation)
                                    if (findUserLocation.errCode === 0 && findUserLocation.data.length > 0) {
                                        console.log(findUserLocation)
                                        this.setState({
                                            transInfo: {
                                                ...this.state.transInfo,
                                                idDefaultLocation: findUserLocation.data[0].id
                                            },

                                        })
                                    }

                                }
                                let img;
                                if (oldimage !== image) {
                                    //Nếu ảnh thay đổi 
                                    // => tải ảnh lên server 
                                    const formData = new FormData();
                                    formData.append('profile_pic', image);
                                    img = await uploadImage(formData);
                                    // => xóa ảnh cũ
                                    if (oldimage) {
                                        await handleDeleteFile(oldimage);
                                    }
                                    this.setState({
                                        transInfo: {
                                            ...this.state.transInfo,
                                            image: img.urlImage
                                        },
                                        oldTransInfo: {
                                            ...this.state.oldTransInfo,
                                            image: img.urlImage
                                        }
                                    })
                                }
                                //  cập nhật thông tin người dùng
                                let transporterNew = await handleEditTransporterFromApi(this.state.transInfo);
                                if (transporterNew && transporterNew.errCode === 0) {
                                    let userInfo = {
                                        ...transporterNew.data.userNew,
                                        ...transporterNew.data.transporterNew,
                                    }
                                    this.props.userLoginSuccess(userInfo);
                                }
                            }
                            // cập nhật dịch vụ cho nhà vận chuyển
                            if (!this.compareArr(this.state.services, this.state.oldServices)) {
                                let result = this.compareArrToAddAndDelete(this.state.services, this.state.oldServices)
                                if (result.servicesToAdd.length > 0) {
                                    let addService = await handleCreateServiceOfTransporterFromApi(result.servicesToAdd, this.props.userInfo.idTransporter)
                                    if (addService && addService.errCode === 0) {
                                        this.props.getServiceOfTransporterAPI(this.props.userInfo.idTransporter);
                                    }
                                }
                                if (result.servicesToDelete.length > 0) {
                                    let deleteService = await handleDeleteServiceOfTransporterFromApi(result.servicesToDelete, this.props.userInfo.idTransporter)
                                    if (deleteService && deleteService.errCode === 0) {
                                        this.props.getServiceOfTransporterAPI(this.props.userInfo.idTransporter);
                                    }
                                }

                            }
                            // cập nhật phạm vi cho nhà vận chuyển
                            // if (!this.compareArr(this.state.scope, this.state.oldScope)) {
                            //     let result = this.compareArrToAddAndDelete(this.state.scope, this.state.oldScope)

                            //     if (result.servicesToAdd.length > 0) {
                            //         // Thêm mảng này vào scope
                            //         let addScope = await handleCreateScopeOfTransporterFromApi(result.servicesToAdd, this.props.userInfo.idTransporter)
                            //         if (addScope && addScope.errCode === 0) {
                            //             this.props.getScopeOfTransporterAPI(this.props.userInfo.idTransporter);
                            //         }
                            //     }

                            //     if (result.servicesToDelete.length > 0) {
                            //         // xóa mảng này khỏi scope
                            //         let deleteScope = await handleDeleteScopeOfTransporterFromApi(result.servicesToDelete, this.props.userInfo.idTransporter)
                            //         if (deleteScope && deleteScope.errCode === 0) {
                            //             this.props.getScopeOfTransporterAPI(this.props.userInfo.idTransporter);
                            //         }
                            //     }
                            // }
                            alert("Chỉnh sửa thành công");
                        } catch (e) {
                            alert("Có lỗi khi chỉnh sửa thông tin", e);
                        }
                    }

                    // }
                    //  else {
                    //     alert("Mời chọn phạm vi hoạt động!");
                    // }
                } else {
                    alert("Mời chọn dịch vụ bạn cung cấp!");
                }
            }
            else {
                alert("Mời nhập đúng định dạng email!");
            }
        }
        else {
            alert("Không được bỏ trống thông tin nhà vận chuyển!");
        }
    }
    // xử lý chọn dịch vụ nhà vận chuyển
    onChangeChooseService = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        this.setState((prevState) => {
            if (isChecked) {
                return { services: [...prevState.services, value] }
            }
            else {
                return {
                    services: prevState.services.filter((service) => service !== value)
                }
            }
        })
    }

    // lấy giá tham khảo từ api
    getAllCostCode = async () => {
        try {
            let suggestCost = await getAllCostCodeFromAPI();
            if (suggestCost && suggestCost.errCode === 0) {
                console.log(suggestCost)
                let suggestCostSE0 = [];
                let suggestCostSE1 = [];
                let suggestCostSE2 = [];
                for (let i = 0; i < 5; i++) {
                    suggestCostSE0.push(suggestCost.data[i]);
                }
                for (let i = 5; i < 12; i++) {
                    suggestCostSE1.push(suggestCost.data[i]);
                }
                for (let i = 12; i < suggestCost.data.length; i++) {
                    suggestCostSE2.push(suggestCost.data[i]);
                }
                this.setState({
                    suggestedPrice: {
                        SE0: suggestCostSE0,
                        SE1: suggestCostSE1,
                        SE2: suggestCostSE2
                    }
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    handleChangeNewPriceSE0 = (event, index) => {
        const newPrice = JSON.parse(JSON.stringify(this.state.newPrice));
        newPrice.SE0[index] = event.target.value;
        this.setState({ newPrice });
    }
    handleChangeNewPriceSE1 = (event, index) => {
        const newPrice = JSON.parse(JSON.stringify(this.state.newPrice));
        newPrice.SE1[index] = event.target.value;
        this.setState({ newPrice });
    }
    handleChangeNewPriceSE2 = (event, index) => {
        const newPrice = JSON.parse(JSON.stringify(this.state.newPrice));
        newPrice.SE2[index] = event.target.value;
        this.setState({ newPrice });
    }

    SetCurrentCostAndNewCost = async () => {
        try {
            let costSE0 = await getCostTransporterFromAPI('SE0', this.props.userInfo.idTransporter);
            let costSE1 = await getCostTransporterFromAPI('SE1', this.props.userInfo.idTransporter);
            let costSE2 = await getCostTransporterFromAPI('SE2', this.props.userInfo.idTransporter);
            // gán giá
            if (costSE0 && costSE0.errCode === 0 && costSE1 && costSE1.errCode === 0 && costSE2 && costSE2.errCode === 0) {
                let currentCostSE0 = [];
                let currentCostSE1 = [];
                let currentCostSE2 = [];
                // SE0 nếu 
                if (costSE0.data.length === 0) {
                    console.log(this.state.suggestedPrice.SE0)
                    let suggestCostSE0 = [];
                    this.state.suggestedPrice.SE0.map((cost) =>
                        suggestCostSE0.push(cost.cost)
                    )
                    if (suggestCostSE0.length > 0) {
                        let createCostDefault = await handleCreateCostOfTransporterFromApi('SE0', suggestCostSE0, this.props.userInfo.idTransporter)
                        if (createCostDefault && createCostDefault.errCode === 0) {
                            console.log(createCostDefault);
                            for (let i = 0; i < createCostDefault.data.length; i++) {
                                currentCostSE0.push(createCostDefault.data[i].cost);
                                console.log('createCostDefault.data[i].cost', createCostDefault.data[i].cost);
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < costSE0.data.length; i++) {
                        currentCostSE0.push(costSE0.data[i].cost);
                        console.log('costSE0.data[i].cost', costSE0.data[i].cost);
                    }
                }

                if (costSE1.data.length === 0) {
                    console.log(costSE1.data);
                    let suggestCostSE1 = [];
                    this.state.suggestedPrice.SE1.map((cost) =>
                        suggestCostSE1.push(cost.cost)
                    )
                    console.log(suggestCostSE1)
                    if (suggestCostSE1.length > 0) {
                        let createCostDefault = await handleCreateCostOfTransporterFromApi('SE1', suggestCostSE1, this.props.userInfo.idTransporter)
                        if (createCostDefault && createCostDefault.errCode === 0) {
                            console.log(createCostDefault);
                            for (let i = 0; i < createCostDefault.data.length; i++) {
                                currentCostSE1.push(createCostDefault.data[i].cost);
                                console.log('createCostDefault.data[i].cost', createCostDefault.data[i].cost);
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < costSE1.data.length; i++) {
                        currentCostSE1.push(costSE1.data[i].cost);
                    }
                }
                console.log(costSE2.data.length);

                if (costSE2.data.length === 0) {
                    console.log(costSE2.data);
                    let suggestCostSE2 = [];
                    this.state.suggestedPrice.SE2.map((cost) =>
                        suggestCostSE2.push(cost.cost)
                    )
                    if (suggestCostSE2.length > 0) {
                        let createCostDefault = await handleCreateCostOfTransporterFromApi('SE2', suggestCostSE2, this.props.userInfo.idTransporter)
                        if (createCostDefault && createCostDefault.errCode === 0) {
                            console.log(createCostDefault);
                            for (let i = 0; i < createCostDefault.data.length; i++) {
                                currentCostSE2.push(createCostDefault.data[i].cost);
                                console.log('createCostDefault.data[i].cost', createCostDefault.data[i].cost);
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < costSE2.data.length; i++) {
                        currentCostSE2.push(costSE2.data[i].cost);
                    }
                }
                console.log(currentCostSE0)
                console.log(currentCostSE1)
                console.log(currentCostSE2)

                this.setState({
                    currentPrice: {
                        SE0: currentCostSE0,
                        SE1: currentCostSE1,
                        SE2: currentCostSE2
                    },
                    newPrice: {
                        SE0: currentCostSE0,
                        SE1: currentCostSE1,
                        SE2: currentCostSE2
                    }
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    checkArrayHasNull = (Arr) => {
        if (Arr && Arr.length > 0) {
            for (let i = 0; i < Arr.length; i++) {
                if (!Arr[i]) return false;
            }
            return true;
        }
    }
    HandleUpdateCurrentCostAndNewCost = async () => {
        const SE0 = this.state.newPrice.SE0;
        const SE1 = this.state.newPrice.SE1;
        const SE2 = this.state.newPrice.SE2;

        if (SE0.length === 5 && this.checkArrayHasNull(SE0)
            && SE1.length === 7 && this.checkArrayHasNull(SE1)
            && SE2.length === 7 && this.checkArrayHasNull(SE2)) {
            if (this.compareArr(this.state.currentPrice.SE0, SE0)
                && this.compareArr(this.state.currentPrice.SE1, SE1)
                && this.compareArr(this.state.currentPrice.SE2, SE2)) {
                alert("Giá không có sự thay đổi");
            }
            else {
                try {
                    //cập nhật SE0
                    if (!this.compareArr(this.state.currentPrice.SE0, SE0)) {//kiểm tra mảng cũ và mới khác nhau k
                        //nếu 2 mảng khác nhau thì cập nhật SE0
                        await updateCostTransporterFromAPI('SE0', SE0, this.props.userInfo.idTransporter);
                        this.SetCurrentCostAndNewCost();
                    }

                    //cập nhật SE1
                    if (!this.compareArr(this.state.currentPrice.SE1, SE1)) {//kiểm tra mảng cũ và mới khác nhau k
                        //nếu 2 mảng khác nhau thì cập nhật SE1
                        await updateCostTransporterFromAPI('SE1', SE1, this.props.userInfo.idTransporter);
                        this.SetCurrentCostAndNewCost();
                    }

                    //cập nhật SE2
                    if (!this.compareArr(this.state.currentPrice.SE2, SE2)) {//kiểm tra mảng cũ và mới khác nhau k
                        //nếu 2 mảng khác nhau thì cập nhật SE2
                        await updateCostTransporterFromAPI('SE2', SE2, this.props.userInfo.idTransporter);
                        this.SetCurrentCostAndNewCost();
                    }
                    alert("Cập nhật giá thành công");
                }
                catch (e) {
                    alert("Có lỗi khi cập nhật giá", e)
                }
            }

            console.log() //so sanh mang cu va moi
        }
        else {
            alert("Không được bỏ trống thông tin");
        }
    }
    formatCurrency = (currencyString) => {
        // // Kiểm tra nếu chuỗi không phải là một số hợp lệ thì trả về '0 ₫'
        // if (isNaN(currencyString)) {
        //   return '0 ₫';
        // }

        // Sử dụng hàm Number để chuyển chuỗi thành số và sau đó sử dụng hàm toLocaleString để định dạng số tiền
        const number = Number(currencyString);
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    componentDidMount() {
        if (this.props.services) {
            this.getServiceOfTransporter(this.props.services);
        }
        // if (this.props.scope) {
        //     this.setState({
        //         oldScope: this.props.scope,
        //     })
        //     this.getScopeOfTransporter(this.props.scope);
        // }
        console.log(this.state.suggestedPrice)
        this.getAllCostCode();
        this.SetCurrentCostAndNewCost();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.services !== prevProps.services) {
            this.getServiceOfTransporter(this.props.services);
        }
        // if (this.props.scope !== prevProps.scope) {
        //     this.setState({
        //         oldScope: this.props.scope,
        //     })
        //     this.getScopeOfTransporter(this.props.scope);
        // }
    }

    render() {
        let showNav = this.props.showNav;
        let { transporterName, email, phone, description, address } = this.state.transInfo
        console.log('this.props.userInfo', this.props.userInfo);
        console.log('this.state', this.state);
        return (
            <React.Fragment>

                {/* header  */}
                <HeaderTrans />

                {/* nội dung trang */}
                <div className='store-manager'>
                    <div className={`store-manager-component ${showNav ? '' : 'active-show-nav'}`}>

                        <div className='heading-and-price'>
                            <p className='title-1-base'>THÔNG TIN NHÀ VẬN CHUYỂN</p>

                            {/* nút thêm */}
                            <button id="add-driver-button" data-bs-toggle="modal" data-bs-target='#updatePrice'>
                                <i className="fas fa-plus-circle"></i> Cập nhật giá
                            </button>

                            {/* form cập nhật giá */}
                            <div className="modal fade" id="updatePrice" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Thông tin giá vận chuyển</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className='service-1'>
                                                <div className='title-service'>
                                                    <span className='title-5-base'>Giao hàng hỏa tốc nội thành</span>
                                                    <i className="fas fa-exclamation-circle" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Nhập giá tiền theo đơn vị VNĐ tương ứng vào từng quảng đường và loại dịch vụ"></i>
                                                </div>
                                                <div className='content-service'>
                                                    {
                                                        this.state.suggestedPrice.SE0 &&
                                                        this.state.suggestedPrice.SE0.map((cost, index) =>
                                                            <div className={cost.kmStart === '30' ? 'lastKm borderLastKm' : ''}>
                                                                <span>{String(cost.kmStart).padStart(2, '0')}km  {cost.kmEnd ? `đến ${String(cost.kmEnd).padStart(2, '0')}km` : 'trở lên'}</span>
                                                                <input type='number' className='col-3' placeholder={cost.cost}
                                                                    value={this.state.newPrice.SE0[index]} onChange={(event) => this.handleChangeNewPriceSE0(event, index)} />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className='service-2'>
                                                <div className='title-service'>
                                                    <span className='title-5-base'>Giao hàng hỏa tốc ngoại thành</span>
                                                    <i className="fas fa-exclamation-circle" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Nhập giá tiền theo đơn vị VNĐ tương ứng vào từng quảng đường và loại dịch vụ"></i>
                                                </div>
                                                <div className='content-service'>
                                                    {
                                                        this.state.suggestedPrice.SE1 &&
                                                        this.state.suggestedPrice.SE1.map((cost, index) =>
                                                            <div className={cost.kmStart === '150' ? 'lastKm borderLastKm' : ''}>
                                                                <span>{String(cost.kmStart).padStart(2, '0')}km  {cost.kmEnd ? `đến ${String(cost.kmEnd).padStart(2, '0')}km` : 'trở lên'}</span>
                                                                <input type='number'
                                                                    className={`col-3 
                                                                    ${cost.kmStart === '90'
                                                                            ? 'Km90Km100'
                                                                            : cost.kmStart === '100'
                                                                                ? 'Km100Km150'
                                                                                : cost.kmStart === '150' ? 'Km150' : ''}`} placeholder={cost.cost}
                                                                    value={this.state.newPrice.SE1[index]} onChange={(event) => this.handleChangeNewPriceSE1(event, index)} />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className='service-3'>
                                                <div className='title-service'>
                                                    <span className='title-5-base'>Giao hàng tiêu chuẩn ngoại thành</span>
                                                    <i className="fas fa-exclamation-circle" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Nhập giá tiền theo đơn vị VNĐ tương ứng vào từng quảng đường và loại dịch vụ"></i>
                                                </div>
                                                <div className='content-service'>
                                                    {
                                                        this.state.suggestedPrice.SE2 &&
                                                        this.state.suggestedPrice.SE2.map((cost, index) =>
                                                            <div className={cost.kmStart === '150' ? 'lastKm borderLastKm' : ''}>
                                                                <span>{String(cost.kmStart).padStart(2, '0')}km  {cost.kmEnd ? `đến ${String(cost.kmEnd).padStart(2, '0')}km` : 'trở lên'}</span>
                                                                <input type='number'
                                                                    className={`col-3 
                                                                    ${cost.kmStart === '90'
                                                                            ? 'Km90Km100'
                                                                            : cost.kmStart === '100'
                                                                                ? 'Km100Km150'
                                                                                : cost.kmStart === '150' ? 'Km150' : ''}`} placeholder={cost.cost}
                                                                    value={this.state.newPrice.SE2[index]} onChange={(event) => this.handleChangeNewPriceSE2(event, index)} />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                                            <button type="button" className="btn btn-primary updatePrice" onClick={this.HandleUpdateCurrentCostAndNewCost}>Cập Nhật</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* toàn bộ form thông tin */}
                        <div className='information-transporter'>

                            {/* cập nhật thông tin tài khoản */}
                            <div className='information-component'>
                                <p className='title-3-base'>THÔNG TIN TÀI KHOẢN</p>
                                <form>

                                    <div className='info-form-component'>
                                        <div className='show_picture'>
                                            {!this.state.transInfo.showImg && this.state.transInfo.image
                                                ? <img src={process.env.REACT_APP_BACKEND_URL + this.state.transInfo.image} alt='type of vehicle' />
                                                : this.state.transInfo.showImg && this.state.transInfo.image
                                                    ? <img src={this.state.transInfo.showImg} alt='type of vehicle' />
                                                    : <span>Mời chọn ảnh</span>}
                                        </div>
                                        <label htmlFor="formFileImg" className="form-label">Logo: </label>
                                        <input name="profile_pic" className="form-control mb-3" type="file" id="formFileImg" accept='image/*'
                                            // ref={image} 
                                            onChange={this.changeImage} />
                                        <label htmlFor="transporterName" className="form-label">Tên doanh nghiệp</label>
                                        <input type="text" id="transporterName" className="form-control mb-3" value={transporterName} onChange={this.onChangeTransporterName} />


                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-control mb-3" value={email} onChange={this.onChangeEmail} />


                                        <label htmlFor="phone" className="form-label">Số diện thoại</label>
                                        <input type="tel" id="phone" className="form-control mb-3" readOnly value={phone} />

                                        <label htmlFor="description" className="form-label">Mô tả</label>
                                        <input type="text" id="description" className="form-control mb-3" value={description} onChange={this.onChangeDescription} />

                                        <label htmlFor="founding-date" className="form-label">Ngày thành lập</label>
                                        <input type="date" id="founding-date" className="form-control mb-3" value={this.state.inputDate} onChange={this.onChangeFoundingDate} />

                                        <div className='address'>
                                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                                            <input type="text" id="address" className="form-control mb-3" readOnly value={address} />
                                            <button className='updateLocation' type='button' data-bs-toggle="modal" data-bs-target='#updateLocation'>Chọn vị trí</button>
                                        </div>

                                        {/* Chọn vị trí google map */}
                                        <div className="modal fade" id="updateLocation" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-body">
                                                        <SimpleMap getAddres={this.getAddress} />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={this.btnCancel}>Thoát</button>
                                                        <button type="button" className="btn btn-primary updateLocation" onClick={this.updateLocation}>Lưu địa chỉ</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='container-select row'>
                                        {/* cập nhật phạm vi vận chuyển */}
                                        {/* <div className='scope-component col-md-6'>
                                            <p className='title-3-base'>PHẠM VI VẬN CHUYỂN</p>
                                            <div className="scope-select">

                                                <p> Chọn phạm vi vận chuyển có thể lấy hàng và giao hàng: </p>

                                                <input type="radio" id="scope1" name="scope" onChange={(event) => this.onChangeChooseScope(event.target.value)}
                                                    checked={this.state.scopeInput === 'S0'} value="S0" ref={this.scopeRef.S0} />
                                                <label htmlFor="scope1">Nội Thành</label><br />
                                                <input type="radio" id="scope2" name="scope" onChange={(event) => this.onChangeChooseScope(event.target.value)}
                                                    checked={this.state.scopeInput === 'S1'} value="S1" ref={this.scopeRef.S1} />
                                                <label htmlFor="scope2">Toàn Quốc</label><br />
                                                <input type="radio" id="scope3" name="scope" onChange={(event) => this.onChangeChooseScope(event.target.value)}
                                                    checked={this.state.scopeInput === 'S'} value="S" ref={this.scopeRef.S} />
                                                <label htmlFor="scope3">Vùng Miền</label><br />

                                                <div className='domain'>
                                                    <input type="checkbox" id="S2" name="S2" disabled={!this.state.checkedDomain}
                                                        onClick={this.onChangeChooseDomain} value="S2" ref={this.scopeRef.S2} />
                                                    <label htmlFor="S2">Miền Nam</label><br />
                                                    <input type="checkbox" id="S3" name="S3" disabled={!this.state.checkedDomain}
                                                        onClick={this.onChangeChooseDomain} value="S3" ref={this.scopeRef.S3} />
                                                    <label htmlFor="S3">Miền Trung</label><br />
                                                    <input type="checkbox" id="S4" name="S4" disabled={!this.state.checkedDomain}
                                                        onClick={this.onChangeChooseDomain} value="S4" ref={this.scopeRef.S4} />
                                                    <label htmlFor="S4">Miền Bắc</label><br />
                                                </div>

                                            </div>

                                        </div> */}

                                        {/* cập nhật dịch vụ cung cấp */}
                                        <div className='service-component col-md-6'>
                                            <p className='title-3-base'>DỊCH VỤ CUNG CẤP</p>

                                            <div className='service-select'>
                                                <p className=''>Chọn loại dịch vụ có thể cung cấp: </p>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" htmlFor="SE0">Vận chuyển hỏa tốc nội thành</label>
                                                    <input className="form-check-input" type="checkbox" id="SE0" value={'SE0'}
                                                        onClick={this.onChangeChooseService} ref={this.serviceRef.SE0} />
                                                </div>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" htmlFor="SE1">Vận chuyển hỏa tốc ngoại thành</label>
                                                    <input className="form-check-input" type="checkbox" id="SE1" value={'SE1'}
                                                        onClick={this.onChangeChooseService} ref={this.serviceRef.SE1} />
                                                </div>

                                                <div className="form-check form-switch">
                                                    <label className="form-check-label" htmlFor="SE2">Vận chuyển tiêu chuẩn ngoại thành</label>
                                                    <input className="form-check-input" type="checkbox" id="SE2" value={'SE2'}
                                                        onClick={this.onChangeChooseService} ref={this.serviceRef.SE2} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='button-div'>
                                        <button type="button" className="btn btn-secondary cancelUpdateInfo">Xóa thay đổi</button>
                                        <button type="button" className="btn btn-primary updateInfo" onClick={this.handleSaveChangesInfoTrans}>Lưu thay đổi</button>
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
        showNav: state.app.showNav,
        userInfo: state.user.userInfo,
        services: state.user.services,
        // scope: state.user.scope,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        getServiceOfTransporterAPI: (idTrans) => dispatch(actions.GetServiceOfTransporter(idTrans)),
        // getScopeOfTransporterAPI: (idTrans) => dispatch(actions.GetScopeOfTransporter(idTrans)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreManager);
