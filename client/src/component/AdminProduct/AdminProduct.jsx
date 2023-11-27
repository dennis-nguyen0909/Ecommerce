import { Button, Checkbox, Form, Image, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { TableComponent } from '../TableComponent/TableComponent'
import { InputComponent } from '../InputComponent/InputComponent';
import { WrapperUploadFile } from '../../component/AdminProduct/styled';
import { getBase64 } from '../../untils';
import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutationHook } from '../../hooks/userMutationHook';
import * as ProductService from '../../services/ProductService'
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { isPending } from '@reduxjs/toolkit';
import { useQuery } from '@tanstack/react-query';


export const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()
    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        countInStock: '',

    })
    const mutation = useMutationHook(
        async (data) => {
            const {
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock,
            } = data
            const res = await ProductService.createProduct(stateProduct)
            return res;
        }
    )
    const fetchGetAllProduct = async () => {
        const response = await ProductService.getAllProduct();
        return response
    }
    const { data, isLoading, isError, isSuccess } = mutation
    const query = useQuery({ queryKey: ['products'], queryFn: fetchGetAllProduct })
    const { isLoading: isLoadingProduct } = query
    const products = query.data
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }
    useEffect(() => {
        if (isSuccess && data?.status === "Ok") {
            message.success('Ok')
            handleCancel()
        } else if (isError) {
            message.error('no ok')
        }
    }, [isSuccess])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            type: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            countInStock: '',
        })
        form.resetFields()
    };
    const renderAction = () => {
        return (
            <div style={{ cursor: 'pointer', fontSize: '20px', }}>
                <DeleteOutlined style={{ color: 'red' }} />
                <EditOutlined style={{ color: 'orange' }} />
            </div>
        )
    }
    const onFinish = () => {
        mutation.mutate(stateProduct)
        console.log('values', stateProduct)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleOnChangeProduct = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })

    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        }, {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = products?.data.length && products.data?.map((product) => {
        return (
            { ...product, key: product._id }
        )
    })
    return (
        <div style={{}}>
            <div style={{ margin: '10px 20px' }}>
                <h3>Quản lý đơn hàng</h3>
                <Button type="primary" onClick={showModal}>
                    Thêm
                </Button>
            </div>
            <div style={{ border: '1px solid #ccc', margin: '10px 20px', borderRadius: '10px' }}>
                <TableComponent columns={columns} data={dataTable} isLoading={isLoadingProduct} />
            </div>
            <Modal title="Tạo Sản Phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                {/* <LoadingComponent isLoading={isLoading}> */}
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnChangeProduct} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnChangeProduct} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your type!',
                            },
                        ]}
                    >

                        <InputComponent value={stateProduct.type} onChange={handleOnChangeProduct} name="type" />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rating!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnChangeProduct} name="rating" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnChangeProduct} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="CountInStock"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your countInStock!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnChangeProduct} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Selected File</Button>
                            {stateProduct?.image && (
                                <img src={stateProduct?.image} style={{
                                    height: '50px', width: '50px', objectFit: 'cover', borderRadius: '50%'
                                }} />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
                {/* </LoadingComponent> */}
            </Modal>
        </div>


    )
}
