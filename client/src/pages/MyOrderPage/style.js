import styled from 'styled-components';

export const WrapperDiv = styled.div`
    border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;

  div {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  div:nth-child(2) {
    border-right: none;
    border-left: none;
    padding: 0 20px; /* Adjust the padding */
  }

  div:nth-child(3) {
    margin-right: 0;
  }

  @media (min-width: 800px) {
    div {
      width: calc(33.33% - 20px); /* Adjust the width as needed */
    }

    div:nth-child(2) {
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
      padding: 0 50px;
    }

    div:nth-child(3) {
      margin-right: 50px;
    }
  }
`;
