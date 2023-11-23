const ProductService = require("../services/ProductService")
const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(404).json({
                status: 'Error',
                message: "Vui lòng nhập đầy đủ"
            })
        }
        const response = await ProductService.createProduct(req.body);
        console.log("res", response);
        return res.status(200).json({
            status: 'Ok',
            data: response
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const idProduct = req.params.id;
        const data = req.body
        if (!idProduct) {
            return res.status(404).json({
                status: "Error",
                message: "Vui lòng chọn id"
            })
        }
        const response = await ProductService.updateProduct(idProduct, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            status: 'Lỗi phía controller',
            message: error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const idProduct = req.params.id;
        if (!idProduct) {
            return res.status(404).json({
                status: 'error',
                message: "Vui lòng chọn id"
            })
        }
        const response = await ProductService.deleteProduct(idProduct);
        return res.status(200).json({
            message: "Ok",
            data: response
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: "Lỗi từ controller"
        })
    }
}
const getDetailProduct = async (req, res) => {
    try {
        const idUser = req.params.id;
        if (!idUser) {
            return res.status(404).json({
                status: "Error",
                message: "Vui lòng nhập id Product"
            })
        }
        const response = await ProductService.getDetailProduct(idUser);
        return res.status(200).json({
            status: "Ok",
            data: response
        })
    } catch (error) {
        return res.status(404).json({
            status: "Error",
            message: "Lỗi phía controller"
        })
    }
}
const getAllProduct = async (req, res) => {
    try {
        // http://localhost:8080/api/product/get-all-product?page=1&limit=2&sort=asc
        // lấy từ query
        const { page, limit, sort, filter } = req.query;
        const response = await ProductService.getAllProduct(Number(page) || 0, Number(limit) || 8, sort, filter);
        console.log(response)
        return res.status(200).json({
            status: "Ok",
            message: "Success",
            data: response
        })
    } catch (error) {
        return res.status(404).json({
            status: "Error",
            message: "Lỗi phía controllers"
        })
    }
}
module.exports = {
    createProduct, updateProduct, deleteProduct, getAllProduct, getDetailProduct
}