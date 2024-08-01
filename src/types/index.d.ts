// types/index.d.ts
export interface State {
  date: Date;
  meal: string;
  data: RawMenuList;
  today: Date;
  showCal: boolean;
  showInfo: boolean;
  loading: boolean;
  infoData: any;
  authStatus: "loading" | "login" | "logout";
  /**
   * @deprecated safety is not guaranteed on loading
   */
  loginStatus: boolean;
  isLoginModal: boolean;
  userInfo: User | null;
  isFilterFavorite: boolean;
  favoriteRestaurant: number[];
  isExceptEmptyRestaurant: boolean;
}

export type Action =
  | { type: "SET_DATE"; date: Date }
  | { type: "SET_MEAL"; meal: string }
  | { type: "SET_DATA"; data: RawMenuList }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_INFODATA"; infoData: any }
  | { type: "TOGGLE_SHOWCAL" }
  | { type: "TOGGLE_SHOWINFO" }
  | { type: "SET_LOGINSTATUS"; loginStatus: boolean }
  | { type: "SET_LOGINMODAL"; isLoginModal: boolean }
  | {
      type: "SET_USERINFO";
      userInfo: User;
    }
  | { type: "SET_FAVORITERESTAURANT"; favoriteRestaurant: number[] };

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

export interface RawRestaurant {
  created_at: string;
  updated_at: string;
  id: number;
  code: string;
  name_kr: string;
  name_en: string;
  addr: string;
  lat: number;
  lng: number;
  etc: Record<string, any>;
}

export interface Restaurant {
  createdAt: string;
  updatedAt: string;
  id: number;
  code: string;
  nameKr: string;
  nameEn: string;
  addr: string;
  lat: number;
  lng: number;
  etc: Record<string, any>;
}

export interface RawMenuList {
  BR: Array<
    RawRestaurant & {
      menus: RawMenu[];
    }
  >;
  DN: Array<
    RawRestaurant & {
      menus: RawMenu[];
    }
  >;
  LU: Array<
    RawRestaurant & {
      menus: RawMenu[];
    }
  >;
  date: string;
}

export interface RawMenu {
  created_at: string;
  updated_at: string;
  id: number;
  restaurant_id: number;
  code: string;
  date: string;
  type: string;
  name_kr: string;
  name_en: string;
  price: number;
  etc: string[];
  score: number;
  review_cnt: number;
  is_liked: boolean;
  like_cnt: number;
}

export interface RawReview {
  created_at: string;
  updated_at: string;
  id: number;
  menu_id: number;
  user_id: number;
  score: number;
  comment: string;
  etc: Record<string, any>;
}

export interface RawUser {
  id: number;
  type: string;
  identity: string;
  nickname: string;
  etc: {
    image?: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export interface FavoriteRestaurant {
  id: number;
  nameKr: string;
  nameEn: string;
}
