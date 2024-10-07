import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Board } from "types";

interface BoardSelectDropdownProps{
  boards: Board[];
  onSelect: (boardId: number) => void;
};

export function BoardSelectDropdown({ boards, onSelect }: BoardSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBoardId, setSelectedBoardId] = useState<number>(1);
  const selectedBoardName = boards?.filter((board) => board.id === selectedBoardId)[0]?.name;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickItem = (boardId: number) => {
    setSelectedBoardId(boardId);
    setIsOpen(false);
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onSelect(selectedBoardId);
  }, [selectedBoardId]);
  
  return (
      <Container ref={dropdownRef}>
        <BoardMenu onClick={toggleDropdown}>
          {selectedBoardName}
          <Icon src="/img/down-arrow.svg" style={{ width: "11px" }} alt="게시판 선택" />
        </BoardMenu>
        <BoardMenuList isOpen={isOpen}>
          {boards.map((board) => (
            <BoardMenuItem key={board.id} onClick={() => handleClickItem(board.id)} className={board.id === selectedBoardId ? "selected" : ""}>
              {board.name}
            </BoardMenuItem>
          ))}
        </BoardMenuList>
      </Container>
    );
}

const Container = styled.div`
  position: relative;
`;

const BoardMenu = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  cursor: pointer;
  height: 39px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin: 14.43px 0 6px 0;
    height: 35px;
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

const BoardMenuList = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  margin-top: -8px;
`;

const BoardMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 39px;
  background: #ffffff;
  cursor: pointer;

  &.selected {
    font-weight: #ff9522;
  }

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
