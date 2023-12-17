import React, { useEffect, useState } from 'react'
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux'
import { useFetcher } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Modal } from 'antd'
import { WrapperDiv } from './style'
export const MyOrderPage = () => {
    const [stateMyOrder, setStateMyOder] = useState([])
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)

    const fetchDetailOrder = async () => {
        const res = await OrderService.getDetailsOrder(user?.id, user?.access_token);
        return res?.response?.data
    }
    console.log('s', user?.id)
    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchDetailOrder, enabled: user?.id && user?.access_token ? true : false },)
    const { isloading, data } = queryOrder

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOpenForm = () => {
        showModal()
    }
    return (
        <div>
            <div style={{ padding: '0 120px' }}>
                <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                    <h3>Đơn hàng đã mua</h3>
                </div>
                <div>
                    {data?.map((item) => item?.orderItems.map((it) => {
                        return (
                            <>
                                <WrapperDiv>
                                    <div>
                                        <img src={it?.image} width={'200px'} height={'200px'} style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div style={{

                                    }}>
                                        <p>Tên sản phẩm:{it?.name}</p>
                                        <p>Giá sản phẩm:{it?.price}</p>
                                        <p>Số lượng đã mua :{it?.amount}</p>
                                        <p>Size :{it?.size}</p>
                                    </div >
                                    <div style={{ marginRight: '50px' }}>
                                        <Button
                                            onClick={handleOpenForm}
                                            style={{ color: 'black' }}
                                        >Đánh giá</Button>
                                    </div>
                                </WrapperDiv >
                                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                </Modal>
                            </>
                        )
                    }))}

                </div>
            </div >
        </div >
    )
}
