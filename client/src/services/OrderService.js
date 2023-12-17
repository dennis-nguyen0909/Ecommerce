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

export const getDetailsOrder = async (id, access_token) => {
    console.log('id', id)
    const res = await axiosJWT.get(`http://localhost:3000/api/order/get-order-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}