import React, { useEffect, useState } from 'react'
import { Row, Col, Badge, Image, Popover } from 'antd'
import { WrapperHeader, WrapperImageLogo, WrapperLogout, WrapperText, WrapperTextSmall } from './style'
import Search from 'antd/es/input/Search'
import { DownOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { WrapperAccount } from './style'
import { ButtonInputSearch } from '../ButtonInputSearch/ButtonInputSearch'
import * as UserService from '../../services/UserService'
import logo from '../../assets/images/logo.jpeg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { resetUser } from '../../redux/slides/userSlide'
import LoadingComponent from '../LoadingComponent/LoadingComponent'

// import slider4 from '../../assets/images/slider4.jpg'
export const Header = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const handleNavigateLogin = () => {
        navigate('/login');
    }
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name || ''); // Cập nhật userName
        setUserAvatar(user?.avatar || '');
        setLoading(false)
    }, [user?.name, user?.avatar])
    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        // localStorage.removeItem("access_token")
        dispatch(resetUser())
        setLoading(false)
    }
    const handleNavigateProfile = () => {
        navigate('/profile-user')
    }
    const content = (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <WrapperLogout onClick={handleLogout}>Đăng xuất</WrapperLogout>
            <WrapperLogout onClick={handleNavigateProfile}>Thông tin người dùng</WrapperLogout>
        </div>
    );

    return (
        <div style={{ width: '100%' }}>
            <WrapperHeader>
                <Col onClick={() => navigate('/')} span={5} style={{ display: 'flex', alignItems: "center", cursor: 'pointer' }} >
                    <WrapperImageLogo width={'45px'} height={'45px'} src={logo} preview={false} />
                    <WrapperText>
                        SHOP md
                    </WrapperText>
                </Col>
                <Col span={13} >
                    <ButtonInputSearch
                        placeholder="Tìm kiếm sản phẩm ...."
                        textButton="Tìm kiếm"
                        size="large"

                    // onSearch={onSearch}
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <LoadingComponent isLoading={loading}>
                        <WrapperAccount >
                            {user?.avatar ? (
                                <img src={userAvatar} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />) :
                                <UserOutlined style={{ fontSize: "30px" }} />
                            }
                            {user?.access_token ?
                                <>
                                    <Popover content={content} trigger="click">
                                        <div>Xin chào</div>
                                        <div>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                                : <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextSmall style={{ fontSize: "12px" }}>Đăng nhập / Đăng ký</WrapperTextSmall>
                                    <div>
                                        <WrapperTextSmall style={{ fontSize: "12px" }}>Tài khoản <DownOutlined /></WrapperTextSmall>
                                    </div>
                                </div>
                            }
                            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                <Badge count={4} size='small'>
                                    <ShoppingCartOutlined style={{ fontSize: "30px" }} />
                                </Badge>
                                <WrapperTextSmall>Giỏ Hàng</WrapperTextSmall>
                            </div>
                        </WrapperAccount>
                    </LoadingComponent>
                </Col>
            </WrapperHeader>
        </div>
    )
}
