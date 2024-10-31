import { getBoardList } from "utils/api/community";
import Posts from "./Boards";

export async function generateStaticParams() {
  const boards = await getBoardList();

  return boards.map(({ id }) => ({ boardId: id.toString() }));
}

export default function Page({ params }: { params: { boardId: string } }) {
  return <Posts boardId={Number(params.boardId)} />;
}
