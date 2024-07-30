import styled from "styled-components";

interface BackClickableProps {
  children: JSX.Element;
  onClickBackground: () => void;
}

export default function BackClickable({ children, onClickBackground }: BackClickableProps) {
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClickBackground();
    }
  };

  return <Background onClick={handleBackgroundClick}>{children}</Background>;
}

const Background = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;
