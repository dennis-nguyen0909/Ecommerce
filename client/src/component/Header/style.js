
import { Row } from 'antd'
import styled from 'styled-components'
export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(128, 128, 128);
    align-item:center;
    gap:16px;
    flex-wrap:nowrap;

`

export const WrapperText = styled.span`
    font-size: 30px;
    font-weight:bold;
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