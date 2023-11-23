const express = require('express')
const UserController = require('../controllers/UserController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
const UserRouter = (app) => {
    router.post('/sign-up', UserController.createUser);
    router.post('/login', UserController.loginUser);
    router.put('/update-user/:id', UserController.updateUser);
    router.delete('/delete-user/:id', authMiddleware, UserController.deleteUser);
    router.get('/getAll', authMiddleware, UserController.getAllUser);
    router.get('/get-details/:id', authMiddleware, UserController.getDetailUser);
    return app.use('/api/user', router);
}

module.exports = UserRouter