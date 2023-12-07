import React, { useState } from 'react'
import { Button, Col, Image, InputNumber, Rate, Row } from 'antd'
import { WrapperAddressProduct, WrapperButtonQuality, WrapperImageColSmall, WrapperImageSmall, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityBtn, WrapperQualityProduct, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { ButtonComponent } from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
export const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1);
    const user = useSelector((state) => state.user)
    const fetchGetDetailProduct = async () => {
        const res = await ProductService.getDetailProduct(idProduct);
        return res.response;

    }
    const { data } = useQuery({ queryKey: ['product-detail'], queryFn: fetchGetDetailProduct })
    const productDetail = data?.data
    const handleOnChangeNum = (value) => {
        setNumProduct(Number(value))
    }
    const handleChangeCount = (action) => {
        if (action === 'increase') {
            setNumProduct(numProduct + 1)
        } else {
            setNumProduct(numProduct - 1)

        }
    }
    return (
        <Row style={{ padding: '16px', backgroundColor: "#fff", borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #solid', paddingRight: '8px' }}>
                <Image src={productDetail?.image} alt='image-product' preview={false} width={'100%'} height={'500px'} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={productDetail?.image} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={productDetail?.image} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={productDetail?.image} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={productDetail?.image} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={productDetail?.image} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={productDetail?.image} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                </Row>

            </Col >
            <Col span={14} style={{ padding: ' 0 40px' }}>
                <WrapperStyleNameProduct>{productDetail?.name}</WrapperStyleNameProduct>
                <div>
                    <Rate allowHalf defaultValue={productDetail?.rating} />
                    <WrapperStyleTextSell>Đã bán | 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>{productDetail?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span style={{ paddingRight: '20px' }}>Giao đến:</span>
                    <span className='address'>{user?.address}</span> -
                    <span className='change-address'> Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                    <div style={{ margin: "6px 0" }}>Số lượng</div>
                    <WrapperQualityProduct>
                        <WrapperButtonQuality>
                            <MinusOutlined style={{ color: "#000", fontSize: "20px" }} onClick={() => handleChangeCount('decrease')} />
                        </WrapperButtonQuality>
                        {/* <WrapperInputNumber defaultValue={1} size='small' value={numProduct} onChange={handleOnChangeNum} /> */}
                        <input defaultValue={1} value={numProduct} onChange={handleOnChangeNum} style={{ width: '30px', border: 'transparent', textAlign: 'center', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }} />
                        <WrapperButtonQuality>
                            <PlusOutlined style={{ color: "#000", fontSize: "20px" }} onClick={() => handleChangeCount('increase')} />
                        </WrapperButtonQuality>

                    </WrapperQualityProduct>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ButtonComponent

                        size={'40'}
                        styleButton={{
                            backgroundColor: "rgb(255,57,69)",
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: "12px"
                        }}
                        textButton={"Chọn Mua"}
                        styleTextButton={{ color: "#fff", fontSize: '15px', fontWeight: 700 }}
                    >
                    </ButtonComponent>
                    <ButtonComponent

                        size={'40'}
                        styleButton={{
                            backgroundColor: "transparent",
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13,92,182)',
                            borderRadius: "12px"
                        }}
                        textButton={"Mua trả sau"}
                        styleTextButton={{ color: "rgb(13,92,182)", fontSize: "15px" }}

                    >
                    </ButtonComponent>
                </div>


            </Col>
        </Row >
    )
}
