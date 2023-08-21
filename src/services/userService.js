import axios from "../axios"

export const handleLoginAPI = (email, password) => {
    return axios.post('/api/v1/login', { email, password });
}

export const getAllUsers = (userId) => {
    return axios.get(`/api/v1/get-all-users?id=${userId}`);
}

export const addNewUserService = (data) => {
    console.log("user Service: ", data);
    return axios.post('/api/v1/create-new-user', data);
}

export const deleteUserService = (userId) => {
    return axios.delete('/api/v1/delete-user', { data: { id: userId } });
}
