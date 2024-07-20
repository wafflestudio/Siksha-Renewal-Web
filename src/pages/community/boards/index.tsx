import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardMenu } from "components/Community/BoardMenu";

import Layout from "../layout";

import { Board as BoardType, RawBoard } from "types";
import { boardParser } from "utils/DataUtil";
import { getBoardList } from "utils/api/community";

interface BoardProps {
  selectedBoardId?: number;
  children?: JSX.Element;
}

export default function Board({ selectedBoardId, children }: BoardProps) {
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
    <Layout>
      <>
        <BoardMenu boardId={selectedBoardId ?? boardId} setBoardId={setBoardId} boards={boards} />
        {children}
      </>
    </Layout>
  );
}

const Container = styled.div``;
