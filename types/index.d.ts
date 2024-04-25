declare global {
  interface Window {
    kakao: any;
  }
}

declare module types {
  interface Data {
    count: number;
    result: Array<any>;
  }

  interface State {
    date: Date;
    meal: string;
    data: Data;
    today: Date;
    showCal: boolean;
    showInfo: boolean;
    loading: boolean;
    infoData: any;
    loginStatus: boolean;
  }

  type Action =
    | { type: "SET_DATE"; date: Date }
    | { type: "SET_MEAL"; meal: string }
    | { type: "SET_DATA"; data: Data }
    | { type: "SET_LOADING"; loading: boolean }
    | { type: "SET_INFODATA"; infoData: any }
    | { type: "TOGGLE_SHOWCAL" }
    | { type: "TOGGLE_SHOWINFO" }
    | { type: "SET_LOGINSTATUS"; loginStatus: boolean }
    | { type: "SET_LOGINMODAL"; isLoginModal: boolean };
}

export default types;
