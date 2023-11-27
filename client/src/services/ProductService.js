import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get('http://localhost:3000/api/product/get-all-product2');
    return res.data;
}