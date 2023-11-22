import React from 'react'
import { Button, Col, Image, InputNumber, Row } from 'antd'
import slider4 from '../../assets/images/slider4.jpg'
import slider1 from '../../assets/images/slider1.jpg'
import { WrapperAddressProduct, WrapperButtonQuality, WrapperImageColSmall, WrapperImageSmall, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityBtn, WrapperQualityProduct, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { ButtonComponent } from '../ButtonComponent/ButtonComponent'
export const ProductDetailsComponent = () => {
    return (
        <Row style={{ padding: '16px', backgroundColor: "#fff", borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #solid', paddingRight: '8px' }}>
                <Image src={slider4} alt='image-product' preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={slider1} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={slider1} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={slider1} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={slider1} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={slider1} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                    <WrapperImageColSmall span={4}>
                        <WrapperImageSmall src={slider1} alt='image-product' preview={false} />
                    </WrapperImageColSmall>
                </Row>
            </Col >
            <Col span={14} style={{ padding: ' 0 40px' }}>
                <WrapperStyleNameProduct>Nike 550 SB</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
                    <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
                    <WrapperStyleTextSell>Đã bán | 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>550.000</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến</span>
                    <span className='address'>Q.1,P.BẾN NGHÉ , TPHCM</span> -
                    <span className='change-address'> Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                    <div style={{ margin: "6px 0" }}>Số lượng</div>
                    <WrapperQualityProduct>
                        <WrapperButtonQuality>
                            <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
                        </WrapperButtonQuality>

                        <WrapperInputNumber defaultValue={1} size='small' />
                        <WrapperButtonQuality>
                            <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
                        </WrapperButtonQuality>

                    </WrapperQualityProduct>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ButtonComponent
                        bordered={false}
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
                        bordered={false}
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
