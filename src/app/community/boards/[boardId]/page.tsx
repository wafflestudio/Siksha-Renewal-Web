import { getBoardList } from "utils/api/community";
import Posts from "./Boards";

export async function generateStaticParams() {
  const boards = await getBoardList();
  return boards.map(({ id }) => ({ boardId: id.toString() }));
}

export default async function Board({ params }) {
  const { boardId } = (await params) ?? "";

  return (
    <>
      <Posts boardId={Number(boardId)} />
    </>
  );
}
