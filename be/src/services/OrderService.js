const Order = require('../models/OrderProductModel')
const Product = require('../models/ProductModel')
const bcrypt = require('bcrypt');
const EmailService = require('../services/EmailService')
const createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        const { paymentMethod, itemsPrice, totalPrice, shippingPrice, fullName, address, city, phone, user, orderItems, isPaid, PaidAt, email } = data
        try {
            const promise = orderItems?.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product, // lấy ra id sản phẩm
                        countInStock: { $gte: order.amount } // số lượng có sẵn
                    },
                    {
                        $inc: {
                            countInStock: -order.amount, // số lượng đang có trừ đi sản phẩm mua
                            selled: +order.amount // cập nhật số lượng đã bán đi
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    return ({
                        EC: 1,
                        status: 'Ok',
                        message: "Add Order SuccessFully!!",

                    })

                } else {
                    return ({
                        EC: 0,
                        status: 'Error',
                        id: order.productData
                    })
                }
            })
            const result = await Promise.all(promise)
            const newData = result && result.filter((item) => item?.id)
            if (newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id);
                })
                resolve({
                    EC: 0,
                    ES: 'ERROR',
                    EM: 'Số lượng kho đã hết'
                })
            } else {
                const addOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city,
                        phone,
                    },
                    paymentMethod,
                    itemsPrice,
                    totalPrice,
                    shippingPrice,
                    user: user,
                    isPaid,
                    PaidAt
                })
                if (addOrder) {
                    await EmailService.sendEmailCreateOrder(email, orderItems, totalPrice);
                    resolve({
                        EC: 1,
                        ES: 'SUCCESS',
                        EM: 'Mua thành công',
                        addOrder
                    })
                }
            }
        } catch (error) {
            reject(error)
        }

    })
}

const getAllOder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            })
            resolve({
                EC: 1,
                EM: 'SUCCESS',
                data: order
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            resolve({
                EC: 1,
                EM: 'SUCCESS',
                data: order
            })
        } catch (err) {
            reject(err)
        }
    })
}
const cancelOrderProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promise = data?.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order?.product,
                        selled: { $gte: order?.amount }
                    }, {
                    $inc: {
                        countInStock: +order.amount,
                        selled: -order.amount
                    }
                }, {
                    new: true
                }
                )
                console.log('product', productData)
                if (productData) {
                    order = await Order.findByIdAndDelete(id);
                    if (order === null) {
                        resolve({
                            EC: 0,
                            EM: 'Order is not defined',

                        })
                    }
                } else {
                    return {
                        status: 'ok',
                        message: 'err',
                        id: order.product
                    }
                }

            })
            const result = await Promise.all(promise)
            const newData = result && result.filter((item) => item)
            if (newData.length) {
                resolve({
                    EC: 0,
                    ES: 'ERROR',
                    EM: 'Sản phẩm không tồn tại'
                })

            }
            resolve({
                EC: 1,
                ES: 'SUCCESS',
                data: order
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createOrder, getAllOder, getDetailOrder, cancelOrderProduct
}  