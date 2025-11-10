import { useEffect, useState } from "react";
import styled from "styled-components";
import { setMenuLike, setMenuUnlike } from "utils/api/menus";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import useLikedMenus from "hooks/UseLikedMenus";
import HeartSvg from "assets/icons/heart.svg";

export default function Likes({ menu }) {
  const [isLiked, setIsLiked] = useState<boolean>(menu?.is_liked);
  const [likeCount, setLikeCount] = useState<number>(menu.like_cnt);

  const { authStatus, getAccessToken } = useAuth();
  const { addLikedMenu, removeLikedMenu } = useLikedMenus();

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
          // Update local storage
          if (isLiked) {
            addLikedMenu(menu.id);
          } else {
            removeLikedMenu(menu.id);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  return (
    <Container>
      <StyledLikeIcon
        $isLiked={isLiked}
        onClick={(e) => {
          onClickLike();
          e.stopPropagation();
        }}
      />
      <LikesText>{likeCount}</LikesText>
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

const StyledLikeIcon = styled(HeartSvg)<{ $isLiked: boolean }>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: ${(props) =>
    props.$isLiked
      ? "var(--Color-Accent-like, #f86627)"
      : "var(--SemanticColor-Icon-Like, var(--Color-Foundation-gray-200, #e5e6e9))"};
  @media (max-width: 768px) {
  }
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
    ::before {
      content: "찜 ";
    }

    ::after {
      content: "개";
    }
  }
`;
