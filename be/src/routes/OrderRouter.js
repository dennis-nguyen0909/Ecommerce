const express = require('express')
const router = express.Router();
const OrderController = require('../controllers/OrderController')
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware')
const OrderRouter = (app) => {
    router.post('/create', OrderController.createOrder);
    router.get('/get-order-details/:id', authUserMiddleware, OrderController.getDetailOrder);

    return app.use('/api/order', router);
}

module.exports = OrderRouter