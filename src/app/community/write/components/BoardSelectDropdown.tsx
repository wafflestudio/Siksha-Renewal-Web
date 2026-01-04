import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Board } from "types";

interface BoardSelectDropdownProps {
  boards: Board[];
  onSelect: (boardId: number) => void;
}

export function BoardSelectDropdown({ boards, onSelect }: BoardSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBoardId, setSelectedBoardId] = useState<number>(1);
  const selectedBoardName = boards?.filter((board) => board.id === selectedBoardId)[0]?.name;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickItem = (boardId: number) => {
    setSelectedBoardId(boardId);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onSelect(selectedBoardId);
  }, [selectedBoardId]);

  return (
    <Container ref={dropdownRef}>
      <BoardMenu onClick={toggleDropdown}>
        <span>{selectedBoardName}</span>
        <Icon src="/img/down-arrow.svg" style={{ width: "11px" }} alt="게시판 선택" />
      </BoardMenu>
      <BoardMenuList isOpen={isOpen}>
        {boards.map((board) => (
          <BoardMenuItem
            key={board.id}
            onClick={() => handleClickItem(board.id)}
            className={board.id === selectedBoardId ? "selected" : ""}
          >
            <span>{board.name}</span>
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
  position: relative;
  text-align: center;
  width: 100%;
  border: 1px solid var(--SemanticColor-Border-Primary);
  border-radius: 8px;
  cursor: pointer;
  height: 39px;
  margin-bottom: 12px;
  background: var(--SemanticColor-Background-Primary);
  color: var(--Color-Foundation-base-black);

  @media (max-width: 768px) {
    margin: 14.43px 0 6px 0;
    height: 35px;
  }
`;

const Icon = styled.img`
  position: absolute;
  width: 6px;
  height: 10px;
  margin-left: 9px;
  top: 50%;
  transform: translateY(-50%);
`;

const BoardMenuList = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: absolute;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--SemanticColor-Border-Primary);
  border-radius: 8px;
  margin-top: -5px;
  z-index: 10;
`;

const BoardMenuItem = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  height: 39px;
  line-height: 39px;
  background: var(--SemanticColor-Background-Primary);
  cursor: pointer;
  color: var(--Color-Foundation-base-black);

  &.selected {
    color: var(--Color-Foundation-orange-500);

    ::after {
      content: "";
      position: absolute;
      width: 13px;
      height: 11px;
      margin-left: 9px;
      top: 50%;
      transform: translateY(-50%);
      background: url("/img/check.svg") no-repeat;
      background-size: contain;

      @media (max-width: 768px) {
        width: 10px;
        height: 8px;
      }
    }
  }

  &:active {
    background: var(--SemanticColor-Element-Chip);
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--SemanticColor-Border-Primary);
  }
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
