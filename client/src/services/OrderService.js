import axios from "axios";
import { axiosJWT } from "./UserService";


export const createOrder = async (data, access_token) => {
    console.log(data)
    const res = await axios.post('http://localhost:3000/api/order/create', data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const getAllOrderbyIdUser = async (id, access_token) => {

    const res = await axiosJWT.get(`http://localhost:3000/api/order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const getDetailOrder = async (id, access_token) => {
    console.log('id', id)
    const res = await axiosJWT.get(`http://localhost:3000/api/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const cancelOrderProduct = async (id, access_token, orderItems) => {
    const res = await axiosJWT.delete(`http://localhost:3000/api/order/cancel-order/${id}`, { data: orderItems }, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}