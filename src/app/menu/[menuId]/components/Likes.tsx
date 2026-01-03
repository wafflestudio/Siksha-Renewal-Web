import { useStateContext } from "providers/ContextProvider";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { setMenuLike, setMenuUnlike } from "utils/api/menus";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import HeartIcon from "assets/icons/heart.svg";
import useIsMobile from "hooks/UseIsMobile";

export default function Likes({ menu }) {
  const [isLiked, setIsLiked] = useState<boolean>(menu?.is_liked);
  const [likeCount, setLikeCount] = useState<number>(menu.like_cnt);
  const isMobile = useIsMobile();

  const state = useStateContext();
  const { authStatus, getAccessToken } = useAuth();

  const { openLoginModal } = useModals();

  // Sync isLiked state when menu.is_liked changes (e.g., on refresh)
  useEffect(() => {
    setIsLiked(menu?.is_liked);
  }, [menu?.is_liked]);

  const onClickLike = async () => {
    if (authStatus === "logout") openLoginModal();
    else {
      const handleLikeAction = isLiked ? setMenuUnlike : setMenuLike;

      return getAccessToken()
        .then((accessToken) => handleLikeAction(menu.id, accessToken))
        .then(({ isLiked, likeCount }) => {
          setIsLiked(isLiked);
          setLikeCount(likeCount);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  return (
    <Container>
      <StyledLikeIcon
        $isliked={isLiked}
        aria-label="좋아요"
        onClick={(e) => {
          onClickLike();
          e.stopPropagation();
        }}
      />
      {isMobile ? <LikesText>찜 {likeCount}개</LikesText> : <LikesText>{likeCount}</LikesText>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
  }
`;

const StyledLikeIcon = styled(HeartIcon)<{ $isliked: boolean }>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: ${({ $isliked }) =>
    $isliked ? "var(--Color-Accent-like)" : "var(--SemanticColor-Icon-Like)"};
`;

const LikesText = styled.div`
  color: var(--Color-Foundation-gray-600, #989aa0);
  text-align: center;

  /* text-13/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-13, 13px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 18.2px */

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);
    text-align: center;

    /* text-13/Bold */
    font-family: var(--Font-family-sans, NanumSquare);
    font-size: var(--Font-size-13, 13px);
    font-style: normal;
    font-weight: var(--Font-weight-bold, 700);
    line-height: 140%; /* 18.2px */
  }
`;
