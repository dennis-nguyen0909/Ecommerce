import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'
export const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: "200px", height: "200px" }}
            style={{
                width: 200,
            }}
            bodyStyle={{ padding: "10px" }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <StyleNameProduct>Nike 650</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: "4px" }}>
                    <span>4.9</span>
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
                </span>
                <span>Đã bán | 100+</span>
            </WrapperReportText>
            <WrapperPriceText>
                500.000vnd
                <WrapperDiscountText>-5%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}
