import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardHeader } from "../../../components/Community/BoardHeader";
import { PostList } from "../../../components/Community/PostList";
import { BoardMenu } from "../../../components/Community/BoardMenu";

import Layout from "../layout";

import APIendpoint from "../../../constants/constants";
import { useStateContext } from "../../../hooks/ContextProvider";
import LoginModal from "../../../components/Auth/LoginModal";
import axios from "axios";
import { Board as BoardType, Post, RawPost, RawBoard } from "../../../types";
import Posts from "./[boardId]";

interface BoardProps {
  selectedBoardId?: number;
  children?: JSX.Element;
}

export default function Board({ selectedBoardId, children }: BoardProps) {
  const [boardId, setBoardId] = useState(1);
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    async function fetchBoards() {
      const res = await axios.get(`${APIendpoint()}/community/boards`);
      setBoards([]);
      res.data.map((board: RawBoard) => {
        const { created_at, updated_at, id, type, name, description } = board;
        setBoards((prev) => [
          ...prev,
          {
            createdAt: created_at,
            updatedAt: updated_at,
            id: id,
            type: type,
            name: name,
            description: description,
          },
        ]);
      });
    }

    fetchBoards();
  }, []);

  return (
    <Layout>
      <Container>
        <BoardMenu boardId={selectedBoardId ?? boardId} setBoardId={setBoardId} boards={boards} />
        {children}
      </Container>
    </Layout>
  );
}

const Container = styled.div``;
