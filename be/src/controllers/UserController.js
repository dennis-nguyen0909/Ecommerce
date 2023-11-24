const UserService = require('../services/UserService')
const JWTservice = require('../services/JWTservice')
const createUser = async (req, res) => {
    try {
        //#1. Lấy ra dữ liệu & validation
        const { email, password, confirmPassword } = req.body;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = regexEmail.test(email);
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'Error',
                message: "The input is required"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: "The email is required ....@gmail.com"
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'Error',
                message: "Password don't match!"
            })
        }
        //#2 truyền qua service xử lý logic
        const data = await UserService.createUser(req.body);
        return res.status(200).json({
            message: data
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        //#1. Lấy ra dữ liệu & validation
        const { email, name, password, confirmPassword, phone } = req.body;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = regexEmail.test(email);
        if (!email || !password) {
            return res.status(200).json({
                status: 'Error',
                message: "The input is required"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: "The email is required ....@gmail.com"
            })
        }
        //#2 truyền qua service xử lý logic
        const data = await UserService.loginUser(req.body);
        const { refresh_token, ...newData } = data
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true, // giúp ta chỉ lấy đc cookie qua http thôi 
            secure: false, // bảo mật phía client
            samesite: 'strict'

        })
        return res.status(200).json({
            message: data
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const updateUser = async (req, res) => {
    try {

        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: "Error",
                message: "The userId is required"
            })
        }
        const response = await UserService.updateUser(userId, data);
        return res.status(200).json({
            message: "Ok",
            data: response
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
const deleteUser = async (req, res) => {
    try {

        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: "Error",
                message: "The userId is required"
            })
        }
        const response = await UserService.deleteUser(userId);
        return res.status(200).json({
            message: "Ok",
            data: response
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json({
            message: "Ok",
            data: response
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                message: "User is not defined!",
                status: "Error"
            })
        }
        const response = await UserService.getDetailUser(userId);
        return res.status(200).json({
            message: "Ok",
            response
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

const refreshToken = async (req, res) => {
    console.log("req.cookie.refresh_token", req.cookies.refresh_token);

    try {
        // const token = req.headers.token.split(' ')[1];
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: 'Lỗi',
                message: "Không có token"
            })
        }
        const response = await JWTservice.refreshTokenService(token);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            status: "err",
            message: error.message
        })
    }
}
module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailUser, refreshToken }