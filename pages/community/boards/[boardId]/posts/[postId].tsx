import { Router, useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import APIendpoint from "../../../../../constants/constants";
import {
  Post as PostType,
  Comment as CommentType,
  RawComment,
  RawPost,
} from "../../../../../types";
import Board from "../../index";
import CommentList from "../../../../../components/Community/CommentList";
import CommentWriter from "../../../../../components/Community/CommentWriter";
import { useDispatchContext, useStateContext } from "../../../../../hooks/ContextProvider";
import { formatPostCommentDate } from "../../../../../utils/FormatUtil";

export default function Post() {
  const router = useRouter();
  const { boardId, postId } = router.query;
  const { userInfo, loginStatus } = useStateContext();
  const dispatch = useDispatchContext();

  const [post, setPost] = useState<PostType | null>(null);
  // TODO: comment pagenation 어떻게 할지?
  const [comments, setComments] = useState<CommentType[]>([]);

  const [isError, setIsError] = useState<boolean>(false);

  async function fetchPost() {
    const apiUrl = loginStatus
      ? `${APIendpoint()}/community/posts/${postId}`
      : `${APIendpoint()}/community/posts/${postId}/web`;
    const config = loginStatus
      ? { headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` } }
      : {};

    try {
      await axios.get(apiUrl, config).then((res) => {
        update(res.data);
      });
    } catch (e) {
      console.error(e);
      setIsError(true);
    }

    function update(post: RawPost) {
      const {
        board_id,
        id,
        title,
        content,
        created_at,
        updated_at,
        nickname,
        anonymous,
        available,
        is_mine,
        etc,
        like_cnt,
        comment_cnt,
        is_liked,
      } = post;
      setPost({
        boardId: board_id,
        id: id,
        title: title,
        content: content,
        createdAt: created_at,
        updatedAt: updated_at,
        nickname: nickname,
        anonymous: anonymous,
        available: available,
        isMine: is_mine,
        images: etc ? etc.images : etc,
        likeCount: like_cnt,
        commentCount: comment_cnt,
        isLiked: is_liked,
      });
    }
  }
  async function fetchComments() {
    const apiUrl = loginStatus
      ? `${APIendpoint()}/community/comments?post_id=${postId}&per_page=100`
      : `${APIendpoint()}/community/comments/web?post_id=${postId}&per_page=100`;
    const config = loginStatus
      ? { headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` } }
      : {};

    try {
      await axios.get(apiUrl, config).then((res) => {
        // state 갱신이 n번씩 발생... 고칠 순 없을까?
        setComments([]);
        res.data.result.map(update);
        console.log(res.data);
      });
    } catch (e) {
      console.error(e);
      setIsError(true);
    }

    function update(comment: RawComment) {
      const {
        post_id,
        content,
        created_at,
        updated_at,
        id,
        nickname,
        avaliable,
        anonymous,
        is_mine,
        is_liked,
        like_cnt,
      } = comment;
      setComments((prev) => [
        ...prev,
        {
          postId: post_id,
          content: content,
          createdAt: created_at,
          updatedAt: updated_at,
          id: id,
          nickname: nickname,
          avaliable: avaliable,
          anonymous: anonymous,
          isMine: is_mine,
          likeCount: like_cnt,
          isLiked: is_liked,
        },
      ]);
    }
  }
  async function fetchLike() {
    if (!userInfo.id) {
      dispatch({ type: "SET_LOGINMODAL", isLoginModal: true });
    } else if (post) {
      const apiUrl = post.isLiked
        ? `${APIendpoint()}/community/posts/${post.id}/unlike`
        : `${APIendpoint()}/community/posts/${post.id}/like`;
      try {
        await axios
          .post(
            apiUrl,
            {},
            {
              headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
            },
          )
          .then((res) => setPost({ ...post, isLiked: res.data.is_liked, likeCount: res.data.like_cnt }));
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
    }
  }

  async function deletePost(postId: number) {
    if (!userInfo.id) {
      dispatch({ type: "SET_LOGINMODAL", isLoginModal: true });
    } else if (confirm("이 글을 삭제하시겠습니까?")) {
      try {
        await axios
          .delete(
            `${APIendpoint()}/community/posts/${postId}`,
            {
              headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
            },
          )
          .then(() => router.push(`/community/boards/${boardId}`));
      } catch (e) {
        console.error(e);
      }
    }
  }

  useEffect(() => {
    if (boardId && postId) {
      fetchPost();
      fetchComments();
    }
  }, [boardId, postId]);

  if (post) {
    const likeButtonIcon = post.isLiked ? "/img/post-like-white.svg" : "/img/post-like.svg";
    const profileImg = "/img/default-profile.svg";

    return (
      <Board selectedBoardId={Number(boardId) ?? 1}>
        <Container>
          <Header>
            <WriterInfoContainer>
              <ProfileImage src={profileImg}/>
              <div>
                <Nickname>{post.anonymous ? "익명" : post.nickname}</Nickname>
                <PostDate>
                  {formatPostCommentDate(post.updatedAt ? post.updatedAt : post.createdAt)}
                </PostDate>
              </div>
            </WriterInfoContainer>
            <DesktopCommentActions>
              {post.isMine && (
                <>
                  <DesktopActionButton onClick={(e) => {}}>수정</DesktopActionButton>
                  <DesktopActionButton onClick={(e) => deletePost(post.id)}>삭제</DesktopActionButton>
                </>
              )}
              <DesktopActionButton onClick={(e) => {}}>신고</DesktopActionButton>
            </DesktopCommentActions>
          </Header>
          <Content>
            <Title>{post.title}</Title>
            <Text>{post.content}</Text>
            {/* TODO: 사진 부분 캐러셀로 바꾸기 */}
            <Photos>{post.images ? post.images.map((src) => <Photo src={src} />) : null}</Photos>
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
              <LikeButtonIcon src={likeButtonIcon} isLiked={post.isLiked}/>
              공감
            </LikeButton>
            <BackToBoardButton onClick={()=>{router.push(`/community/boards/${boardId}`);}}>
              <FooterIcon src="/img/posts-orange.svg" />
              목록보기
            </BackToBoardButton>
          </Footer>
          <HLine />
          <CommentContainer>
            <CommentList comments={comments} refetch={fetchComments} />
            <CommentWriter postId={post.id} refetch={fetchComments} />
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
`;
const Nickname = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 5px;
`;
const PostDate = styled.div`
  color: #b7b7b7;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;
const DesktopCommentActions = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;

  & li {
    margin: 0 8px;
  }
  & li:first-child {
    margin-left: 0;
  }
  & li:last-child {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const DesktopActionButton = styled.li`
  background-color: transparent;
  border: none;
  padding: 0;

  color: #b7b7b7;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`;
const Content = styled.div`
  margin-bottom: 15.5px;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 30px;
`;
const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 20px;
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
  margin-bottom: 17.7px;
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
`;
const LikeButton = styled(FooterButton)<{isLiked?: boolean | null}>`
  padding: 8.5px 12.4px;
  background-color: ${props => props.isLiked ? '#ff9522' : '#fff'};
  border-color: ${props => props.isLiked ? '#fff' : '#ff9522'};
  color: ${props => props.isLiked ? '#fff' : '#ff9522'};
`;
const BackToBoardButton = styled(FooterButton)`
  padding: 8.5px 10.5px;
`;
const FooterIcon = styled.img`
  width: 13px;
  height: 12.5px;
  margin-right: 4px;
`;
const LikeButtonIcon = styled(FooterIcon)<{isLiked?: boolean | null}>`
  background-color: ${props => props.isLiked ? '#ff9522' : '#fff'};
`
const HLine = styled.div`
  height: 1px;
  background: #eeeeee;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    background: #f0f0f0;
  }
`;

const CommentContainer = styled.div``;
