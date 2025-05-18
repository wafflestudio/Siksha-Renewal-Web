import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Board as BoardType, RawBoard } from "types";
import { getBoardList } from "utils/api/community";
import { boardParser } from "utils/DataUtil";
import LeftArrowMobileIcon from "assets/icons/left-arrow-mobile.svg";

export default function MobileSubHeader({
  title,
  selectedBoardId,
  handleBack,
}: {
  title?: string;
  selectedBoardId?: number;
  handleBack: () => void;
}) {
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    function setParsedBoards(board: RawBoard) {
      setBoards((prev) => [...prev, boardParser(board)]);
    }

    getBoardList().then((data) => {
      setBoards([]);
      data.map(setParsedBoards);
    });
  }, []);

  const boardTitle = boards?.filter((board) => board.id === selectedBoardId)[0]?.name;

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.getElementById("root-layout"));
  }, []);

  if (rootElement)
    return createPortal(
      <MobileHeader>
        <BackButton onClick={handleBack} aria-label="뒤로 가기" />
        <Title>{title || boardTitle}</Title>
      </MobileHeader>,
      rootElement,
    );
}
// --Color-Foundation-base-white-5
const MobileHeader = styled.div`
  display: none;
  font-size: 20px;
  margin: 0;
  top: 0;
  background: var(--Color-Foundation-orange-500-2);
  position: absolute;
  width: 100%;
  height: 44px;
  z-index: 1;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BackButton = styled(LeftArrowMobileIcon)`
  position: absolute;
  width: 10px;
  height: 16px;
  left: 16px;
  color: var(--Color-Foundation-base-white-2);
  cursor: pointer;
`;

const Title = styled.div`
  color: var(--Color-Foundation-base-white-2);
  font-size: 20px;
  font-weight: 800;
  max-width: calc(100vw - 96px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
