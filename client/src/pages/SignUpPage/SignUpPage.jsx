import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import { InputForm } from '../../component/InputForm/InputForm'
import { ButtonComponent } from '../../component/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import logo from '../../assets/images/signup.jpeg'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'

export const SignUpPage = () => {
    const [isShowPassword, setShowPassword] = useState(false);
    const onChange = () => {

    }
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#ccc", height: '100vh' }}>
            <div style={{ width: "800px", height: "445px", borderRadius: "6px", background: "#fff", display: 'flex', }}>
                <WrapperContainerLeft>
                    <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h1>Đăng Ký</h1>
                    </div>
                    <InputForm label="Tài khoản" placeholder="abc@gmail.com" />
                    <div style={{ position: 'relative' }}>
                        <span style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px'
                        }}>
                            {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
                        </span>
                        <InputForm label="Mật khẩu" placeholder="*********" type={isShowPassword ? "text" : "password"} onChange={onChange} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px'
                        }}>
                            {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
                        </span>
                        <InputForm label="Nhập lại mật khẩu" placeholder="*********" type={isShowPassword ? "text" : "password"} onChange={onChange} />
                    </div>
                    <ButtonComponent
                        bordered={false}
                        size={'40'}
                        styleButton={{
                            backgroundColor: "rgb(240,213,219)",
                            height: '48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: "12px",
                            margin: "20px 0"
                        }}
                        textButton={"Đăng Ký"}
                        styleTextButton={{ color: "#fff", fontSize: '15px', fontWeight: 700 }}
                    >
                    </ButtonComponent>
                    <p>Bạn đã có tài khoản ?
                        <WrapperTextLight>Đăng nhập</WrapperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={logo} preview={false} alt='image-logo' height={'100%'} width={"100%"} />
                </WrapperContainerRight>
            </div >
        </div>
    )
}
