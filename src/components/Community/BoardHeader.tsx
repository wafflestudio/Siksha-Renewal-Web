import { useDispatchContext, useStateContext } from "hooks/ContextProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export function BoardHeader() {
  const { userInfo } = useStateContext();
  const { setLoginModal } = useDispatchContext();
  const router = useRouter();
  
  function handleClickWriteButton() {
    if (!userInfo.id) {
      setLoginModal(true);
      return;
    }
    router.push("/community/write");
  }

  return (
    <Container>
      <HotPost>
        {/* <Text> */}
        <Title>
          {" "}
          제목
          제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
        </Title>
        <ContentPreview>
          {" "}
          본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문본문 본문 본문본문 본문
          본문본문 본문 본문본문 본문 본문본문 본문 본문본문 본문 본문본문 본문 본문본문 본문
          본문본문 본문 본문본문 본문 본문본문 본문 본문
        </ContentPreview>
        {/* </Text> */}
        <Likes>
          <Icon src="/img/post-like.svg" />
          12
        </Likes>
      </HotPost>
      <WriteButton>
        <ButtonImg onClick={handleClickWriteButton} src={"/img/write-post-button.svg"} />
      </WriteButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const HotPost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: min(100% - 56px, 573px);
  height: 100%;
  background-color: #ff952233;
  padding: 15px 17px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 15px;
    border-radius: 12px;
    font-size: 12px;
  }
`;

const Title = styled.div`
  width: 100%;
  font-weight: bold;
  margin-right: 14px;
  white-space: nowrap;
  overflow: hidden;
`;
const ContentPreview = styled.div`
  width: 100%;
  color: #393939;
  overflow: hidden;
  margin-right: 14px;
  white-space: nowrap;
`;
const Likes = styled.div`
  display: flex;
  color: #ff9522;
  font-size: 12px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
const Icon = styled.img`
  margin-right: 4px;
  @media (max-width: 768px) {
    width: 11.5px;
    height: 11px;
  }
`;
const WriteButton = styled.button`
  margin: 0;
  padding: 0;
  margin-right: 20px;
  background: transparent;
  border: none;
  outline: none;
  z-index: 1;
  cursor: pointer;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 100px;
    right: 29px;
  }
`;
const ButtonImg = styled.img``;
