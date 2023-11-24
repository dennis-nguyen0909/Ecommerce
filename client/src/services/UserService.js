import axios from "axios";

export const signUp = async (data) => {
    const res = await axios.post('http://localhost:8080/api/user/sign-up', data);
    return res.data;
}
export const loginUser = async (data) => {
    const res = await axios.post('http://localhost:8080/api/user/login', data);
    return res.data;
}

export const getDetailUser = async (id, access_token) => {
    const res = await axios.get(`http://localhost:8080/api/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
