import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [
    ],
    shippingAddress: {

    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: ''
}
export const orderSlide = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem?.product)
            if (itemOrder) {
                //nếu sp đã có trong giỏ
                // cộng sl item hiện tại trong giỏ với sl mới
                itemOrder.amount += orderItem?.amount
            } else {
                // nếu chưa có thì thêm vào state initialState
                state.orderItems.push(orderItem)
            }
        },
        removeOrderProduct: (state, action) => {
            const idProduct = action.payload
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct) // tìm những thằng kh có trong idProduct
            state.orderItems = itemOrder
            console.log('remove', { idProduct }, itemOrder)
        },
        removeAllOrderProduct: (state, action) => {
            const { selectedCheck } = action.payload
            const itemOrders = state?.orderItems?.filter((item) => !selectedCheck.includes(item?.product)) // tìm những thằng kh có trong idProduct
            state.orderItems = itemOrders

        },
        increaseAmount: (state, action) => {
            const idProduct = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct) // tìm những thằng kh có trong idProduct
            itemOrder.amount++

        }
        , decreaseAmount: (state, action) => {
            const idProduct = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct) // tìm những thằng kh có trong idProduct
            itemOrder.amount--

        }
    }
})
export const { addOrderProduct, removeOrderProduct, decreaseAmount, increaseAmount, removeAllOrderProduct } = orderSlide.actions
export default orderSlide.reducer