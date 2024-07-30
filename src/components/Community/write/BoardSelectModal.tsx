import BackClickable from "components/general/BackClickable";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Board } from "types";

interface BoardSelectModalProps {
  boards: Board[];
  onClose: () => void;
  onSubmit: (boardId: number) => void;
}

export function BoardSelectModal({ boards, onClose, onSubmit }: BoardSelectModalProps) {
  const [boardSelectMenuElement, setBoardSelectMenuElement] = useState<HTMLElement | null>(null);

  const currentPath = typeof window ? window.location.href : null;

  useEffect(() => {
    setBoardSelectMenuElement(document.getElementById("board-select-menu"));
  }, []);

  const backgroundStyle = `
    background: transparent;
  `;

  if (boardSelectMenuElement) {
    const { top, left, width } = boardSelectMenuElement.getBoundingClientRect();

    return (
      <BackClickable onClickBackground={onClose} style={backgroundStyle}>
        <Container
          style={{
            top: top,
            left: left,
            width: width,
          }}
        >
          <BoardMenuList>
            {boards.map((board, i) => (
              <BoardMenuItem
                key={i}
                onClick={() => {
                  const boardId = board.id;
                  console.log(boardId, "is boardid in boardSelectMenu");
                  onSubmit(boardId);
                }}
              >
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
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin-bottom: 6px;
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
