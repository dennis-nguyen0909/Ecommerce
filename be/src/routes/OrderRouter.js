const express = require('express')
const router = express.Router();
const OrderController = require('../controllers/OrderController')
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware')
const OrderRouter = (app) => {
    router.post('/create', OrderController.createOrder);
    router.get('/get-all-order/:id', authUserMiddleware, OrderController.getAllOder);
    router.get('/get-details-order/:id', OrderController.getDetailOrder);
    router.delete('/cancel-order/:id', OrderController.cancelOrderProduct);

    return app.use('/api/order', router);
}

module.exports = OrderRouter