import React, { Fragment } from 'react'
import { NavbarComponent } from '../../component/NavbarComponent/NavbarComponent'
import { CardComponent } from '../../component/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProduct } from './style'
export const TypeProductPage = () => {
    const onChange = () => {

    }
    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                <WrapperNavbar span={4}>
                    <NavbarComponent />
                </WrapperNavbar>
                <WrapperProduct span={20}>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />

                </WrapperProduct>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pagination showQuickJumper defaultCurrent={2} total={100} onChange={onChange} />
            </div>
        </div>
    )
}
