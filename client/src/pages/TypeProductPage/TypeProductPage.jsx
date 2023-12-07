import React, { Fragment, useState } from 'react'
import { NavbarComponent } from '../../component/NavbarComponent/NavbarComponent'
import { CardComponent } from '../../component/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProduct } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
export const TypeProductPage = () => {
    const [stateProductType, setStateProductType] = useState([])
    const [type, setType] = useState([])
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 2,
        total: 1
    })
    const location = useLocation()

    const fetchProductType = async (type, page, limit) => {
        const res = await ProductService.getTypeProduct(type, page, limit)
        setStateProductType(res)
        setPanigate({
            ...panigate,
            total: res?.totalPage
        })
    }
    useEffect(() => {
        if (location.state) {
            fetchProductType(location.state, panigate.page, panigate.limit)
        }
    }, [location.state, panigate.page, panigate.limit])
    const fetchAllProductType = async () => {
        const res = await ProductService.getAllTypeProduct();
        setType(res?.data);
    }
    useEffect(() => {
        fetchAllProductType();
    }, [])
    const onChange = (current, pageSize) => {
        console.log('pageSize', pageSize)
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }
    return (
        <div style={{ padding: '0 40px', background: '#efefef' }}>
            <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                <WrapperNavbar span={4}>
                    <NavbarComponent types={type} />
                </WrapperNavbar>
                <WrapperProduct span={20}>
                    {stateProductType?.data?.map((product) => {
                        return (
                            <CardComponent
                                id={product._id}
                                key={product._id}
                                countInStock={product.countInStock}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                type={product.type}
                                discount={product.discount}
                                selled={product.selled}
                            />
                        )
                    })}

                </WrapperProduct>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pagination showQuickJumper pageSize={panigate?.limit} current={panigate?.page + 1} total={panigate?.total} onChange={onChange} />
            </div>
        </div>
    )
}
