import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, InputNumber, Rate, Row, message } from 'antd'
import { WrapperAddressProduct, WrapperButtonQuality, WrapperImageColSmall, WrapperImageSmall, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityBtn, WrapperQualityProduct, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { ButtonComponent } from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import orderSlide, { addOrderProduct } from '../../redux/slides/orderSlide'
import { covertPrice } from '../../untils'
export const ProductDetailsComponent = ({ idProduct }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [numProduct, setNumProduct] = useState(1);
    const [selectedSize, setSelectedSize] = useState('')
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
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
    console.log('1231', productDetail?.discount)
    console.log('size', selectedSize)
    console.log('so', numProduct)
    const handleOrderProduct = () => {
        if (!user?.id) {
            navigate('/login', { state: location?.pathname }) // khi chưa login bị đá sang /login và truyền path theo để khi login tự động vô trang cũ
        } else {
            if (productDetail?.countInStock <= 0 || numProduct > productDetail?.countInStock) {
                message.error("Sản phẩm này đã hết vui lòng chọn sản phẩm khác !")
            } else if (!selectedSize) {
                message.error("Vui lòng chọn size !")

            }
            else {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetail?.name,
                        amount: numProduct,
                        image: productDetail?.image,
                        price: productDetail?.price,
                        size: selectedSize,
                        discount: productDetail?.discount,
                        product: productDetail?._id,
                        countInStock: productDetail?.countInStock
                    }
                }))
            }
        }
    }
    const onChangeSize = (e) => {
        setSelectedSize(e);
    }
    // useEffect(() => {
    //     if (productDetail?.countInStock <= 0) {
    //         message.error("Sản phẩm này đã hết vui lòng chọn sản phẩm khác !")
    //     }
    // }, [productDetail?.countInStock])
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Rate allowHalf defaultValue={productDetail?.rating} />
                    <WrapperStyleTextSell>Đã bán {productDetail?.selled || 0}</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>{covertPrice(productDetail?.price)}</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span style={{ paddingRight: '20px' }}>Giao đến:</span>
                    <span className='address'>{user?.address + " " + user?.ward + " " + user?.districts + " " + user?.city}</span> -
                    <span className='change-address'> Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div>
                    <span>HÀNG CÒN SẴN: {productDetail?.countInStock}</span>
                </div>
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
                <div>
                    <Form.Item
                        label="Size"
                        name="size"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your size!',
                            },
                        ]}
                    >

                        <p>{productDetail?.size.map((item) => {
                            return (
                                <Button key={item} style={{
                                    padding: '0 10px', margin: '0 10px',
                                    // backgroundColor: selectedSize == item ? "red" : '#fff',
                                    border: selectedSize == item ? "2px solid black" : "1px solid #ccc"

                                }} onClick={() => onChangeSize(item)} >{item}</Button>
                            )
                        })}</p>
                    </Form.Item>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ButtonComponent
                        onClick={handleOrderProduct}
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
