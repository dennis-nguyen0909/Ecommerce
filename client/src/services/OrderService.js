import axios from "axios";
import { axiosJWT } from "./UserService";

console.log('pro', process.env.API_BACKEND)
console.log('pro', process.env.REACT_APP_FB_ID)
export const createOrder = async (data, access_token) => {
    const res = await axios.post(`${process.env.REACT_APP_API}order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const getAllOrderbyIdUser = async (id, access_token) => {

    const res = await axiosJWT.get(`${process.env.REACT_APP_API}order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const getDetailOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API}order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const cancelOrderProduct = async (id, access_token, orderItems) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API}order/cancel-order/${id}`, { data: orderItems }, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}