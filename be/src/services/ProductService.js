const Product = require('../models/ProductModel')
const bcrypt = require('bcrypt');
const createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = data
        try {
            const checkProductExist = await Product.findOne({
                name: name
            })
            if (checkProductExist !== null) {
                resolve({
                    status: 'Ok',
                    message: "Product Name is exist!!",
                })
            }
            const createNewProduct = await Product.create({
                name, image, type, price, countInStock, rating, description
            })
            if (createNewProduct) {
                resolve({
                    status: 'Ok',
                    message: "Create Product SuccessFully!!",
                    data: createNewProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkIdProduct = await Product.findOne({
                _id: id
            })
            if (checkIdProduct === null) {
                resolve({
                    status: "Error",
                    message: "Id không tồn tại!!"
                })
            }
            const updateNewProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            if (updateNewProduct) {
                resolve({
                    status: 'Ok',
                    message: "Update Product Success!!",
                    data: updateNewProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkIdProduct = await Product.findOne({
                _id: id
            })
            if (checkIdProduct === null) {
                resolve({
                    status: "Error",
                    message: "Sản phẩm không tồn tại"
                })
            }
            await Product.findByIdAndDelete(id);
            return resolve({
                status: "Ok",
                message: "Delete Product Successfully!!"
            })
        } catch (error) {
            reject(error)
        }
    })
}
const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: "Error",
                    message: "Sản phẩm không tồn tại"
                })
            }
            resolve({
                status: "Ok",
                message: "Sản phẩm đã tồn tại!!",
                data: product
            })
        } catch (error) {
            reject(error)
        }
    })
}
const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.find();
            resolve({
                status: 'Ok',
                message: "Get All Product Successfully!!",
                data: product
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createProduct, updateProduct, deleteProduct, getDetailProduct, getAllProduct
}  