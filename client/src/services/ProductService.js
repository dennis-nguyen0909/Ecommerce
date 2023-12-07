import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`http://localhost:3000/api/product/get-all-product?filter=name&filter=${search}&limit=${limit}`);
    } else {
        res = await axios.get(`http://localhost:3000/api/product/get-all-product?limit=${limit}`);
    }
    return res.data;
}

export const createProduct = async (data) => {
    const res = await axios.post('http://localhost:3000/api/product/create', data);
    return res.data;
}
export const getDetailProduct = async (id, access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/product/details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}
export const updateProduct = async (id, data, access_token) => {
    const res = await axiosJWT.put(`http://localhost:3000/api/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`http://localhost:3000/api/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
export const deleteManyProduct = async (ids, access_token) => {
    const res = await axiosJWT.post(`http://localhost:3000/api/product/delete-many`, ids, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
export const getTypeProduct = async (type, page, limit) => {
    const res = await axios.get(`http://localhost:3000/api/product/get-all-product?filter=type&filter=${type}&limit=${limit}&page=${page}`);
    return res.data;
}


export const getAllTypeProduct = async () => {
    const res = await axios.get(`http://localhost:3000/api/product/get-all-type`);
    return res.data;
}