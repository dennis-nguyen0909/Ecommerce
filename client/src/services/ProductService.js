import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get('http://localhost:3000/api/product/get-all-product2');
    return res.data;
}

export const createProduct = async (data) => {
    const res = await axios.post('http://localhost:3000/api/product/create', data);
    return res.data;
}