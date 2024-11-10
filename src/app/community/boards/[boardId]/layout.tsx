import { getBoardList } from "utils/api/community";
import { BoardMenu } from "./components/BoardMenu";
import { boardParser } from "utils/DataUtil";

export default async function CommunityLayout({ params, children }) {
  const { boardId } = (await params) ?? "";
  const boards = await getBoardList().then((rawBoardList) => rawBoardList.map(boardParser));

  return (
    <>
      <BoardMenu boardId={Number(boardId)} boards={boards} />
      {children}
    </>
  );
}
