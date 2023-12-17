import axios from "axios";



export const getClientId = async () => {
    const res = await axios.get('http://localhost:3000/api/payment/client-id/');
    return res.data;
}

