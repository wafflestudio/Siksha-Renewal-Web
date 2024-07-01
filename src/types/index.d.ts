// types/index.d.ts
export interface Data {
  BR: Array<any>;
  DN: Array<any>;
  LU: Array<any>;
  date: string;
}

export interface State {
  date: Date;
  meal: string;
  data: Data;
  today: Date;
  showCal: boolean;
  showInfo: boolean;
  loading: boolean;
  infoData: any;
  loginStatus: boolean;
  isLoginModal: boolean;
  userInfo: {
    id: number | null;
    nickname: string | null;
  };
  favoriteRestaurant: number[];
  isExceptEmptyRestaurant: boolean;
}

export type Action =
  | { type: "SET_DATE"; date: Date }
  | { type: "SET_MEAL"; meal: string }
  | { type: "SET_DATA"; data: Data }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_INFODATA"; infoData: any }
  | { type: "TOGGLE_SHOWCAL" }
  | { type: "TOGGLE_SHOWINFO" }
  | { type: "SET_LOGINSTATUS"; loginStatus: boolean }
  | { type: "SET_LOGINMODAL"; isLoginModal: boolean }
  | { type: "SET_USERINFO"; userInfo: { id: number | null; nickname: string | null } }
  | { type: "SET_FAVORITERESTAURANT"; favoriteRestaurant: number[] };

// Extend the Window interface for global scope (if needed)
declare global {
  interface Window {
    kakao: any;
  }
}

export interface Board {
  createdAt: string;
  updatedAt: string;
  id: number;
  type: number;
  name: string;
  description: string;
}

export interface RawBoard {
  created_at: string;
  updated_at: string;
  id: number;
  type: number;
  name: string;
  description: string;
}

export interface Post {
  boardId: number;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  nickname: string | null;
  anonymous: boolean;
  available: boolean;
  isMine: boolean;
  images: string[] | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean | null;
}

export interface RawPost {
  board_id: number;
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  nickname: string | null;
  anonymous: boolean;
  available: boolean;
  is_mine: boolean;
  etc: { images: string[] } | null;
  like_cnt: number;
  comment_cnt: number;
  is_liked: boolean | null;
}

export interface Comment {
  postId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  nickname: string;
  avaliable: boolean;
  anonymous: boolean;
  isMine: boolean;
  likeCount: number;
  isLiked: boolean;
}

export interface RawComment {
  post_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  id: number;
  nickname: string;
  avaliable: boolean;
  anonymous: boolean;
  is_mine: boolean;
  like_cnt: number;
  is_liked: boolean;
}
