import { getBoardList, getPostList } from "utils/api/community";
import Posts from "./Posts";

export async function generateStaticParams() {
  const staticParams: { boardId: string; postId: string }[] = [];

  const boards = await getBoardList();

  await Promise.all(
    boards.map(async ({ id: boardId }) => {
      const { result: posts } = await getPostList(boardId);
      posts.forEach(({ id: postId }) => {
        staticParams.push({ boardId: boardId.toString(), postId: postId.toString() });
      });
    }),
  );

  return staticParams;
}

export default async function Page({ params }) {
  const { boardId, postId } = (await params) ?? "";
  return <Posts boardId={Number(boardId)} postId={Number(postId)} />;
}
