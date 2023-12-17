import { Checkbox, Col, Form, Input, Button, Row, message, Radio } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonComponent } from '../../component/ButtonComponent/ButtonComponent'
import LoadingComponent from '../../component/LoadingComponent/LoadingComponent'
import { InputForm, WrapperDivStyle } from './style'

import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder, totalAllProduct } from '../../redux/slides/orderSlide'
import { covertPrice } from '../../untils'
import * as OrderService from '../../services/OrderService'
import { useMutationHook } from '../../hooks/userMutationHook'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'


export const PaymentPage = () => {
    const navigate = useNavigate()
    const [formModal] = Form.useForm();
    const [selectedCheck, setSelectedCheck] = useState([])
    const [delivery, setDelivery] = useState('')
    const [payment, setPayment] = useState('')
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order)
    const [loading, isLoadingAdd] = useState(false)
    const handleChangeCount = (value, id) => {
        if (value === 'increase') {
            dispatch(increaseAmount(id))
        } else {
            dispatch(decreaseAmount(id))
        }
    }
    const handleOnChangeNum = () => {

    }
    const handleDeleteOrder = (id) => {
        dispatch(removeOrderProduct(id))
    }
    const handleCheckAllChecked = (e) => {
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product)
            })
            setSelectedCheck(newListChecked)
        } else {
            setSelectedCheck([])
        }
    }
    const onChangeCheckbox = (e) => {
        if (selectedCheck.includes(e.target.value)) {
            const newListCheck = selectedCheck.filter((item) => item !== e.target.value)
            setSelectedCheck(newListCheck)
        } else {
            setSelectedCheck([...selectedCheck, e.target.value])
        }
    }
    const handleDeleteAllOrder = () => {
        if (selectedCheck?.length >= 1) {
            dispatch(removeAllOrderProduct({ selectedCheck }))
        }
    }
    const handleTinhtONG = () => {
        if (selectedCheck.length >= 1) {
            dispatch(totalAllProduct({ selectedCheck }))
        }
    }
    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result;
    }, [order])
    const priceDiscount = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.discount * cur.amount))
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])
    const deliveryPrice = useMemo(() => {
        if (priceMemo > 200000) {
            return 10000
        } else if (priceMemo === 0) {
            return 0
        } else {
            return 20000
        }
    }, [priceMemo])
    const totalPriceAll = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscount) + Number(deliveryPrice)
    }, [priceMemo, priceDiscount, deliveryPrice])

    const handlePayment = async (e) => {
        // if (e.target.value === null || e.target.value === undefined) {
        //     message.error('Vui lòng chọn phương thức thanh toán!');
        // } else {
        //     // Xử lý logic khi người dùng chọn một tùy chọn
        //     setPayment(e.target.value);
        // }

        setPayment(e.target.value);

    }
    const handleDelivery = (e) => {
        // if (e.target.value === null || e.target.value === undefined) {
        //     message.error('Vui lòng chọn phương thức thanh toán!');
        // } else {
        //     // Xử lý logic khi người dùng chọn một tùy chọn
        //     setDelivery(e.target.value)
        // }
        setDelivery(e.target.value)

    }
    const mutationAddOrder = useMutationHook(
        async (data) => {
            const { id, token, ...rest } = data
            const res = await OrderService.createOrder({ ...rest }, token);
            return res;
        },
    )
    const addOrder = async (data) => {

        const { id, token, ...rest } = data
        const res = await OrderService.createOrder({ ...rest }, token);
        return res.data;

    }

    const handleAddOrder = async () => {
        if (!delivery) {
            message.error('Vui lòng chọn phương thức thanh toán!');
        } else if (!payment) {
            message.error('Vui lòng chọn phương vận chuyển !');
        } else if (!user?.name || !user?.address || !user?.phone || !user?.city) {
            message.error("Vui lòng điền đẩy đủ thông tin giao hàng")
        }
        else if (user?.name || user?.address || user?.phone || user?.city) {
            isLoadingAdd(true)
            const result = await addOrder({
                token: user?.access_token,
                orderItems: order?.orderItemsSelected,
                fullName: user?.name, address: user?.address + " " + user?.ward + " " + user?.districts, phone: user?.phone, city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: deliveryPrice,
                totalPrice: totalPriceAll,
                user: user?.id
            })
            if (+result?.EC === 1) {

                message.success("Đặt Hàng Thành Công !")
                navigate('/order-success', {
                    state: {
                        delivery,
                        payment,
                        orders: order?.orderItemsSelected,
                    }
                })
            } else {
                message.error("Đặt Hàng Thất Bại !")

            }
            isLoadingAdd(false)
        }

    }


    console.log('loading', isLoadingAdd)
    return (
        <Row style={{ marginTop: '80px' }} >



            <Col span={12} style={{ width: 'fit-content' }}>
                <Form
                    form={formModal}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <WrapperDivStyle>Thông tin giao hàng</WrapperDivStyle>

                    </div>
                    <InputForm
                        style={{ with: '100px' }}
                        placeholder={'Họ Tên'}
                        name='name'
                        value={user?.name && user?.name}
                    />
                    <div style={{ display: 'flex' }}>
                        <InputForm
                            placeholder={'Email'}
                            name='email'
                            value={user?.email && user?.email}

                        />
                        <InputForm
                            placeholder={'Số điện thoại'}
                            name="phone"
                            value={user?.phone && user?.phone}

                        />
                    </div>

                    <InputForm
                        placeholder={'Địa Chỉ'}
                        name="address"
                        // value={allAddress ? allAddress : user?.address}
                        value={user?.address + " " + user?.ward + " " + user?.districts + " " + user?.city}

                    />

                    {/* <LoadingComponent > */}
                    <div style={{ margin: '20px 20px', border: '1px solid #ccc', padding: '20px 40px', }}>
                        <div>Tạm tính :{covertPrice(priceMemo)}</div>
                        <div>Giảm giá : {covertPrice(priceDiscount)}</div>
                        <div>Phí giao hàng :{covertPrice(deliveryPrice)}</div>
                        <div>Tổng tiền :{covertPrice(totalPriceAll)}</div>
                    </div>
                    <LoadingComponent isLoading={loading} delay={2000} >
                        <ButtonComponent
                            onClick={handleAddOrder}
                            size={'40'}
                            styleButton={{
                                backgroundColor: "rgb(71,71,71)",
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: "12px",
                                margin: "20px 0"
                            }}
                            textButton={"Đặt Hàng"}
                            styleTextButton={{ color: "#fff", fontSize: '15px', fontWeight: 700 }}
                        />
                    </LoadingComponent>
                    {/* </LoadingComponent> */}
                </Form>
            </Col>
            <Col span={12} style={{ borderLeft: '1px solid #ccc', height: '500px' }}>
                <div>
                    <h1>Chọn phương thức giao hàng</h1>
                    <Radio.Group onChange={handleDelivery} value={delivery}>
                        <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                        <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                    </Radio.Group>
                </div>
                <div>
                    <h1>Chọn phương thức thanh toán</h1>
                    <Radio.Group onChange={handlePayment} value={payment}>
                        <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                        <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                    </Radio.Group>
                </div>

            </Col>

        </Row >
    )
}
