import styled from "styled-components";

interface PropsPost {
  post: {
    title: string;
    content: string;
    likes: number;
    comments: number;
  };
}

export function Post({ post }: PropsPost) {
  const { title, content, likes, comments } = post;

  return (
    <Container>
      <Info>
        <Title>{title}</Title>
        <ContentPreview>{content}</ContentPreview>
        <LikesAndComments>
          <Likes>
            <Icon src="/img/post-like.svg" />
            {likes}
          </Likes>
          <Comments>
            <Icon src="/img/post-comment.svg" />
            {comments}
          </Comments>
        </LikesAndComments>
      </Info>
      <Photo src="/img/file-big.svg" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  border-top: 1px solid #eeeeee;
  margin-top: 16px;
  padding: 19px 7px 0px 17px;
  box-sizing: border-box;
  cursor: pointer;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 540px;
`;

// title, content가 잘리는 이슈 -> padding 값을 설정했는데 왜이러지?
const Title = styled.div`
  overflow: hidden;
  font-size: 18px;
  font-weight: bold;
  /* white-space: nowrap; */
`;
const ContentPreview = styled.div`
  color: #393939;
  overflow: hidden;
`;
const LikesAndComments = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
`;

// 아이콘이 정렬이 안되는 이슈 -> display flex와 align items를 하니까 위에 title, content가 잘리던 이슈도 해결됨 -> 왜?
const Likes = styled.div`
  display: flex;
  align-items: center;
  color: #ff9522;
`;
const Comments = styled.div`
  display: flex;
  align-items: center;
  color: #797979;
`;
const Icon = styled.img`
  margin-right: 4px;
`;
const Photo = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 8px;
  background-color: #d9d9d9;
`;
