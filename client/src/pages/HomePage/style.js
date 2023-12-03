import styled from "styled-components";
import { ButtonComponent } from "../../component/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    gap:24px;
    font-size:18px;
    height:44px;
    

`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        background: rgb(13,92,182);
        color:#fff;
    }
`

export const WrapperProduct = styled.div`
    display:flex;
    justify-content:center;
    gap:14px;
    margin-top:20px;
    flex-wrap:wrap;
`