import Link from "next/link";
import styled from "styled-components";

export function BoardHeader() {
  return (
    <Container>
      <HotPost>
        <Text>
          <Title> 제목 </Title>
          <ContentPreview> 본문 본문 본문 </ContentPreview>
        </Text>
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
  height: 43px;
`;

const HotPost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 573px;
  height: 100%;
  background-color: #ff952233;
  padding: 15px 17px;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
`;

// 글자가 padding 밖으로 빠져나가는 이슈
const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-right: 12px;
  overflow: hidden;
`;
const ContentPreview = styled.div`
  color: #393939;
  overflow: hidden;
`;
const Likes = styled.div`
  color: #ff9522;
`;
const Icon = styled.img`
  margin-right: 4px;
`;
const WriteButton = styled.button`
  margin-left: 27px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
const ButtonImg = styled.img``;
