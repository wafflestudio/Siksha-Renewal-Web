import styled from "styled-components";

export default function AccountLayout({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}
const Container = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 37px;
  height: 100%;

  @media (max-width: 768px) {
    margin-top: 0px;
  }
`;
