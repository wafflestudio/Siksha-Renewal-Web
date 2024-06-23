import styled from "styled-components";
import { Post as PostType } from "../../types";
import Link from "next/link";

interface PropsPost {
  post: PostType;
}

export function Post({ post }: PropsPost) {
  const { boardId, id, title, content, likeCount, commentCount, images } = post;

  return (
    <Link href={`/community/boards/${boardId}/posts/${id}`}>
      <Container>
        <Info>
          <Title>{title}</Title>
          <ContentPreview>{content}</ContentPreview>
          <LikesAndComments>
            <Likes>
              <Icon src="/img/post-like.svg" />
              {likeCount}
            </Likes>
            <Comments>
              <Icon src="/img/post-comment.svg" />
              {commentCount}
            </Comments>
          </LikesAndComments>
        </Info>
        <PhotoZone>
          {images ? images.map((src, idx) => (idx < 1 ? <Photo src={src} /> : null)) : null}
        </PhotoZone>
      </Container>
    </Link>
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

const Title = styled.div`
  overflow: hidden;
  font-size: 18px;
  font-weight: bold;
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
const PhotoZone = styled.div`
  display: flex;
  gap: 5px;
`;

const Photo = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 8px;
  background-color: #d9d9d9;
`;
