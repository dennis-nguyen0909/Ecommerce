
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
const sendEmailCreateOrder = async (email, orderItems, totalPrice) => {
    const covertPrice = totalPrice.toLocaleString().replaceAll('.', '.')
    console.log(process.env.MAIL_ACCOUNT)
    console.log(process.env.MAIL_PASSWORD)
    let transporter = nodemailer.createTransport({
        service: 'Gmail',//chọn service là Gmail nếu ko sẽ sai
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    let listItems = ''
    orderItems.forEach((item) => {
        listItems += `<div> 
            <div>Bạn đã đặt mua sản phẩm: <b>${item.name}<b/> </div>
            <div><img width={50} height={50} src=${item?.image} /> </div>
            <div>Số lượng : <b>${item.amount}<b/> </div>
            <div>Tiền cần thanh toán : <b>${covertPrice}VND<b/> </div>
        </div>`
    });
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: "duyxitrum000@gmail.com", // list of receivers
        subject: "Xác thực đặt hàng", // Subject line
        text: "Hello world?", // plain text body
        html: `<div>
                <b>Bạn đã đặt hàng thành công tại shop Sneaker Asia</b>${listItems}
            </div>`, // html body
    });
    console.log('info', info)
}
module.exports = { sendEmailCreateOrder }