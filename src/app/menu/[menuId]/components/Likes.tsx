import { useStateContext } from "providers/ContextProvider";
import { useState } from "react";
import styled from "styled-components";
import { setMenuLike, setMenuUnlike } from "utils/api/menus";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import Image from "next/image";

export default function Likes({ menu }) {
  const [isLiked, setIsLiked] = useState<boolean>(menu?.is_liked);
  const [likeCount, setLikeCount] = useState<number>(menu.like_cnt);

  const isLikedImg = isLiked ? "/img/general/heart-on.svg" : "/img/general/heart-off.svg";

  const state = useStateContext();
  const { authStatus, getAccessToken } = useAuth();

  const { openLoginModal } = useModals();

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
      <HeartIcon
        src={isLikedImg}
        onClick={(e) => {
          onClickLike();
          e.stopPropagation();
        }}
        alt="좋아요"
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

const HeartIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  @media (max-width: 768px) {
  }
`;

const LikesText = styled.div`
  color: var(--Color-Foundation-gray-600, #989AA0);
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
      content: "개"
    }
  }
`;
