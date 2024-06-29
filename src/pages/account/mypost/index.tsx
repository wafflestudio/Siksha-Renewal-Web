import { PostList } from "components/Community/PostList";
import AccountLayout from "../layout";
import APIendpoint from "constants/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStateContext } from "hooks/ContextProvider";
import { Post, RawPost } from "types";

export default function MyPost() {
  const state = useStateContext();

  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchMyPosts() {
    await axios
      .get(`${APIendpoint()}/community/posts/me`, {
        headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
      })
      .then((res) => {
        console.log(res.data);
        res.data.result.map(update);
      })
      .catch((e) => console.log(e));
  }

  function update(post: RawPost) {
    const {
      board_id,
      id,
      title,
      content,
      created_at,
      updated_at,
      nickname,
      anonymous,
      available,
      is_mine,
      etc,
      like_cnt,
      comment_cnt,
      is_liked,
    } = post;
    setPosts((prev) => [
      ...prev,
      {
        boardId: board_id,
        id: id,
        title: title,
        content: content,
        createdAt: created_at,
        updatedAt: updated_at,
        nickname: nickname,
        anonymous: anonymous,
        available: available,
        isMine: is_mine,
        images: etc ? etc.images : etc,
        likeCount: like_cnt,
        commentCount: comment_cnt,
        isLiked: is_liked,
      },
    ]);
  }
  console.log(posts);
  useEffect(() => {
    fetchMyPosts();
  }, []);
  return (
    <AccountLayout>
      <PostList posts={posts} />
    </AccountLayout>
  );
}
