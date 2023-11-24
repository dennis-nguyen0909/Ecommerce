const jwt = require('jsonwebtoken')
require('dotenv').config();
const authMiddleware = (req, res, next) => {
    console.log("token", req.headers.token);
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: "The authentication",
                status: 'Error'
            })
        }
        if (user?.isAdmin) {
            // nếu có quyền là admin cho đi tiếp
            next()
        } else {
            return res.status(404).json({
                message: "Không có quyền admin",
                status: 'Error'
            })
        }
        console.log("user", user);

    })
}
const authUserMiddleware = (req, res, next) => {
    console.log("token", req.headers.token);
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: "The authentication",
                status: 'Error'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            // nếu có quyền là admin cho đi tiếp
            next()
        } else {
            return res.status(404).json({
                message: "Không có quyền admin",
                status: 'Error'
            })
        }
        console.log("user", user);

    })
}

module.exports = { authMiddleware, authUserMiddleware }