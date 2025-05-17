"use client";

import Link from "next/link";
import styled from "styled-components";
import { Board } from "types";

interface BoardMenuProps {
  boardId: number;
  boards: Board[];
}

export function BoardMenu({ boardId, boards }: BoardMenuProps) {
  return (
    <MenuContainer>
      <MenuInnerContainer>
        <Menu>
          {boards.map((board, i) => (
            <Link key={i} href={`/community/boards/${board.id}`}>
              <MenuItem className={boardId === board.id ? "selected" : ""}>{board.name}</MenuItem>
            </Link>
          ))}
        </Menu>
      </MenuInnerContainer>
    </MenuContainer>
  );
}
const MenuContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    align-self: center;
    width: calc(100% + 25px);
    border-bottom: 1px solid var(--Color-Foundation-gray-100);
  }
`;
const MenuInnerContainer = styled.div`
  @media (max-width: 768px) {
    padding: 0 12.5px 0 12.5px;
    width: 100%;
    box-sizing: border-box;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -146px;
  top: 32px;
  width: 146px;

  @media (max-width: 768px) {
    flex-direction: row;
    position: relative;
    left: 0;
    top: 0;
    width: auto;
    padding: 18px 0 19px 0;
    overflow-x: auto;
    overflow-y: hidden;
    min-height: 35.5px;
  }
`;
const MenuItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 94px;
  padding: 12px 37px 12px 15px;

  color: #979797;
  font-feature-settings: "liga" off, "clig" off;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }

  &.selected {
    color: var(--Color-Foundation-orange-500);
    background: var(--Color-Foundation-base-white);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 3px;
      height: 100%;
      background-color: var(--Color-Foundation-orange-500);
    }
  }

  @media (max-width: 768px) {
    color: var(--Color-Foundation-gray-500);
    background: #f2f2f2;
    border-radius: 12px;
    width: max-content;
    height: auto;
    padding: 9px 12px;
    margin-right: 12px;

    font-weight: 700;
    font-size: 15px;

    &.selected {
      color: var(--Color-Foundation-base-white);
      background: var(--Color-Foundation-orange-500);

      &::before {
        display: none;
      }
    }
  }
`;
