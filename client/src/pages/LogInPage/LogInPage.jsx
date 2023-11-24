import React, { useEffect, useState } from 'react'
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
import * as message from '../../component/MessageComponent/MessageComponent'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'
export const LogInPage = () => {
    const [isShowPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
    const mutation = useMutationHook(
        data => UserService.loginUser(data)
    )
    const { data, isPending, isSuccess, isError } = mutation
    useEffect(() => {
        if (isSuccess) {
            message.success("Đăng nhập thành công !")
            navigate('/')
            const access_token = data.message?.access_token
            localStorage.setItem('access_token', JSON.stringify(access_token))
            if (access_token) {
                const decoded = jwtDecode(access_token) // jwt sẽ giải mã token và trả về payload gồm dữ liệu đã giải
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, access_token)
                }
            }
        } else if (isError) {
            message.error("Đăng nhập thất bại !")
        }
    }, [isSuccess, isError])
    const handleGetDetailUser = async (id, access_token) => {
        const res = await UserService.getDetailUser(id, access_token); // lấy thông tin user từ token và id
        dispatch(updateUser({ ...res?.response.data, access_token: access_token }))
        // truyền data mà res trả về vào redux
        // thì bên userSlide sẽ nhận được state và action trong đó action.payload là data user
    }
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
