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
const getAllProduct = (page, limit, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();
            if (filter) {
                // http://localhost:8080/api/product/get-all-product?page=1&limit=2&filter=name&filter=puma6
                const label = filter[0];
                const allProductFilter = await Product.find({ [label]: { $regex: filter[1] } })
                resolve({
                    status: 'Ok',
                    message: "Get All Product filter Successfully!!",
                    data: allProductFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                //http://localhost:8080/api/product/get-all-product?page=1&limit=2&sort=asc&sort=id
                // lấy ra cái sort thứ 2 -> sort theo id hoặc sort theo name hoặc theo giá => sort=name,sort=id,sort=price
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort);
                resolve({
                    status: 'Ok',
                    message: "Get All Product sort Successfully!!",
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(page * limit).sort({
                name: sort
            });
            resolve({
                status: 'Ok',
                message: "Get All Product Successfully!!",
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createProduct, updateProduct, deleteProduct, getDetailProduct, getAllProduct
}  