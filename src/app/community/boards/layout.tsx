"use client";

import { useEffect, useState } from "react";
import { BoardMenu } from "app/community/boards/components/BoardMenu";
import Layout from "../layout";
import { Board as BoardType, RawBoard } from "types";
import { boardParser } from "utils/DataUtil";
import { getBoardList } from "utils/api/community";

interface BoardProps {
  selectedBoardId?: number;
  showBoardMenu: boolean;
  children?: React.ReactNode;
}

export default function Board({ selectedBoardId, showBoardMenu, children }: BoardProps) {
  const [boardId, setBoardId] = useState(1);
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

  return (
    <>
      {showBoardMenu && (
        <BoardMenu boardId={selectedBoardId ?? boardId} setBoardId={setBoardId} boards={boards} />
      )}
      {children}
    </>
  );
}
