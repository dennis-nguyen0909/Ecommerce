import React, { useEffect, useRef, useState } from 'react'
import { TypeProduct } from '../../component/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from './style'
import { SliderComponent } from '../../component/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import slider4 from '../../assets/images/slider4.jpg'
import { CardComponent } from '../../component/CardComponent/CardComponent'
import * as ProductService from '../../services/ProductService'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
export const HomePage = () => {
    const arr = ['About Us', 'Cửa Hàng', 'Giảm giá', 'Liên hệ', 'Chăm sóc khách hàng']
    const refSearch = useRef(false)
    const searchProduct = useSelector((state) => state.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const [stateProduct, setStateProduct] = useState([])
    const fetchProduct = async (search) => {
        const res = await ProductService.getAllProduct(search);
        if (search.length > 0 || refSearch.current) {
            setStateProduct(res?.data)
        }
        return res;
    }
    const query = useQuery({ queryKey: ['products'], queryFn: fetchProduct })
    const products = query.data

    useEffect(() => {
        // Dùng trick để lần đầu kh chạy
        if (refSearch) {
            fetchProduct(searchDebounce)
        }
        refSearch.current = true
    }, [searchDebounce])
    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data)
        }
    }, [products])
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct key={item} name={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: "#fff" }}>

                <div id="container" style={{ height: 'fit-content' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0', fontSize: '30px', }}>Sản Phẩm Mới</div>
                    <WrapperProduct>
                        {stateProduct ? (
                            stateProduct.map((product) => (
                                <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    discount={product.discount}
                                    selled={product.selled}
                                />
                            ))
                        ) : (
                            <p>No products available</p>
                        )}
                    </WrapperProduct>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
                        <WrapperButtonMore type={'outline'} textButton={'Xem thêm'} styleButton={{
                            border: '1px solid #ccc', color: 'black', width: '240px',
                            height: '38px', borderRadius: '4px',
                        }}
                            styleTextButton={{ fontWeight: '500' }} />
                    </div>
                    {/* <NavbarComponent /> */}
                </div>
            </div>
        </div >
    )
}
