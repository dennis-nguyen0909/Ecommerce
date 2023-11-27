import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../untils';
import { UserOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { Header } from '../../component/Header/Header'
import { AdminUser } from '../../component/AdminUser/AdminUser';
import { AdminProduct } from '../../component/AdminProduct/AdminProduct';
import { render } from 'react-dom';
export const AdminPage = () => {
    const [keySelected, setKeySelected] = useState('');
    const items = [
        getItem('Quản lý người dùng', 'user', <UserOutlined />),
        getItem('Quản lý đơn hàng', 'product', <AppstoreOutlined />),
        {
            type: 'divider',
        },
        getItem('Cài đặt', 'sub4', <SettingOutlined />, [
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
        ]),
    ];
    const onClick = ({ key }) => {
        setKeySelected(key)
        console.log(key)
    };
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'product':
                return (
                    <AdminProduct />
                )
            default:
                return <></>
        }
    }
    return (
        <>

            <div>
                <Header isHiddenSearch isHiddenCart />
            </div>
            <div style={{ display: 'flex' }}>
                <Menu
                    onClick={onClick}
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
                <div style={{ color: 'black', flex: '1' }}>
                    {renderPage(keySelected)}
                </div>
            </div >
        </>
    )
}
