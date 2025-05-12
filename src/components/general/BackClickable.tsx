import styled, { css } from "styled-components";

interface BackClickableProps {
  children?: JSX.Element;
  onClickBackground: () => void;
  style?: string;
}

export default function BackClickable({ children, onClickBackground, style }: BackClickableProps) {
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClickBackground();
    }
  };

  return (
    <Background customStyle={style ?? undefined} onClick={handleBackgroundClick}>
      {children}
    </Background>
  );
}

const Background = styled.div<{ customStyle?: string }>`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;

  ${(props) =>
    props.customStyle &&
    css`
      ${props.customStyle}
    `}
`;
