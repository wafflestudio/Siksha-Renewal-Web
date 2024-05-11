// types/index.d.ts
export interface Data {
  count: number;
  result: Array<any>;
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
  | { type: "SET_LOGINMODAL"; isLoginModal: boolean };

// Extend the Window interface for global scope (if needed)
declare global {
  interface Window {
    kakao: any;
  }
}

// 가짜 데이터 type
export interface board {
  id: number;
  name: string;
}
export interface post {
  title: string;
  content: string;
  likes: number;
  comments: number;
}
