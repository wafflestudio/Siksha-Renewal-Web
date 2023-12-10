declare module types {
  interface Window {
    kakao: unknown;
  }

  interface Data {
    count: number;
    result: Array<any>;
  }

  interface State {
    date: Date;
    meal: "BREAKFAST" | "LUNCH" | "DINNER";
    data: Data;
    showCal: boolean;
    showInfo: boolean;
    loading: boolean;
    infoData: any;
    loginStatus: boolean;
  }

  type Action =
    | { type: "SET_DATE"; date: Date }
    | { type: "SET_MEAL"; meal: "BREAKFAST" | "LUNCH" | "DINNER" }
    | { type: "SET_DATA"; data: Data }
    | { type: "SET_LOADING"; loading: boolean }
    | { type: "SET_INFODATA"; infoData: any }
    | { type: "TOGGLE_SHOWCAL" }
    | { type: "TOGGLE_SHOWINFO" }
    | { type: "SET_LOGINSTATUS"; loginStatus: boolean };
}

export default types;
