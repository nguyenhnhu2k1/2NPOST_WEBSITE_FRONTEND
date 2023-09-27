import actionTypes from './actionTypes';
import { getOrdersByStatusAPI } from '../../services/userService';

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
            console.log('idTrans ', idTrans)
            const orderStatuses = ['OS0', 'TS0', 'TS1', 'TS2', 'TS3', 'TS4', 'OS2', 'All'];
            const promises = orderStatuses.map((status) => getOrdersByStatusAPI(status, idTrans));

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
    dataOrders: dataOrders
})

