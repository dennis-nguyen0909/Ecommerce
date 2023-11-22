
import { Image, Row } from 'antd'
import styled from 'styled-components'
export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(128, 128, 128);
    align-item:center;
    gap:16px;
    flex-wrap:nowrap;
    display:flex;
    justify-content:center;
`

export const WrapperText = styled.span`
    font-size: 26px;
    font-weight:400;
    font-style:italic;
    color :white;
    

`
export const WrapperAccount = styled.div`
    display:flex;
    align-item:center;
    color:#fff;
    gap:10px;
`
export const WrapperTextSmall = styled.span`
    font-size:12px;
    color:#fff;
    white-space:nowrap;
`
export const WrapperImageLogo = styled(Image)`
    border-radius:50%;
`