import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Board as BoardType, RawBoard } from "types";
import { getBoardList } from "utils/api/community";
import { boardParser } from "utils/DataUtil";
import LeftArrowMobileIcon from "assets/icons/left-arrow-mobile.svg";
import { BackgroundColor } from "styles/styled";

export default function MobileSubHeader({
  title,
  selectedBoardId,
  handleBack,
  rightIcon,
  onRightIconClick,
  containerColor = "secondary",
}: {
  title?: string;
  selectedBoardId?: number;
  handleBack: () => void;
  rightIcon?: string;
  onRightIconClick?: () => void;
  containerColor?: BackgroundColor;
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

  const headerContent = (
    <MobileHeader>
      <BackButton src="/img/general/left-arrow-white.svg" onClick={handleBack} alt="뒤로 가기" />
      <Title>{title || boardTitle}</Title>
      {rightIcon && onRightIconClick && (
        <RightIconButton src={rightIcon} onClick={onRightIconClick} alt="알림 설정" />
      )}
    </MobileHeader>
  );

  if (rootElement) {
    return createPortal(
      <MobileHeader $containercolor={containerColor}>
        <BackButton onClick={handleBack} aria-label="뒤로 가기" />
        <Title>{title || boardTitle}</Title>
      </MobileHeader>,
      rootElement,
    );
  }

  // Fallback: render directly if portal target not found
  return headerContent;
}

const MobileHeader = styled.div<{ $containercolor?: BackgroundColor }>`
  display: none;
  margin: 0;
  top: 0;
  background: ${({ $containercolor }) =>
    $containercolor === "secondary"
      ? "var(--SemanticColor-Background-GNB-Secondary)"
      : "var(--SemanticColor-Background-GNB)"};
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
  color: var(--Color-Static-White);
  cursor: pointer;
`;

const Title = styled.div`
  color: var(--SemanticColor-Text-GNB);
  font-size: 16px;
  font-weight: 800;
  line-height: 140%;
  max-width: calc(100vw - 96px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const RightIconButton = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 16px;
  cursor: pointer;
`;
