import Link from "next/link";
import styled from "styled-components";

export function BoardHeader() {
  return (
    <Container>
      <HotPost>
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
        <Likes>
          <Icon src="/img/post-like.svg" />
          12
        </Likes>
      </HotPost>
      <WriteButton>
        <Link href="/community/write">
          <ButtonImg src={"/img/write-post-button.svg"} />
        </Link>
      </WriteButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 43px;
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
  color: #ff9522;
  font-size: 12px;
`;
const Icon = styled.img`
  margin-right: 4px;
`;
const WriteButton = styled.button`
  /* margin-left: 27px; */
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
const ButtonImg = styled.img``;
