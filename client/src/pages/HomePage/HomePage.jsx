import React from 'react'
import { TypeProduct } from '../../component/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from './style'
import { SliderComponent } from '../../component/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import slider4 from '../../assets/images/slider4.jpg'
import { CardComponent } from '../../component/CardComponent/CardComponent'
export const HomePage = () => {
    const arr = ['Nike', 'Adidas', 'MLB', 'Vans']
    return (
        <div>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct key={item} name={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: "#efefef" }}>

                <div id="container" style={{ padding: '0 120px', height: 'fit-content' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                    <WrapperProduct>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
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
