import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardMenu } from "components/Community/BoardMenu";

import Layout from "../layout";

import APIendpoint from "constants/constants";
import axios from "axios";
import { Board as BoardType, Post, RawPost, RawBoard } from "types";
import { boardParser } from "utils/DataUtil";

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
    async function fetchBoards() {
      await axios
        .get(`${APIendpoint()}/community/boards`)
        .then((res) => {
          setBoards([]);
          res.data.map(setParsedBoards);
        })
        .catch((e) => console.log(e));
    }

    fetchBoards();
  }, []);

  return (
    <Layout>
      <>
        <Container>
          <BoardMenu boardId={selectedBoardId ?? boardId} setBoardId={setBoardId} boards={boards} />
          {children}
        </Container>
      </>
    </Layout>
  );
}

const Container = styled.div``;
