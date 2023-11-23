const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT_LOCAL || 8888
const UserRouter = require('./routes/UserRouter')

// Bodyparser dat trước router
app.use(bodyParser.json());


UserRouter(app);

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connect database successfully!!")
    })
    .catch((err) => {
        console.log("Connect database error!!", err)
        console.log("MONGO!!", port)

    });
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})