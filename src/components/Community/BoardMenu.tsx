import Link from "next/link";
import styled from "styled-components";
import { Board } from "types";

interface BoardMenuProps {
  boardId: number;
  setBoardId: (value: number) => void;
  boards: Board[];
}

export function BoardMenu({ boardId, setBoardId, boards }: BoardMenuProps) {
  return (
    <Menu>
      {boards.map((board, i) => (
        <Link key={i} href={`/community/boards/${board.id}`}>
          <MenuItem
            className={boardId === board.id ? "selected" : ""}
            onClick={() => setBoardId(board.id)}
          >
            {board.name}
          </MenuItem>
        </Link>
      ))}
    </Menu>
  );
}

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -118px;
  top: 32px;
  width: 118px;
  
  @media (max-width: 768px) {
    flex-direction: row;
    position: relative;
    left: 0;
    top: 0;
    width: auto;
    padding-bottom: 19px;

    &::after {
      content: ' ';
      position: absolute;
      width: calc(100% + 25px);
      height: 1px;
      bottom: 0;
      left: 50%;
      background-color: #f0f0f0;
      transform: translateX(-50%);
    }
  }
`;
const MenuItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }

  &.selected {
    color: #ff9522;
    background: #ffffff;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 3px;
      height: 100%;
      background-color: #ff9522;
    }
  }

  @media (max-width: 768px) {
    color: #b7b7b7;
    background: #f2f2f2;
    border-radius: 12px;
    width: max-content;
    height: auto;
    padding: 9px 12px;
    margin-right: 12px;

    font-weight: 700;
    font-size: 15px;

    &.selected {
      color: #ffffff;
      background: #ff9522;

      &::before {
        display: none;
      }
    }
  }
`;
