import styled from "styled-components";
import MobileNavigationBar from "components/MobileNavigationBar";

export default function AccountLayout({ children }) {
  return (
    <>
      <Content>{children}</Content>
      <MobileNavigationBar />
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 37px;
  height: 100%;
`;
