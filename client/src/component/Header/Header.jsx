import React from 'react'
import { Row, Col, Badge, Image } from 'antd'
import { WrapperHeader, WrapperImageLogo, WrapperText, WrapperTextSmall } from './style'
import Search from 'antd/es/input/Search'
import { DownOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { WrapperAccount } from './style'
import { ButtonInputSearch } from '../ButtonInputSearch/ButtonInputSearch'

import logo from '../../assets/images/logo.jpeg'
// import slider4 from '../../assets/images/slider4.jpg'
export const Header = () => {
    return (
        <div style={{ width: '100%' }}>
            <WrapperHeader>
                <Col span={5} style={{ display: 'flex', alignItems: "center" }} >
                    <WrapperImageLogo width={'45px'} height={'45px'} src={logo} preview={false} />
                    <WrapperText>
                        Thanh My
                    </WrapperText>
                </Col>
                <Col span={13} >
                    <ButtonInputSearch
                        placeholder="Tìm kiếm sản phẩm ...."
                        bordered={false}
                        textButton="Tìm kiếm"
                        size="large"

                    // onSearch={onSearch}
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <WrapperAccount >
                        <UserOutlined style={{ fontSize: "30px" }} />
                        <div>
                            <WrapperTextSmall style={{ fontSize: "12px" }}>Đăng nhập / Đăng ký</WrapperTextSmall>
                            <div>
                                <WrapperTextSmall style={{ fontSize: "12px" }}>Tài khoản <DownOutlined /></WrapperTextSmall>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            <Badge count={4} size='small'>
                                <ShoppingCartOutlined style={{ fontSize: "30px" }} />
                            </Badge>
                            <WrapperTextSmall>Giỏ Hàng</WrapperTextSmall>
                        </div>
                    </WrapperAccount>
                </Col>
            </WrapperHeader>
        </div>
    )
}