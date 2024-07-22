import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Post as PostType, Comment as CommentType, RawComment, RawPost } from "types";
import Board from "../../index";
import CommentList from "components/Community/CommentList";
import CommentWriter from "components/Community/CommentWriter";
import { useStateContext } from "hooks/ContextProvider";
import { formatPostCommentDate } from "utils/FormatUtil";
import PostImageSwiper from "components/Community/PostImageSwiper";
import MobileActionsModal, { ModalAction } from "components/Community/MobileActionsModal";
import { commentParser, postParser } from "utils/DataUtil";
import {
  deletePost,
  getCommentList,
  getPost,
  setPostLike,
  setPostUnlike,
} from "utils/api/community";
import UseAccessToken from "hooks/UseAccessToken";
import { ReportModal } from "components/Community/ReportModal";
import DeleteModal from "components/Community/DeleteModal";
import useModals from "hooks/UseModals";
import LoginModal from "components/Auth/LoginModal";

export default function Post() {
  const router = useRouter();
  const { boardId, postId } = router.query;
  const { loginStatus } = useStateContext();
  const { getAccessToken, checkAccessToken } = UseAccessToken();
  const { openModal, openLoginModal } = useModals();

  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [hasNextComments, setHasNextComments] = useState(false);

  const [isError, setIsError] = useState<boolean>(false);

  const fetchPost = () => {
    return checkAccessToken()
      .then((result: string | null) => getPost(Number(postId), result ?? undefined))
      .then((data) => setPost(postParser(data)))
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };

  const fetchComments = (size: number, page: number) => {
    return checkAccessToken()
      .then((result: string | null) =>
        getCommentList(Number(postId), result ?? undefined, size, page),
      )
      .then((data) => {
        const { result, hasNext } = data;
        setHasNextComments(hasNext);
        const newComments = result.map(commentParser);
        setComments((prev) => [...prev, ...newComments]);
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  };
  const addComment = (rawComment: RawComment) => {
    setComments((prev) => [...prev, commentParser(rawComment)]);
  };
  const deleteComment = (id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  const fetchLike = () => {
    if (!loginStatus) openLoginModal();
    else if (post) {
      const handleLikeAction = post.isLiked ? setPostUnlike : setPostLike;
      getAccessToken()
        .then((accessToken) => handleLikeAction(post.id, accessToken))
        .then(({ isLiked, likeCount }) => {
          setPost({
            ...post,
            isLiked: isLiked,
            likeCount: likeCount,
          });
        })
        .catch((e) => {
          console.error(e);
          setIsError(true);
        });
    }
  };

  const removePost = (postId: number) => {
    if (!loginStatus) openLoginModal();
    else
      openModal(DeleteModal, {
        type: "post",
        onClose: () => {},
        onSubmit: () =>
          getAccessToken()
            .then((accessToken) => deletePost(postId, accessToken))
            .then(() => router.push(`/community/boards/${boardId}`))
            .catch((e) => console.error(e)),
      });
  };

  const reportPost = (postId: number) => {
    if (!loginStatus) openLoginModal();
    else openModal(ReportModal, { type: "post", targetID: postId, onClose: () => {} });
  };

  const updatePost = (postId: number) => {
    router.push(`/community/write/?postId=${postId}`);
  };

  const onClickMoreActions = (actions: ModalAction[]) => {
    openModal(MobileActionsModal, { actions: actions, onClose: () => {} });
  };

  useEffect(() => {
    if (boardId && postId) {
      setComments((prev) => []);
      fetchPost();
      fetchComments(10, 1);
    }
  }, [boardId, postId]);

  if (post) {
    const likeButtonIcon = post.isLiked ? "/img/post-like-white.svg" : "/img/post-like.svg";
    const profileImg = "/img/default-profile.svg";

    const actions: ModalAction[] = post.isMine
      ? [
          {
            name: "수정",
            handleClick: () => updatePost(post.id),
          },
          {
            name: "삭제",
            handleClick: () => removePost(post.id),
          },
        ]
      : [
          {
            name: "신고",
            handleClick: () => reportPost(post.id),
          },
        ];

    return (
      <Board selectedBoardId={Number(boardId) ?? 1}>
        <Container>
          <Header>
            <WriterInfoContainer>
              <ProfileImage src={profileImg} />
              <div>
                <Nickname>{post.anonymous ? "익명" : post.nickname}</Nickname>
                <PostDate>
                  {formatPostCommentDate(post.updatedAt ? post.updatedAt : post.createdAt)}
                </PostDate>
              </div>
            </WriterInfoContainer>
            <DesktopPostActions>
              {actions.map((action) => (
                <DesktopActionButton key={action.name} onClick={action.handleClick}>
                  {action.name}
                </DesktopActionButton>
              ))}
            </DesktopPostActions>
            <MobileMoreActionsButton
              src="/img/etc.svg"
              onClick={() => onClickMoreActions(actions)}
            />
          </Header>
          <Content>
            <Title>{post.title}</Title>
            <Text>{post.content}</Text>
            {post.images && <PostImageSwiper images={post.images} />}
          </Content>
          <LikesAndComments>
            <Likes>
              <Icon src="/img/post-like.svg" />
              {post.likeCount}
            </Likes>
            <Comments>
              <Icon src="/img/post-comment.svg" />
              {post.commentCount}
            </Comments>
          </LikesAndComments>
          <Footer>
            <LikeButton onClick={fetchLike} isLiked={post.isLiked}>
              <LikeButtonIcon src={likeButtonIcon} isLiked={post.isLiked} />
              공감
            </LikeButton>
            <BackToBoardButton
              onClick={() => {
                router.push(`/community/boards/${boardId}`);
              }}
            >
              <FooterIcon src="/img/posts-orange.svg" />
              목록보기
            </BackToBoardButton>
          </Footer>
          <CommentContainer>
            <CommentList
              comments={comments}
              update={deleteComment}
              fetch={fetchComments}
              hasNext={hasNextComments}
            />
            <CommentWriter postId={post.id} update={addComment} />
          </CommentContainer>
        </Container>
      </Board>
    );
  } else {
    return (
      <Board selectedBoardId={Number(boardId) ?? 1}>
        <Container>{isError ? "포스트를 찾을 수 없어요" : ""}</Container>
      </Board>
    );
  }
}

const Container = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    padding-top: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const WriterInfoContainer = styled.div`
  display: flex;
  & > div {
    margin-left: 12px;
  }
`;
const ProfileImage = styled.img`
  width: 43px;
  height: 43px;
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;
const Nickname = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 5px;
  @media (max-width: 768px) {
    font-weight: 700;
    font-size: 11px;
    line-height: 12.5px;
  }
`;
const PostDate = styled.div`
  color: #b7b7b7;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 11.3px;
  }
`;
const DesktopPostActions = styled.div`
  display: flex;
  margin: 0;
  padding: 0;

  & div {
    margin: 0 8px;
  }
  & div:first-child {
    margin-left: 0;
  }
  & div:last-child {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const DesktopActionButton = styled.div`
  background-color: transparent;
  border: none;
  padding: 0;

  color: #b7b7b7;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`;
const MobileMoreActionsButton = styled.img`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const Content = styled.div`
  margin-bottom: 15.5px;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 12px;
  }
`;
const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Photos = styled.div``;
const Photo = styled.img`
  width: 100%;
`;

const LikesAndComments = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  margin-bottom: 23px;
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

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 17.7px;
  border-bottom: 1px solid #eeeeee;
  @media (max-width: 768px) {
    border-color: #f0f0f0;
    padding-bottom: 12.5px;
  }
`;
const FooterButton = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid #ff9522;
  border-radius: 8px;
  background-color: #ffffff;
  color: #ff9522;
  font-weight: 700;
  font-size: 13px;
  line-height: 14.75px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 11.35px;
    border-radius: 6px;
  }
`;
const LikeButton = styled(FooterButton)<{ isLiked?: boolean | null }>`
  padding: 8.5px 12.4px;
  background-color: ${(props) => (props.isLiked ? "#ff9522" : "#fff")};
  border-color: ${(props) => (props.isLiked ? "#fff" : "#ff9522")};
  color: ${(props) => (props.isLiked ? "#fff" : "#ff9522")};
  @media (max-width: 768px) {
    padding: 6.5px 8.25px;
  }
`;
const BackToBoardButton = styled(FooterButton)`
  padding: 8.5px 10.5px;
  @media (max-width: 768px) {
    padding: 6.5px 8.25px;
  }
`;
const FooterIcon = styled.img`
  width: 13px;
  height: 12.5px;
  margin-right: 4px;
  @media (max-width: 768px) {
    width: 11.5px;
    height: 11px;
  }
`;
const LikeButtonIcon = styled(FooterIcon)<{ isLiked?: boolean | null }>`
  background-color: ${(props) => (props.isLiked ? "#ff9522" : "#fff")};
`;

const CommentContainer = styled.div``;
