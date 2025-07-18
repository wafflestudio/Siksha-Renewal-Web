import {
  Post,
  RawComment,
  RawPost,
  Comment,
  RawBoard,
  Board,
  RawRestaurant,
  Restaurant,
} from "types";

export function boardParser(board: RawBoard): Board {
  const { created_at, updated_at, id, type, name, description } = board;

  const parsedBoard: Board = {
    createdAt: created_at,
    updatedAt: updated_at,
    id: id,
    type: type,
    name: name,
    description: description,
  };

  return parsedBoard;
}

export function postParser(post: RawPost): Post {
  const {
    board_id,
    id,
    title,
    content,
    created_at,
    updated_at,
    nickname,
    profile_url,
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
    profileUrl: profile_url,
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

export function commentParser(comment: RawComment): Comment {
  const {
    post_id,
    content,
    created_at,
    updated_at,
    id,
    nickname,
    profile_url,
    available,
    anonymous,
    is_mine,
    is_liked,
    like_cnt,
  } = comment;

  const parsedComment: Comment = {
    postId: post_id,
    content: content,
    createdAt: created_at,
    updatedAt: updated_at,
    id: id,
    nickname: nickname,
    profileUrl: profile_url,
    available: available,
    anonymous: anonymous,
    isMine: is_mine,
    likeCount: like_cnt,
    isLiked: is_liked,
  };

  return parsedComment;
}

export function restaurantParser(restaurant: RawRestaurant) {
  const parsedRestaurant: Restaurant = {
    createdAt: restaurant.created_at,
    updatedAt: restaurant.updated_at,
    id: restaurant.id,
    code: restaurant.code,
    nameKr: restaurant.name_kr,
    nameEn: restaurant.name_en,
    addr: restaurant.addr,
    lat: restaurant.lat,
    lng: restaurant.lng,
    etc: restaurant.etc,
  };

  return parsedRestaurant;
}
