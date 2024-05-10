import Link from "next/link";
import styled from "styled-components";

interface BoardMenuProps {
  boardId: number;
  setBoardId: (value: number) => void;
  boards: {
    id: number;
    name: string;
  }[];
}

export function BoardMenu({ boardId, setBoardId, boards }: BoardMenuProps) {
  console.log(boardId);
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
  background-color: white;
`;
const MenuItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  cursor: pointer;

  &.selected {
    color: #ff9522;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 3px;
      height: 100%;
      background-color: #ff9522;
    }
  }
`;
