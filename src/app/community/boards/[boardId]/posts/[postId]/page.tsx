import { getBoardList, getPostList } from "utils/api/community";
import Posts from "./Posts";

// 이부분때문에라도 결국은 도커에 파일 올려야할거같아요. output: export에서는 모든 데이터를 가져와야하는걸로 보임
export async function generateStaticParams() {
  const staticParams: { boardId: string; postId: string }[] = [];

  const boards = await getBoardList();

  await Promise.all(
    boards.map(async ({ id: boardId }) => {
      const { result: posts } = await getPostList(boardId, undefined, 10000);
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
