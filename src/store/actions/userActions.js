import actionTypes from './actionTypes';
import {
    getOrdersByStatusAPI, GetVehicleByIdTransporterAPI, GetServiceOfTransporterAPI, GetScopeOfTransporterAPI,
    GetAllDriverOfTransporterFromApi
} from '../../services/userService';

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

// lấy tất cả đơn hàng theo trạng thái
export const getOrdersByStatus = (idTrans) => {
    return async (dispatch) => {
        try {
            const orderStatuses = ['OS0', 'TS0', 'TS1', 'TS2', 'TS3', 'TS4', 'OS2', 'All'];
            const promises = orderStatuses.map((status) => getOrdersByStatusAPI(status, idTrans)); //

            const results = await Promise.all(promises);

            // Kiểm tra xem tất cả các cuộc gọi API có thành công hay không
            const allSuccessful = results.every((result) => result !== null);

            if (allSuccessful) {
                dispatch(getOrdersByStatusSuccess(results));
            } else {
                console.log('Có lỗi khi gọi API');
            }
        } catch (e) {
            console.log('error', e);
        }
    };
};

export const getOrdersByStatusSuccess = (dataOrders) => ({
    type: actionTypes.GET_ORDERS_BY_STATUS,
    dataOrders: dataOrders,
})

//lấy phương tiện bằng id
export const GetVehicleByIdTransporter = (idTrans) => {
    return async (dispatch) => {
        try {
            const vehicles = await GetVehicleByIdTransporterAPI(idTrans)
            if (vehicles) {
                dispatch({
                    type: actionTypes.GET_VEHICLES_BY_IDTRANSPORTER,
                    vehicles: vehicles.data
                });
            } else {
                console.log('Có lỗi khi gọi API');
            }
        } catch (e) {
            console.log('error', e);
        }
    };
};

// lấy dịch vụ của Transporter cung cấp
export const GetServiceOfTransporter = (idTrans) => {
    return async (dispatch) => {
        try {
            const services = await GetServiceOfTransporterAPI(idTrans)
            if (services && services.errCode === 0) {
                let servicesOfTrans = [];
                services.data.map((service) =>
                    servicesOfTrans.push(service.keyService)
                )
                dispatch({
                    type: actionTypes.GET_SERVICE_OF_IDTRANSPORTER,
                    services: servicesOfTrans
                });
            } else {
                console.log('Có lỗi khi gọi API');
            }
        } catch (e) {
            console.log('error', e);
        }
    };
};

// lấy phạm vi của Transporter cung cấp
export const GetScopeOfTransporter = (idTrans) => {
    return async (dispatch) => {
        try {
            const scope = await GetScopeOfTransporterAPI(idTrans)
            if (scope) {
                let scopeOfTrans = [];
                scope.data.map((s) =>
                    scopeOfTrans.push(s.keyScope)
                )
                dispatch({
                    type: actionTypes.GET_SCOPE_OF_IDTRANSPORTER,
                    scope: scopeOfTrans
                });
            } else {
                console.log('Có lỗi khi gọi API');
            }
        } catch (e) {
            console.log('error', e);
        }
    };
};

// lấy tài xế theo idTransporter
export const GetAllDriverOfTransporter = (idTrans) => {
    return async (dispatch) => {
        try {
            const drivers = await GetAllDriverOfTransporterFromApi(idTrans)
            if (drivers && drivers.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_DRIVERS_BY_IDTRANSPORTER,
                    drivers: drivers.data
                });
            } else {
                console.log('Có lỗi khi gọi API');
            }
        } catch (e) {
            console.log('error', e);
        }
    };
};
