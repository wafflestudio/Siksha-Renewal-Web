import { getBoardList } from "utils/api/community";
import Posts from "./Boards";
import { BoardMenu } from "../components/BoardMenu";
import { boardParser } from "utils/DataUtil";

export async function generateStaticParams() {
  const boards = await getBoardList();

  return boards.map(({ id }) => ({ boardId: id.toString() }));
}

export default async function Board({ params }) {
  const { boardId } = (await params) ?? "";
  const boards = await getBoardList().then((rawBoardList) => rawBoardList.map(boardParser));

  return (
    <>
      <BoardMenu boardId={Number(boardId)} boards={boards} />
      <Posts boardId={Number(boardId)} />
    </>
  );
}
