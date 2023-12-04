import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { SliderComponent } from '../../component/SliderComponent/SliderComponent'
import { WrapperButtonMore, WrapperProduct } from '../HomePage/style'
import { CardComponent } from '../../component/CardComponent/CardComponent'
export const SearchProduct = () => {
    const productSearch = useSelector((state) => state?.product?.search)
    const [stateProduct, setStateProduct] = useState([])
    const searchDebounce = useDebounce(productSearch, 100)
    const refSearch = useRef(false)
    const fetchProduct = async (search) => {
        const res = await ProductService.getAllProduct(search);
        if (search.length > 0 || refSearch.current) {
            setStateProduct(res?.data)
        }
        return res;
    }
    // const query = useQuery({ queryKey: ['products'], queryFn: fetchProduct })
    // const products = query.data
    useEffect(() => {
        // Dùng trick để lần đầu kh chạy
        if (refSearch) {
            fetchProduct(searchDebounce)
        }
        refSearch.current = true
    }, [searchDebounce])
    // useEffect(() => {
    //     if (products?.data?.length > 0) {
    //         setStateProduct(products?.data)
    //     }
    // }, [products])
    return (
        <>
            <h3 style={{ padding: '0 30px', fontSize: '14px', gap: '10px', color: 'rgb(137,137,137)' }}>Tìm Kiếm  /
                <span style={{ marginLeft: '10px', fontSize: '14px', color: 'black' }}>#{productSearch}</span>
            </h3>
            <div className='body' style={{ width: '100%', backgroundColor: "#fff" }}>
                <div id="container" style={{ height: 'fit-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0', fontSize: '30px', }}>Sản Phẩm Mới</div>
                    <WrapperProduct>
                        {stateProduct && stateProduct.length > 0 ? (
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
                            <p>Không tìm thấy sản phẩm</p>
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
        </>
    )
}
