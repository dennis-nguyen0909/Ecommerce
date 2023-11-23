const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JWTservice');
const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        //#1 Lấy data được truyền từ controller
        const { email, name, password, confirmPassword, phone } = data;
        try {
            //#2 Tạo mới user và kiểm tra nếu user da tồn tại trong db thì không đc tạo
            const checkUserExist = await User.findOne({
                email: email
            })
            if (checkUserExist !== null) {
                resolve({
                    status: 'Ok',
                    message: "User is exist!!",
                })
            }
            const hashPass = bcrypt.hashSync(password, 10);
            const createNewUser = await User.create({
                name,
                email,
                password: hashPass,
                // confirmPassword: hashPass,
                phone
            })
            if (createNewUser) {
                resolve({
                    status: 'Ok',
                    message: "Create User SuccessFully!!",
                    data: createNewUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        //#1 Lấy data được truyền từ controller
        const { email, name, password, confirmPassword, phone } = userLogin;
        try {
            //#2 Kiểm tra nếu user đã tồn tại trong db thì cho login
            const checkUserExist = await User.findOne({
                email: email
            })
            if (checkUserExist === null) {
                resolve({
                    status: 'Ok',
                    message: "User is not undefined !!",
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUserExist.password);
            //#3 giải pass đã bcrypt
            if (!comparePassword) {
                resolve({
                    status: 'Ok',
                    message: "Password or User is incorrect !!",
                })
            }
            //#4 tạo access_token và trả về
            const access_token = await generalAccessToken({
                id: checkUserExist.id,
                isAdmin: checkUserExist.isAdmin
            })
            //#5 tạo refresh_token để khi access_token hết hạn thì sẽ lấy refresh_token
            const refresh_token = await generalRefreshToken({
                id: checkUserExist.id,
                isAdmin: checkUserExist.isAdmin
            })
            resolve({
                status: 'Ok',
                message: "Login Success!!",
                access_token,
                refresh_token
            })

        } catch (error) {
            reject(error)
        }
    })
}
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const checkUser = await User.findById(id);
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    message: "User not defined!!",
                    status: "OK"
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'Ok',
                message: "Update Success!!",
                data: updateUser
            })
        } catch (error) {
            reject(error)
        }
    })
}
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const checkUser = await User.findById(id);
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    message: "User not defined!!",
                    status: "OK"
                })
            }
            await User.findByIdAndDelete(id);
            resolve({
                status: 'Ok',
                message: "Delete User Success!!",
            })
        } catch (error) {
            reject(error)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getUser = await User.find();
            resolve({
                status: 'Ok',
                message: "Get All User Success!!",
                data: getUser
            })
        } catch (error) {
            reject(error)
        }
    })
}
const getDetailUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: userId
            })
            if (user === null) {
                resolve({
                    message: "User not defined!!",
                    status: "OK"
                })
            }
            resolve({
                status: 'Ok',
                message: " Success!!",
                data: user
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailUser }  