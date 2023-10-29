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
    orders: [], //tất cả đơn hàng,
    drivers: [], //tài xế
    vehicles: [], //phương tiện
    services: [], //dịch vụ mà nhà vận chuyển cung cấp
    scope: [], //phạm vi nhà vận chuyển cung cấp
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
                userInfo: null,
                OS0: null,
                TS0: null,
                TS1: null,
                TS2: null,
                TS3: null,
                TS4: null,
                OS2: null,
                orders: null,
                drivers: null,
                vehicles: null,
                services: null,
                scope: null,

            }

        case actionTypes.GET_ORDERS_BY_STATUS:
            return {
                ...state,
                OS0: action.dataOrders[0].data,
                TS0: action.dataOrders[1].data,
                TS1: action.dataOrders[2].data,
                TS2: action.dataOrders[3].data,
                TS3: action.dataOrders[4].data,
                TS4: action.dataOrders[5].data,
                OS2: action.dataOrders[6].data,
                orders: action.dataOrders[7].data,
            }
        case actionTypes.GET_VEHICLES_BY_IDTRANSPORTER:
            return {
                ...state,
                vehicles: action.vehicles
            }
        case actionTypes.GET_SERVICE_OF_IDTRANSPORTER:
            return {
                ...state,
                services: action.services
            }
        case actionTypes.GET_SCOPE_OF_IDTRANSPORTER:
            return {
                ...state,
                scope: action.scope
            }
        case actionTypes.GET_DRIVERS_BY_IDTRANSPORTER:
            return {
                ...state,
                drivers: action.drivers
            }

        default:
            return state;
    }
}

export default userReducer;