import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    OS0: [], //chờ xác nhận
    TS0: [], //chờ lấy hàng
    TS1: [], //tài xế đã nhận hàng
    TS2: [], //đơn hàng đang ở kho
    TS3: [], //đơn hàng đang giao
    TS4: [], //đơn hàng thành công
    OS2: [], //đã hủy
    orders: [], //tất cả đơn hàng
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }

        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }

        case actionTypes.GET_ORDERS_BY_STATUS:
            return {
                ...state,
                OS0: action.dataOrders[0],
                TS0: action.dataOrders[1],
                TS1: action.dataOrders[2],
                TS2: action.dataOrders[3],
                TS3: action.dataOrders[4],
                TS4: action.dataOrders[5],
                OS2: action.dataOrders[6],
                orders: action.dataOrders[7],
            }

        default:
            return state;
    }
}

export default userReducer;