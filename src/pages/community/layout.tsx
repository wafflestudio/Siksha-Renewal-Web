import styled from "styled-components";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return <Content>{children}</Content>;
}

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(700px, 100%);
  margin: 0 auto;
  margin-top: 37px;
  margin-bottom: 80px;
  min-height: 100vh;
  max-height: 100%;
  background: white;
  border-radius: 10px;
  padding: 20px 19px 0 19px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
    width: 100%;
    min-height: auto;
    box-sizing: border-box;
    overflow-x: hidden;
  }
`;
