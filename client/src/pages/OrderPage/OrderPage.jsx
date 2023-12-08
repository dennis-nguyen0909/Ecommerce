import { Checkbox, Col, Input, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WrapperContainerProfile, WrapperDivContainer } from '../ProfileUserPage/style'
import { ButtonComponent } from '../../component/ButtonComponent/ButtonComponent'
import LoadingComponent from '../../component/LoadingComponent/LoadingComponent'
import { InputForm, WrapperDivStyle } from './style'
import { Select, Tree } from 'antd';
import vn from '../../vn.json'
import axios from 'axios'
import { notifyManager } from '@tanstack/react-query'

import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons'
import { WrapperButtonQuality, WrapperQualityProduct } from '../../component/ProductDetailsComponent/style'
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct } from '../../redux/slides/orderSlide'
import Item from 'antd/es/list/Item'

const { TreeNode } = Tree;
const { Option } = Select;
export const OrderPage = () => {
    const [cityData, setCityData] = useState([])
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistricts, setSelectedDistricts] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedCheck, setSelectedCheck] = useState([])
    const order = useSelector((state) => state.order)
    const dispatch = useDispatch();
    const fetch = async () => {
        const res = await axios.get(`https://provinces.open-api.vn/api/?depth=3`);
        setCityData(res.data)
    }
    console.log('order111', order)

    useEffect(() => {
        fetch();
    }, [])

    const user = useSelector((state) => state.user)
    const handleCityChange = (value) => {
        const selectedCityData = cityData.find((city) => city.code === value);
        setSelectedCity(selectedCityData);
        setDistricts(selectedCityData ? selectedCityData.districts : []);
    };
    console.log('user', user)
    const handleHuyen = (value) => {
        const selectedCityData = districts.find((city) => city.code === value);
        setSelectedDistricts(selectedCityData)

    }
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
    console.log('selectedCheck', selectedCheck)
    const handleDeleteAllOrder = () => {
        if (selectedCheck?.length > 1) {
            dispatch(removeAllOrderProduct({ selectedCheck }))
        }
    }
    return (
        <Row style={{ marginTop: '80px' }} >
            <Col span={12} style={{ width: 'fit-content' }}>
                <div  >
                    <WrapperDivStyle>Thông tin giao hàng</WrapperDivStyle>
                    <InputForm
                        style={{ with: '100px' }}
                        placeholder={'Họ Tên'}
                    />
                    <div style={{ display: 'flex' }}>
                        <InputForm
                            placeholder={'Email'}
                        />
                        <InputForm
                            placeholder={'Số điện thoại'}
                        />
                    </div>
                    <InputForm
                        placeholder={'Địa Chỉ'}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <div>
                            <h5>Chọn tỉnh/thành phố</h5>
                            <Select style={{ width: 200 }} onChange={handleCityChange}>
                                {cityData.map((city) => (
                                    <Option key={city.code} value={city.code}>
                                        {city.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <h5>Chọn quận/huyện</h5>
                            <Select style={{ width: 200 }} disabled={!selectedCity} value={selectedDistricts} onChange={handleHuyen}>
                                {districts.map((district) => (
                                    <Option key={district.code} value={district.code}>
                                        {district.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <h5>Chọn Phường</h5>
                            <Input style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} />
                        </div>
                    </div>
                    {/* <LoadingComponent > */}
                    <ButtonComponent
                        size={'40'}
                        styleButton={{
                            backgroundColor: "rgb(71,71,71)",
                            height: '48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: "12px",
                            margin: "20px 0"
                        }}
                        textButton={"Thanh Toán"}
                        styleTextButton={{ color: "#fff", fontSize: '15px', fontWeight: 700 }}
                    />
                    {/* </LoadingComponent> */}
                </div>
            </Col>
            <Col span={12} style={{ borderLeft: '1px solid #ccc', height: '500px' }}>
                <div style={{ marginLeft: '16px', borderBottom: '1px solid #ccc' }}>
                    <WrapperDivStyle>Giỏ Hàng</WrapperDivStyle>
                    <div>
                        <span>
                            <Checkbox onChange={handleCheckAllChecked} checked={selectedCheck?.length === order?.orderItems?.length} />
                            <span>Tất cả {order?.orderItems?.length} sản phẩm </span>
                            <DeleteOutlined onClick={handleDeleteAllOrder} />
                        </span>

                    </div>
                    {order?.orderItems?.length ? order?.orderItems?.map((item) => {
                        return (
                            <div style={{ width: '500px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Checkbox onChange={onChangeCheckbox} value={item?.product} checked={selectedCheck.includes(item?.product)}></Checkbox>
                                <div>
                                    <img width={'130px'} height={'130px'} objectFit={'cover'} src={item.image} />
                                </div>
                                <div style={{ padding: '0 10px' }}>
                                    <h3>Tên sản phẩm :{item.name}</h3>
                                    <p>Size</p>

                                    <p>Số lượng : {item?.amount}</p>
                                    <WrapperQualityProduct>
                                        <WrapperButtonQuality>
                                            <MinusOutlined style={{ color: "#000", fontSize: "20px" }} onClick={() => handleChangeCount('decrease', item?.product)} />
                                        </WrapperButtonQuality>
                                        {/* <WrapperInputNumber defaultValue={1} size='small' value={numProduct} onChange={handleOnChangeNum} /> */}
                                        <input defaultValue={item?.amount} value={item?.amount} onChange={handleOnChangeNum} style={{ width: '30px', border: 'transparent', textAlign: 'center', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }} />
                                        <WrapperButtonQuality>
                                            <PlusOutlined style={{ color: "#000", fontSize: "20px" }} onClick={() => handleChangeCount('increase', item?.product)} />
                                        </WrapperButtonQuality>
                                    </WrapperQualityProduct>
                                    <p>Giá :{item.price.toLocaleString()}</p>
                                </div>
                                {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <div onClick={() => handleDeleteOrder(order?.orderItems?.product)}>Xóa</div>
                                </div> */}

                            </div>

                        )
                    }) : (
                        <>
                            <div style={{ width: '500px', height: '100px', display: 'flex', justifyContent: 'flex-start', borderTop: '1px solid #ccc', marginBottom: '10px' }}>
                                <p>Giỏ Hàng Rỗng</p>
                            </div>
                        </>
                    )}
                </div>

            </Col>
        </Row >
    )
}
