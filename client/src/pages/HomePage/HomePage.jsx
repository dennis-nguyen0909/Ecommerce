import React from 'react'
import { TypeProduct } from '../../component/TypeProduct/TypeProduct'
import { WrapperTypeProduct } from './style'
import { SliderComponent } from '../../component/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import slider4 from '../../assets/images/slider4.jpg'
import { CardComponent } from '../../component/CardComponent/CardComponent'
import { NavbarComponent } from '../../component/NavbarComponent/NavbarComponent'
export const HomePage = () => {
    const arr = ['Nike', 'Adidas', 'MLB', 'Vans']
    return (
        <>
            <div style={{ padding: "0 120px" }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct key={item} name={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div id="container" style={{ backgroundColor: "#efefef", padding: '0 120px', height: '1000px' }}>
                <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <CardComponent />
                </div>
                <NavbarComponent />
            </div>
        </>
    )
}
