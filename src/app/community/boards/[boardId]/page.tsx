import { getBoardList } from "utils/api/community";
import Posts from "./Boards";

export async function generateStaticParams() {
  try {
    const boards = await getBoardList();
    return boards.map(({ id }) => ({ boardId: id.toString() }));
  } catch (error) {
    console.warn("Failed to generate static params for board pages:", error);
    return [];
  }
}

export default async function Board({ params }) {
  const { boardId } = (await params) ?? "";

  return (
    <>
      <Posts boardId={Number(boardId)} />
    </>
  );
}
