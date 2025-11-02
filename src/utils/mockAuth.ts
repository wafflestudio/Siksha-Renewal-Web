import { User, LikedMenusResponse } from "types";

export const MOCK_ACCESS_TOKEN = "mock-access-token-for-testing";

export const isMockAuthEnabled = (): boolean => {
  return process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === "true";
};

export const getMockUser = (): User => {
  return {
    id: 99999,
    nickname: "Mock User (QA)",
    image: null,
  };
};

export const isMockToken = (token: string): boolean => {
  return token === MOCK_ACCESS_TOKEN;
};

export const getMockLikedMenus = (): LikedMenusResponse => {
  return {
    count: 2,
    result: [
      {
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        id: 1,
        code: "STUDENT",
        name_kr: "학생식당",
        name_en: "Student Cafeteria",
        addr: "서울대학교 학생식당",
        lat: 37.461,
        lng: 126.952,
        etc: {},
        menus: [
          {
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            id: 221323,
            restaurant_id: 1,
            code: "LUNCH",
            date: "2025-01-15",
            type: "LU",
            name_kr: "김치찌개",
            name_en: "Kimchi Stew",
            price: 5000,
            etc: ["매운맛", "국물요리"],
            score: 4.5,
            review_cnt: 42,
            is_liked: true,
            like_cnt: 128,
          },
          {
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            id: 221324,
            restaurant_id: 1,
            code: "DINNER",
            date: "2025-01-15",
            type: "DN",
            name_kr: "제육볶음",
            name_en: "Spicy Pork",
            price: 6000,
            etc: ["매운맛"],
            score: 4.2,
            review_cnt: 38,
            is_liked: true,
            like_cnt: 95,
          },
        ],
      },
      {
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        id: 2,
        code: "FACULTY",
        name_kr: "교직원식당",
        name_en: "Faculty Cafeteria",
        addr: "서울대학교 교직원식당",
        lat: 37.462,
        lng: 126.953,
        etc: {},
        menus: [
          {
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            id: 221329,
            restaurant_id: 2,
            code: "LUNCH",
            date: "2025-01-15",
            type: "LU",
            name_kr: "된장찌개",
            name_en: "Soybean Paste Stew",
            price: 7000,
            etc: ["국물요리"],
            score: 4.7,
            review_cnt: 56,
            is_liked: true,
            like_cnt: 142,
          },
        ],
      },
    ],
  };
};
