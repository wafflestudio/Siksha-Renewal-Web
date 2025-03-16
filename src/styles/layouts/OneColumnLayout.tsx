import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 22px auto 0 auto;
  padding: 0 24px;
  max-width: 582px;

  @media (max-width: 768px) {
    display: none; /* 데스크톱 전용 layout */
  }
`;

const OneColumnLayout = { Container };

export default OneColumnLayout;