import axios from "../axios"

export const handleLoginAPI = (phone, password, keyRole) => {
    return axios.post('/api/login', { phone, password, keyRole });
}

export const getOrdersByStatusAPI = (keyOrderStatus, idTransporter) => {
    return axios.get(`/api/transporter-get-order-by-status?keyOrderStatus=${keyOrderStatus}&idTransporter=${idTransporter}`);

}

// export const getAllUsers = (userId) => {
//     return axios.get(`/api/v1/get-all-users?id=${userId}`);
// }

// export const addNewUserService = (data) => {
//     return axios.post('/api/v1/create-new-user', data);
// }

// export const deleteUserService = (userId) => {
//     return axios.delete('/api/v1/delete-user', { data: { id: userId } });
// }
