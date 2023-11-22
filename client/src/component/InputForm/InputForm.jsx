import React, { useState } from 'react'
import { Input } from 'antd'
import { WrapperInputStyle, WrapperLabelStyle } from './style';
export const InputForm = (props) => {
    const [valueInput, setValueInput] = useState("");
    const {
        placeholder = "Nhập ....", label, ...rests

    } = props;
    return (
        <>
            <WrapperLabelStyle>{label}</WrapperLabelStyle>
            <WrapperInputStyle placeholder={placeholder} value={valueInput} {...rests} />
        </>
    )
}
