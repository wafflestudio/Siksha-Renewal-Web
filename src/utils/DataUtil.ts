import { Post, RawPost } from "types";

export function postParser(post: RawPost) {
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

  const parsedPost: Post = {
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
  };

  return parsedPost;
}
