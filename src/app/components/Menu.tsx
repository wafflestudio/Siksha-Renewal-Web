import styled from "styled-components";
import { formatPrice } from "../../utils/FormatUtil";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setMenuLike, setMenuUnlike } from "utils/api/menus";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import { RawMenu } from "types";

export default function Menu({ menu }: { menu: RawMenu }) {
  const [hasPrice, setHasPrice] = useState(true);
  const [score, setScore] = useState<"high" | "middle" | "low" | null>(null);
  const [isLiked, setIsLiked] = useState(menu?.is_liked);
  const [likeCount, setLikeCount] = useState(menu.like_cnt);
  const reviewCount = menu.review_cnt;

  const isLikedImg = isLiked ? "/img/general/heart-on.svg" : "/img/general/heart-off.svg";
  const isReviewedImg = "/img/general/comment-off.svg"; //리뷰여부에 따라 comment-on을 사용해야하나 현재 api에서 한번에 안내려옴
  const router = useRouter();

  const { authStatus, getAccessToken } = useAuth();
  const { openLoginModal } = useModals();

  useEffect(() => {
    setIsLiked(menu?.is_liked);
  }, [menu?.is_liked]);

  useEffect(() => {
    setLikeCount(menu.like_cnt);
  }, [menu.like_cnt]);

  useEffect(() => {
    if (!menu.price) setHasPrice(false);
  }, [menu.price]);

  useEffect(() => {
    if (menu.score) {
      if (menu.score >= 4) setScore("high");
      else if (menu.score > 3) setScore("middle");
      else setScore("low");
    }
  }, [menu.score]);

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
          <NoMeat src={"/img/no-meat.svg"} alt="채식 메뉴" />
        )}
      </MenuName>
      <Dots src={"/img/dots.svg"} />
      <MenuInfo>
        <Price hasPrice={hasPrice}>{menu.price ? formatPrice(menu.price) : "-"}</Price>
        {score ? <Rate>{menu.score.toFixed(1)}</Rate> : <Rate>{"-"}</Rate>}
        <CountBox>
          <CountIcon
            src={isLikedImg}
            onClick={(e) => {
              isLikedToggle();
              e.stopPropagation();
            }}
            alt="좋아요"
          />
          <CountText disableWith={900}>{likeCount}</CountText>
        </CountBox>
        <ReviewBox>
          <CountIcon src={isReviewedImg} alt="댓글" />
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
      background: #f5f5f5;
    }
  }

  @media (min-width: 769px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    padding: 0 0 10px 0;
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
    color: black;
    font-size: 14px;
    line-height: 21px;
    padding-right: 7px;
    padding-top: 2px;
    font-weight: 400;
  }
`;

const MenuInfo = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 769px) {
    gap: 6px;
  }
`;

const Dots = styled.img`
  width: 40px;
  height: 22px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  width: 58px;

  @media (min-width: 769px) {
    color: var(--Color-Foundation-gray-900);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.3px;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: ${(props: { hasPrice: boolean }) => (props.hasPrice ? "flex-end" : "center")};
    font-size: 14px;
    line-height: 16px;
    width: 45px;
    padding-right: 12px;
    padding-top: 1px;
    font-weight: 400;
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
    line-height: 16px;
    width: 42px;
    height: 17.5px;
  }
`;

const NoMeat = styled.img`
  width: 19px;
  padding-bottom: 2px;

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

const CountIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 0;

  @media (max-width: 768px) {
    padding-left: 12px;
    width: 18px;
    height: 18px;
  }
`;

const CountText = styled.div<{ disableWith: number }>`
  font-size: 15px;
  line-height: 17px;
  font-weight: 400;
  color: #b7b7b7;

  color: var(--Color-Foundation-gray-700, #727478);
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 21px */

  @media (${(props) => `(max-width: ${props.disableWith}px)`}) {
    display: none;
  }
`;
