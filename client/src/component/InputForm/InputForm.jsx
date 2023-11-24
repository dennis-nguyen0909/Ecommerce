import React, { useState } from 'react'
import { Input } from 'antd'
import { WrapperInputStyle, WrapperLabelStyle } from './style';
export const InputForm = (props) => {
    const {
        placeholder = "Nhập ....", label, ...rests
    } = props;
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <>
            <WrapperLabelStyle>{label}</WrapperLabelStyle>
            <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput} />
        </>
    )
}
