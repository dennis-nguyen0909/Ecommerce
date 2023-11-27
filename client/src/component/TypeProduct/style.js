import styled from "styled-components";

export const WrapperDivText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    position: relative;
    text-decoration: none;

    &::before,
    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 0;
        height: 1px;
        background-color: black;
        transition: width 0.3s ease;
    }

    &::before {
        left: 50%;
        transform: translateX(-50%);
    }

    &::after {
        right: 50%;
        transform: translateX(50%);
    }

    &:hover::before,
    &:hover::after {
        width: calc(100% - 15px);
    }

    &:hover {
        cursor: pointer;
    }
`;
