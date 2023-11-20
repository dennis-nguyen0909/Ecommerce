import React from 'react'
import { Button } from 'antd'
export const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, ...rests }) => {
    return (
        <Button
            size={size}
            style={styleButton}

        ><span style={styleTextButton}>{textButton}</span></Button>
    )
}
