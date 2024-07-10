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
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(700px, 100%);
  margin: 0 auto;
  margin-top: 37px;
  height: 100%;
  background: white;
  border-radius: 10px 10px 0 0;
  padding: 20px 19px;
  box-sizing: border-box;
`;
