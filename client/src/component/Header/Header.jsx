import React, { useEffect, useState } from 'react'
import { Row, Col, Badge, Image, Popover } from 'antd'
import { WrapperHeader, WrapperIcon, WrapperImageLogo, WrapperLogout, WrapperText, WrapperTextSmall } from './style'
import Search from 'antd/es/input/Search'
import { DownOutlined, UserOutlined, ShoppingCartOutlined, DribbbleOutlined, SearchOutlined } from '@ant-design/icons'
import { WrapperAccount } from './style'
import { ButtonInputSearch } from '../ButtonInputSearch/ButtonInputSearch'
import * as UserService from '../../services/UserService'
import logo from '../../assets/images/logo.jpeg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { resetUser, updateUser } from '../../redux/slides/userSlide'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import logoVn from '../../assets/images/icon-vn.jpg'
import { Button, Drawer, Radio, Space } from 'antd';
import { DrawerComponent } from '../DrawerComponent/DrawerComponent'
// import slider4 from '../../assets/images/slider4.jpg'
export const Header = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const [openSearch, setOpenSearch] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [placement, setPlacement] = useState('left');
    const showDrawerSearch = () => {
        setOpenSearch(true);
    };
    const onCloseSearch = () => {
        setOpenSearch(false);
    };
    const onChangeSearch = (e) => {
        setPlacement(e.target.value);
    };
    const showDrawerCart = () => {
        setOpenCart(true);
    };
    const onCloseCart = () => {
        setOpenCart(false);
    };
    const onChangeCart = (e) => {
        setPlacement(e.target.value);
    };
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
        localStorage.removeItem("access_token")
        navigate('/')
        dispatch(resetUser())
        setLoading(false)
    }
    const handleNavigateProfile = () => {
        navigate('/profile-user')
    }
    const handleNavigateAdmin = () => {
        navigate('/system/admin')
    }
    const content = (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <WrapperLogout onClick={handleLogout}>Đăng xuất</WrapperLogout>
            <WrapperLogout onClick={handleNavigateProfile}>Thông tin người dùng</WrapperLogout>
            {user?.isAdmin && (
                <WrapperLogout onClick={handleNavigateAdmin}>Quản lý hệ thống</WrapperLogout>
            )}
        </div>
    );

    return (
        <div style={{ width: '100%' }}>
            <div style={{ backgroundColor: 'black', height: '30px', display: 'flex', alignItems: 'center', paddingLeft: '40px' }}>
                <DribbbleOutlined style={{ color: '#fff', }} />
            </div>
            <WrapperHeader>
                <Col onClick={() => navigate('/')} span={4} style={{ display: 'flex', alignItems: "center", cursor: 'pointer' }} >
                    {/* <WrapperImageLogo width={'45px'} height={'45px'} src={logo} preview={false} /> */}
                    {/* <WrapperText>
                        SHOP md
                    </WrapperText> */}
                    <div style={{ backgroundColor: 'black', color: 'white', width: '180px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                        Sneaker Asia
                    </div>
                </Col>
                {/* <Col span={1} >
                    {!isHiddenSearch && (

                        <ButtonInputSearch
                            placeholder="Tìm kiếm sản phẩm ...."
                            textButton="Tìm kiếm"
                            size="large"

                        // onSearch={onSearch}
                        />

                    )}

                </Col> */}
                <Col span={5} style={{ position: 'absolute', right: '50px', display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <LoadingComponent isLoading={loading}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                            <WrapperIcon>
                                {!isHiddenSearch && <SearchOutlined style={{ fontSize: '20px' }} onClick={showDrawerSearch} />}
                            </WrapperIcon>
                            <WrapperAccount >
                                {user?.avatar
                                    ? (
                                        <img src={userAvatar} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />)
                                    :
                                    <UserOutlined onClick={handleNavigateLogin} style={{ cursor: 'pointer', fontSize: "20px" }} />
                                }
                                {user?.access_token ?
                                    <>
                                        <Popover content={content} trigger="click">
                                            <div style={{ color: 'rgb(109,171,230)', padding: '0 10px' }}>Xin chào</div>
                                            <div style={{ padding: '0 10px', textDecoration: 'underline' }}>{userName?.length ? userName : user?.email}</div>
                                        </Popover>
                                    </>
                                    : <div>
                                    </div>

                                }

                            </WrapperAccount>
                            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                {!isHiddenCart && (
                                    <>
                                        <WrapperIcon>
                                            <Badge count={4} size='small' >
                                                <ShoppingCartOutlined style={{ fontSize: "20px" }} onClick={showDrawerCart} />
                                            </Badge>
                                        </WrapperIcon>
                                        {/* <WrapperTextSmall>Giỏ Hàng</WrapperTextSmall> */}
                                    </>
                                )}
                            </div>
                        </div>
                    </LoadingComponent>
                </Col>
            </WrapperHeader>

            <DrawerComponent
                title="Sneaker Asia"
                placement={"top"}
                closable={false}
                onClose={onCloseSearch}
                open={openSearch}
                key={placement}
            >
                {!isHiddenSearch && (
                    <ButtonInputSearch
                        placeholder="Tìm kiếm sản phẩm ...."
                        textButton="Tìm kiếm"
                        size="large"
                    // onSearch={onSearch}
                    />

                )}
            </DrawerComponent>
            <Drawer
                title="Sneaker Asia"
                placement={"right"}
                closable={false}
                onClose={onCloseCart}
                open={openCart}
                key={placement}
            >
                <div>Giỏ Hàng</div>
            </Drawer>
        </div>
    )
}
