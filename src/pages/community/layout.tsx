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
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 37px;
  margin-bottom: 80px;
  height: 100%;
  background: white;
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
    max-width: inherit;
    min-height: auto;
    box-sizing: border-box;
    overflow-x: hidden;
  }
`;
