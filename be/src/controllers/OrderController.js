const OrderService = require("../services/OrderService")
const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, totalPrice, shippingPrice, fullName, address, city, phone } = req.body

        if (!paymentMethod || !itemsPrice || !totalPrice || !shippingPrice || !fullName || !address || !city || !phone) {
            return res.status(404).json({
                status: 'Error',
                message: "Vui lòng nhập đầy đủ"
            })
        }

        const response = await OrderService.createOrder(req.body);
        return res.status(200).json({
            status: 'Ok',
            data: response
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            status: 'error',
            message: error
        })
    }
}
const getAllOder = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(200).json({
                EC: 0,
                EM: 'ERR',
            })
        }
        const response = await OrderService.getAllOder(id);
        return res.status(200).json({
            EC: 1,
            EM: 'SUCCESS',
            response
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getDetailOrder = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(200).json({
                EC: 0,
                EM: 'ERR',
            })
        }
        const response = await OrderService.getDetailOrder(id);
        return res.status(200).json({
            EC: 1,
            EM: 'SUCCESS',
            response
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const cancelOrderProduct = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const response = await OrderService.cancelOrderProduct(id, data);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message: error
        })
    }
}
module.exports = {
    createOrder, getAllOder, getDetailOrder, cancelOrderProduct
}