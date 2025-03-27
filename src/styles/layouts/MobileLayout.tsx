import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: none; /* 모바일 전용 layout */
  height: 100%;
  flex-direction: column;

  @media (max-width: 768px) {
    display: flex; 
  }
`;

const Section = styled.div`
  @media(max-width: 768px){
    padding: 0 16px;
  }
`

const MobileLayout = { Container, Section };

export default MobileLayout;