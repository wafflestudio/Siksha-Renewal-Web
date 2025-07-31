import styled from "styled-components";
import { formatPrice } from "../../utils/FormatUtil";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setMenuLike, setMenuUnlike } from "utils/api/menus";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import { RawMenu } from "types";
import HeartIcon from "assets/icons/heart.svg";
import CommentIcon from "assets/icons/comment.svg";
import DotsIcon from "assets/icons/dots.svg";
import NoMeatIcon from "assets/icons/no-meat.svg";

export default function Menu({ menu }: { menu: RawMenu }) {
  const [hasPrice, setHasPrice] = useState(true);
  const [score, setScore] = useState<"high" | "middle" | "low" | null>(null);
  const [isLiked, setIsLiked] = useState(menu?.is_liked);
  const [likeCount, setLikeCount] = useState(menu.like_cnt);
  const reviewCount = menu.review_cnt;

  const router = useRouter();

  const { authStatus, getAccessToken } = useAuth();
  const { openLoginModal } = useModals();

  const getScoreLevel = (score: number): "high" | "middle" | "low" => {
    if (score >= 4) return "high";
    if (score > 3) return "middle";
    return "low";
  };

  useEffect(() => {
    setIsLiked(menu?.is_liked);
    setLikeCount(menu.like_cnt);
    setHasPrice(!!menu.price);
    setScore(menu.score ? getScoreLevel(menu.score) : null);
  }, [menu]);

  const isLikedToggle = async () => {
    if (authStatus === "logout") openLoginModal();
    else {
      const handleLikeAction = isLiked ? setMenuUnlike : setMenuLike;

      return getAccessToken()
        .then((accessToken) => handleLikeAction(menu.id, accessToken))
        .then(({ isLiked, likeCount }) => {
          setIsLiked(isLiked);
          setLikeCount(likeCount);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container
      onClick={() => {
        router.push(`/menu/${menu.id}`);
      }}
    >
      <MenuName>
        {menu.name_kr}
        {menu.etc && menu.etc.find((e) => e == "No meat") && (
          <StyledNoMeatIcon aria-label="채식 메뉴" />
        )}
      </MenuName>
      <StyledDotsIcon />
      <MenuInfo>
        <Price hasPrice={hasPrice}>{menu.price ? formatPrice(menu.price) : "-"}</Price>
        {score ? <Rate>{menu.score.toFixed(1)}</Rate> : <Rate>{"-"}</Rate>}
        <CountBox>
          <StyledLikeIcon
            $isliked={isLiked}
            aria-label="좋아요"
            onClick={(e) => {
              isLikedToggle();
              e.stopPropagation();
            }}
          />
          <CountText disableWith={900}>{likeCount}</CountText>
        </CountBox>
        <ReviewBox>
          {/*리뷰여부에 따라 comment-on을 사용해야하나 현재 api에서 한번에 안내려옴*/}
          <StyledCommentIcon $isliked={false} aria-label="댓글" />
          <CountText disableWith={768}>{reviewCount}</CountText>
        </ReviewBox>
      </MenuInfo>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  align-items: flex-start;

  @media (pointer: fine) {
    &:hover {
      background: var(--Color-Foundation-gray-100);
    }
  }

  @media (min-width: 769px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    align-items: center;
    margin-bottom: 12px;
  }
`;

const MenuName = styled.div`
  display: flex;
  color: var(--Color-Foundation-gray-900);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  flex-grow: 1;

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black);
    font-size: 14px;
    line-height: 140%;
    font-weight: 400;
  }
`;

const MenuInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    height: 24px;
    gap: 16px;
  }
`;

const StyledDotsIcon = styled(DotsIcon)`
  width: 40px;
  height: 22px;
  color: var(--Color-Foundation-gray-500);
  @media (max-width: 1200px) {
    display: none;
  }
`;

const Price = styled.div<{ hasPrice: boolean }>`
  display: flex;
  justify-content: center;
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  width: 58px;

  color: var(--Color-Foundation-gray-900, #262728);
  text-align: center;

  /* text-14/Regular */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 21px */

  @media (max-width: 768px) {
    width: fit-content;
    min-width: 28px;

    display: flex;
    justify-content: ${(props) => (props.hasPrice ? "flex-end" : "center")};

    color: var(--Color-Foundation-base-black, #000);
    text-align: center;

    /* text-14/Regular */
    font-family: var(--Font-family-sans, NanumSquareOTF);
    font-size: var(--Font-size-14, 14px);
    font-style: normal;
    font-weight: var(--Font-weight-regular, 400);
    line-height: 150%; /* 21px */
  }
`;

const Rate = styled.div`
  display: flex;
  justify-content: center;
  width: 58px;
  height: 21px;
  font-weight: 400;
  font-size: 14px;

  @media (min-width: 769px) {
    color: var(--Color-Foundation-gray-900, #262728);
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.3px;
  }

  @media (min-width: 769px) and (max-width: 901px) {
    display: none;
  }

  @media (max-width: 768px) {
    width: 23px;

    color: var(--Color-Foundation-base-black, #000);
    text-align: center;

    /* text-14/Regular */
    font-family: var(--Font-family-sans, NanumSquareOTF);
    font-size: var(--Font-size-14, 14px);
    font-style: normal;
    font-weight: var(--Font-weight-regular, 400);
    line-height: 150%; /* 21px */
  }
`;

const StyledNoMeatIcon = styled(NoMeatIcon)`
  width: 19px;
  padding-bottom: 2px;
  color: #b0b0b0; // 아이콘 자체에 마스킹 처리되는 부분이 흰색으로 표현됨.

  @media (max-width: 768px) {
    padding-left: 5px;
    padding-bottom: 0;
  }
`;

const CountBox = styled.div`
  @media (min-width: 769px) {
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  @media (min-width: 901px) {
    width: 58px;
  }
`;

const ReviewBox = styled(CountBox)`
  @media (max-width: 1000px) {
    display: none;
  }
`;

const StyledLikeIcon = styled(HeartIcon)<{ $isliked: boolean }>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 0;
  color: ${({ $isliked }) =>
    $isliked ? "var(--Color-Accent-like)" : "var(--SemanticColor-Icon-Like)"};
`;

const StyledCommentIcon = styled(CommentIcon)<{ $isliked: boolean }>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 0;
  color: ${({ $isliked }) =>
    $isliked ? "var(--Color-Accent-like)" : "var(--SemanticColor-Icon-Like)"};
`;

const CountText = styled.div<{ disableWith: number }>`
  font-size: 15px;
  line-height: 17px;
  font-weight: 400;
  color: var(--Color-Foundation-gray-500);

  color: var(--Color-Foundation-gray-700, #727478);
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 21px */

  @media (${(props) => `(max-width: ${props.disableWith}px)`}) {
    display: none;
  }
`;
