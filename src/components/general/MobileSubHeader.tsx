import { useState, useEffect } from "react";
import styled from "styled-components";
import { Board as BoardType, RawBoard } from "types";
import { getBoardList } from "utils/api/community";
import { boardParser } from "utils/DataUtil";

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

  return (
    <MobileHeader>
      <BackButton src="/img/left-arrow-white.svg" onClick={handleBack} alt="뒤로 가기" />
      <Title>{title || boardTitle}</Title>
    </MobileHeader>
  );
}

const MobileHeader = styled.div`
  display: none;
  font-size: 20px;
  margin: 0;
  top: 0;
  background: #ff9522;
  position: absolute;
  width: 100%;
  height: 60px;
  z-index: 1;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BackButton = styled.img`
  position: absolute;
  width: 10px;
  height: 16px;
  left: 16px;
  cursor: pointer;
`;

const Title = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 800;
  max-width: calc(100vw - 96px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
