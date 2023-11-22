import React from 'react'
import { ProductDetailsComponent } from '../../component/ProductDetailsComponent/ProductDetailsComponent'
import { Flex } from 'antd'

export const ProductDetailPage = () => {
    return (
        <div style={{ padding: '0 120px', background: '#efefef', height: 'fit-content' }}>
            <h4>Trang chủ</h4>

            <ProductDetailsComponent />
        </div>
    )
}
