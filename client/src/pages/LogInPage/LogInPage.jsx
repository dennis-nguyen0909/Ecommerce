import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import { InputForm } from '../../component/InputForm/InputForm'
import { ButtonComponent } from '../../component/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import logo from '../../assets/images/signup.jpeg'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useMutationHook } from '../../hooks/userMutationHook'
import * as UserService from '../../services/UserService'
import LoadingComponent from '../../component/LoadingComponent/LoadingComponent'

export const LogInPage = () => {
    const [isShowPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
    const mutation = useMutationHook(
        data => UserService.loginUser(data)
    )
    const { data, isPending } = mutation
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }
    const handleOnChangePassword = (value) => {
        setPassword(value);
    }
    const handleLogin = (e) => {
        mutation.mutate({
            email, password
        })
    }
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#ccc", height: '100vh' }}>
            <div style={{ width: "800px", height: "445px", borderRadius: "6px", background: "#fff", display: 'flex', }}>
                <WrapperContainerLeft >
                    <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h1>Đăng nhập</h1>
                    </div>
                    <div>
                        <InputForm placeholder="abc@gmail.com" label="Tài khoản" value={email} onChange={handleOnChangeEmail} />
                        <div style={{ position: 'relative' }}>
                            <span
                                onClick={() => setShowPassword(!isShowPassword)}
                                style={{
                                    zIndex: 10,
                                    position: 'absolute',
                                    top: '4px',
                                    right: '8px'
                                }}>
                                {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
                            </span>
                            <InputForm label="Mật khẩu" placeholder="*********" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnChangePassword} />
                        </div>
                        {data?.status === "Error" && <span style={{ color: "red" }}>{data?.message}</span>}
                        {data?.message.status === "Error" && <span style={{ color: "red" }}>{data?.message.message}</span>}
                        <LoadingComponent isLoading={isPending}>
                            <ButtonComponent
                                disabled={!email.length || !password.length}
                                onClick={handleLogin}
                                size={'40'}
                                styleButton={{
                                    backgroundColor: "rgb(240,213,219)",
                                    height: '48px',
                                    width: '100%',
                                    border: 'none',
                                    borderRadius: "12px",
                                    margin: "20px 0"
                                }}
                                textButton={"Đăng Nhập"}
                                styleTextButton={{ color: "#fff", fontSize: '15px', fontWeight: 700 }}
                            >
                            </ButtonComponent>
                        </LoadingComponent>
                    </div>
                    <div>
                        <p>
                            <WrapperTextLight>Quên Mật Khẩu</WrapperTextLight>
                        </p>
                        <p>Chưa có tài khoản ?
                            <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight>
                        </p>
                    </div>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={logo} preview={false} alt='image-logo' height={'100%'} width={"100%"} />
                </WrapperContainerRight>
            </div >
        </div>
    )
}
