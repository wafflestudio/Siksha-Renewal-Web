export default function APIendpoint() {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
    return `https://siksha-api.wafflestudio.com`;
  }
  return `https://siksha-api-dev.wafflestudio.com`;
}

// 백 연결하기 전 가짜 데이터
export const boards = [
  {
    id: 0,
    name: "자유게시판",
  },
  {
    id: 1,
    name: "리뷰게시판",
  },
];

export const posts = [
  {
    title: "제목",
    content: "본문 본문",
    likes: 12,
    comments: 13,
  },
  {
    title: "제목 제목",
    content: "본문 본문 본문 본문",
    likes: 12,
    comments: 13,
  },
  {
    title: "제목 제목 제목",
    content: "본문 본문 본문 본문 본문",
    likes: 0,
    comments: 13,
  },
];
