import React from 'react'
import { Row, Col } from 'antd'
import { WrapperHeader, WrapperText, WrapperTextSmall } from './style'
import Search from 'antd/es/input/Search'
import { DownOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { WrapperAccount } from './style'
import { ButtonInputSearch } from '../ButtonInputSearch/ButtonInputSearch'
export const Header = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperText>Thanh My Shop</WrapperText>
                </Col>
                <Col span={12}>
                    <ButtonInputSearch
                        placeholder="Tìm kiếm sản phẩm ...."
                        bordered={false}
                        textButton="Tìm kiếm"
                        size="large"

                    // onSearch={onSearch}
                    />
                </Col>
                <Col span={6}>
                    <WrapperAccount>
                        <UserOutlined style={{ fontSize: "30px" }} />
                        <div>
                            <WrapperTextSmall style={{ fontSize: "12px" }}>Đăng nhập / Đăng ký</WrapperTextSmall>
                            <div>
                                <WrapperTextSmall style={{ fontSize: "12px" }}>Tài khoản <DownOutlined /></WrapperTextSmall>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            <ShoppingCartOutlined style={{ fontSize: "30px" }} />
                            <WrapperTextSmall>Giỏ Hàng</WrapperTextSmall>
                        </div>
                    </WrapperAccount>
                </Col>
            </WrapperHeader>
        </div>
    )
}
