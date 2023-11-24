import axios from "axios";
export const axiosJWT = axios.create()
export const signUp = async (data) => {
    const res = await axios.post('http://localhost:3000/api/user/sign-up', data);
    return res.data;
}
export const loginUser = async (data) => {
    const res = await axios.post('http://localhost:3000/api/user/login', data);
    return res.data;
}

export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}

export const refreshToken = async (id, access_token) => {
    const res = await axios.post(`http://localhost:3000/api/user/refresh-token`, {
        withCredentials: true// tự động lấy cookie
    });
    return res.data;
}
