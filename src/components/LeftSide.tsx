import styled from "styled-components";
import RestaurantList from "./RestaurantList";
import Image from "next/image";
import { useStateContext } from "hooks/ContextProvider";
import useModals from "hooks/UseModals";
import { useRouter } from "next/router";
import DesktopCalendar from "./DesktopCalendar";

export default function LeftSide() {
  const router = useRouter();
  const state = useStateContext();

  const { loginStatus } = state;
  const { openLoginModal } = useModals();

  function onClickMyPostsButton() {
    if (!loginStatus) openLoginModal();
    else router.push(`/account/mypost`);
  }

  function onClickWriteButton() {
    if (!loginStatus) openLoginModal();
    else router.push(`/community/write`);
  }

  return (
    <Container>
      <DesktopCalendar />
      <div style={{ marginTop: "35px" }}>
        <RestaurantList />
      </div>
      <div style={{ marginTop: "32px", marginBottom: "69px" }}>
        <MyPostsButton onClick={onClickMyPostsButton}>
          <Image
            src="/img/posts.svg"
            alt="글 목록 이미지"
            width="16"
            height="12"
            style={{ marginRight: "10px" }}
          />
          내가 쓴 글
        </MyPostsButton>
        <WritePostButton onClick={onClickWriteButton}>
          <Image
            src="/img/posts-white.svg"
            alt="글 목록 이미지"
            width="16"
            height="12"
            style={{ marginRight: "10px" }}
          />
          게시판 글쓰기
        </WritePostButton>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-right: 18px;
  height: fit-content;
  box-sizing: border-box;
  min-width: 400px;
  max-width: 563px;
  flex-grow: 1;
`;

const Line = styled.div`
  width: 100%;
  height: 30px;
  background: #f8f8f8;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  font-family: NanumSquare;
  font-weight: 700;
  font-size: 18px;
  width: calc((100% - 35px) / 2);
  cursor: pointer;
`;

const MyPostsButton = styled(Button)`
  background-color: white;
  color: #575757;
  margin-right: 35px;
`;

const WritePostButton = styled(Button)`
  background-color: #ff9522;
  color: white;
`;
