import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'
export const CardComponent = (props) => {
    const { countInStock, description, image, price, name, rating, type, discount, selled } = props;
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: "100px", height: "100px" }}

            bodyStyle={{ padding: "10px" }}
            cover={<img alt="example" src={image} />}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: "4px" }}>
                    <span>{rating}</span>
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
                </span>
                <span>Đã bán | 100+</span>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '10px' }}>
                    {price.toLocaleString()}
                </span>
                <WrapperDiscountText>{discount || -5} %</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}
