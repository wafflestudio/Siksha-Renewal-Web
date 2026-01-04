import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 22px auto 0 auto;
  padding: 0 24px;
  max-width: 1242px;
  gap: 30px;

  @media (max-width: 768px) {
    display: none; /* 데스크톱 전용 layout */
  }
`;

const Left = styled.div`
  flex: 0 0 378px;
`;

const Right = styled.div`
  flex: 1;
  max-width: 786px;
  min-width: 0; // flex: 1에 의한 min-width: auto 설정 제거
`;

const TwoColumnLayout = { Container, Left, Right };

export default TwoColumnLayout;