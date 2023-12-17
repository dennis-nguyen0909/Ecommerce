const Order = require('../models/OrderProductModel')
const Product = require('../models/ProductModel')
const bcrypt = require('bcrypt');
const createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        const { paymentMethod, itemsPrice, totalPrice, shippingPrice, fullName, address, city, phone, user, orderItems } = data
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
                console.log("sll", productData)
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
                    user: user
                })
                resolve({
                    EC: 1,
                    ES: 'SUCCESS',
                    EM: 'Mua thành công',
                    addOrder
                })
            }
        } catch (error) {
            reject(error)
        }

    })
}

const getDetailOrder = (id) => {
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
module.exports = {
    createOrder, getDetailOrder
}  