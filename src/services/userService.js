import axios from "../axios"

// xử lý đăng nhập
export const handleLoginAPI = (phone, password, keyRole) => {
    return axios.post('/api/login', { phone, password, keyRole });
}

export const handleRegisterAPI = (transporter, user) => {
    return axios.post('/api/transporter-create-account', { transporter, user });
}

export const getTransporterByIdUser = (idUser) => {
    return axios.get(`/api/transporter-get-transporter-by-id-user?id=${idUser}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        }
    );
}

export const GetAllCodeByType = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}

export const GetWeightByVehicle = (keyVehicle) => {
    return axios.get(`/api/transporter-get-weight-by-vehicle?key=${keyVehicle}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}

export const handleCreateVehicleFromApi = (vehicleInput) => {
    return axios.post('/api/transporter-create-vehicle', { vehicleInput });
}

// lấy vehicle từ idTransporter
export const GetVehicleByIdTransporterAPI = (idTransporter) => {
    return axios.get(`/api/transporter-get-vehicle-by-idTransporter?idTransporter=${idTransporter}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}

//xóa vehicle bằng idVehicle
export const handleDeleteVehicleFromApi = (id) => {
    return axios.delete('/api/transporter-delete-vehicle', { data: { id } });
}

//chỉnh sửa phương tiện
export const handleEditVehicleFromApi = (vehicleEdit) => {
    return axios.put('/api/transporter-edit-vehicle', { vehicleEdit });
}

//xóa file ảnh trên server
export const handleDeleteFile = (name) => {
    return axios.delete(`/api/delete-file?name=${name}`);
}

// upload ảnh
export const uploadImage = (file) => {
    return axios.post('/api/upload-profile-pic', file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

// lấy dịch vụ và phạm vi của nhà vận chuyển
export const GetServiceOfTransporterAPI = (idTransporter) => {
    return axios.get(`/api/transporter-get-service-of-transporter?idTransporter=${idTransporter}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}
export const GetScopeOfTransporterAPI = (idTransporter) => {
    return axios.get(`/api/transporter-get-scope-of-transporter?idTransporter=${idTransporter}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}

// quản lý userLocation 
export const getAllUserLocationByIdUserAPI = (id) => {
    return axios.get(`/api/get-all-user-location?id=${id}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}
export const handleDeleteUserLocationByIdAPI = (id) => {
    return axios.delete('/api/delete-user-location', { data: { id } });
}
export const handleCreateUserLocationFromApi = (userLocationInput) => {
    return axios.post('/api/create-new-location', userLocationInput);
}

// chỉnh sửa thông tin nhà vận chuyển
export const handleEditTransporterFromApi = (transporterEdit) => {
    return axios.put('/api/transporter-edit-info-transporter', { transporterEdit });
}
export const handleCreateServiceOfTransporterFromApi = (serviceArr, idTransporter) => {
    return axios.post('/api/transporter-create-service-of-transporter', { serviceArr, idTransporter });
}
export const handleDeleteServiceOfTransporterFromApi = (serviceArr, idTransporter) => {
    return axios.delete('/api/transporter-delete-service-of-transporter', { data: { serviceArr, idTransporter } });
}
export const handleCreateScopeOfTransporterFromApi = (scopeArr, idTransporter) => {
    return axios.post('/api/transporter-create-scope-of-transporter', { scopeArr, idTransporter });
}
export const handleDeleteScopeOfTransporterFromApi = (scopeArr, idTransporter) => {
    return axios.delete('/api/transporter-delete-scope-of-transporter', { data: { scopeArr, idTransporter } });
}

// lấy giá
export const getAllCostCodeFromAPI = () => {
    return axios.get(`/api/get-cost-code`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}
export const getCostTransporterFromAPI = (keyService, idTransporter) => {
    return axios.get(`/api/get-cost-of-transporter-by-service?keyService=${keyService}&idTransporter=${idTransporter}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}
export const updateCostTransporterFromAPI = (keyService, costArr, idTransporter) => {
    return axios.put('/api/update-cost-of-transporter-by-service', { keyService, costArr, idTransporter });

}
export const handleCreateCostOfTransporterFromApi = (keyService, costArr, idTransporter) => {
    return axios.post('/api/create-cost-of-transporter', { keyService, costArr, idTransporter });
}

// quản lý tài xế
export const GetAllDriverOfTransporterFromApi = (idTransporter) => {
    return axios.get(`/api/get-all-driver-of-transporter?idTransporter=${idTransporter}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}
export const CreateNewUserFromApi = (inputUser) => {
    return axios.post('/api/create-new-user', inputUser);
}
export const handleDeleteDriverFromApi = (id) => {
    return axios.delete('/api/transporter-delete-driver', { data: { id } });
}
export const handleEditDriverFromApi = (driverEdit) => {
    return axios.put('/api/transporter-edit-driver', { driverEdit });
}

//đơn hàng
export const GetOrderDetailByIdOrder = (id) => { //lấy thông tin đơn hàng theo id
    return axios.get(`/api/get-all-order-info?id=${id}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}
export const getOrdersByStatusAPI = (keyOrderStatus, idTransporter) => { // lấy đơn hàng theo trạng thái
    return axios.get(`/api/transporter-get-order-by-status?keyOrderStatus=${keyOrderStatus}&idTransporter=${idTransporter}`,
        {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
}
export const handleUpdateOrderStatus = (id, keyOrderStatus) => {
    return axios.put('/api/update-key-order-status', { id, keyOrderStatus });
}

// Chọn tài xế và phương tiện cho đơn hàng
export const handleCreateDriverForOrder = (idOrder, idDriver) => {
    return axios.post('/api/create-driver-for-order', { idOrder, idDriver });
}
export const handleCreateVehicleForOrder = (idOrder, idVehicle) => {
    return axios.post('/api/create-vehicle-for-order', { idOrder, idVehicle });
}