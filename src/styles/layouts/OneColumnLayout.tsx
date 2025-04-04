import styled from "styled-components";

const Container = styled.div`
  /* 데스크톱 모바일 겸용 layout */
  box-sizing: border-box;
  display: flex;
  margin: 22px auto 0 auto;
  padding: 24px;
  max-width: 582px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    padding-top: 44px;
  }
`;

const OneColumnLayout = { Container };

export default OneColumnLayout;