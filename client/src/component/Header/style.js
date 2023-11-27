
import { Image, Row } from 'antd'
import styled from 'styled-components'
export const WrapperHeader = styled(Row)`
    border-bottom:1px solid #ccc;
    padding: 25px 120px;
    // background-color: rgb(128, 128, 128);
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
    color :black;
    

`
export const WrapperAccount = styled.div`
    display:flex;
    align-item:center;
    color:black;
    gap:10px;
`
export const WrapperTextSmall = styled.span`
    font-size:12px;
    color:black;
    white-space:nowrap;
`
export const WrapperImageLogo = styled(Image)`
    border-radius:50%;
`

export const WrapperLogout = styled.p`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    font-size:12px;
    background-color:rgb(240,213,219);
    border-radius:12px;
    &:hover{
        cursor:pointer;
    }
`