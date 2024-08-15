import BackClickable from "components/general/BackClickable";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Board } from "types";

interface BoardSelectModalProps {
  boards: Board[];
  onClose: () => void;
  onSubmit: (board: Board) => void;
}

export function BoardSelectModal({ boards, onClose, onSubmit }: BoardSelectModalProps) {
  const [menuPosition, setMenuPosition] = useState<{
    bottom: number;
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      const element = document.getElementById("board-select-menu");
      if (element) {
        const { bottom, left, width } = element.getBoundingClientRect();
        setMenuPosition({ bottom: bottom + 10, left, width });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [boards]);

  const backgroundStyle = `
    background: transparent;
  `;

  if (menuPosition) {
    const { bottom, left, width } = menuPosition;
    return (
      <BackClickable onClickBackground={onClose} style={backgroundStyle}>
        <Container
          style={{
            top: bottom,
            left: left,
            width: width,
          }}
        >
          <BoardMenuList>
            {boards.map((board, i) => (
              <BoardMenuItem key={i} onClick={() => onSubmit(board)}>
                {board.name}
              </BoardMenuItem>
            ))}
          </BoardMenuList>
        </Container>
      </BackClickable>
    );
  }
}

const Container = styled.div`
  position: absolute;

  background-color: white;
  width: 335px;
`;

const BoardMenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  margin-top: -8px;

  @media (max-width: 768px) {
  }
`;
const BoardMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 39px;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    background: #f6f6f6;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #dfdfdf;
  }
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
