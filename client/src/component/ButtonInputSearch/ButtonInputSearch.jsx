import { Button, Input } from 'antd'
import React from 'react'
import { SearchOutlined } from "@ant-design/icons"
import { ButtonComponent } from '../ButtonComponent/ButtonComponent'
import { InputComponent } from '../InputComponent/InputComponent'
export const ButtonInputSearch = (props) => {
    const { size,
        placeholder,
        textButton,
        bordered,
        backgroundColor = "#fff",
        backgroundButton = "black",
        colorButton = "#fff"
    } = props
    return (
        <div style={{ display: "flex", backgroundColor: "#fff", borderRadius: "12px" }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColor }}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundButton, color: colorButton, border: !bordered && "none" }}
                icon={<SearchOutlined color={colorButton} style={{ color: "#fff" }} />}
                textButton={textButton}
                styleTextButton={{ color: colorButton }}
            />
        </div>
    )
}
