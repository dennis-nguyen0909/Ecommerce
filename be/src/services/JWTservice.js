const jwt = require('jsonwebtoken')
require("dotenv").config();
const generalAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '20s' })
    return accessToken;
}
const generalRefreshToken = async (payload) => {
    const refreshToken = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refreshToken;
}
const refreshTokenService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'Error',
                        message: "Không có quyền truy cập"
                    })
                }
                const { payload } = user
                // Cấp lại access token mới
                const access_token = await generalAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                })
                resolve({
                    status: 'Ok',
                    message: " Success!!",
                    data: user
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { generalAccessToken, generalRefreshToken, refreshTokenService }