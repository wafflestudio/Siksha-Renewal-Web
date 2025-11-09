"use client";

import styled from "styled-components";
import { useState, memo, useCallback } from "react";
import { LoadingAnimation } from "styles/globalstyle";
import { sanitizeCssSelector } from "utils/FormatUtil";
import { formatPrice } from "utils/FormatUtil";
import useFavorite from "hooks/UseFavorite";

type LikedMenu = {
  id: number;
  name_kr: string;
  price: number;
  score: number;
  etc?: string[];
};

type Data = {
  id: number;
  code: string;
  name_kr: string;
  menus: LikedMenu[];
};

interface LikedMenuCardProps {
  data: Data;
  onUnlikeMenu: (menuId: number) => void;
}

// Wrap component in React.memo to prevent unnecessary re-renders
const LikedMenuCard = memo(function LikedMenuCard({ data, onUnlikeMenu }: LikedMenuCardProps) {
  const [unlikedMenuIds, setUnlikedMenuIds] = useState<Set<number>>(new Set());
  const { toggleFavorite, isFavorite } = useFavorite();

  // Memoize callback to prevent recreation on every render
  const handleUnlikeClick = useCallback(
    (e: React.MouseEvent, menuId: number) => {
      e.stopPropagation();
      // Mark as unliked in local state (grayed out)
      setUnlikedMenuIds((prev) => new Set(prev).add(menuId));
      // Call the API to unlike
      onUnlikeMenu(menuId);
    },
    [onUnlikeMenu],
  );

  // Memoize toggle favorite callback
  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(data.id);
  }, [toggleFavorite, data.id]);

  return (
    <Container className={"a" + sanitizeCssSelector(data.code)}>
      <HeaderContainer>
        <TitleContainer>
          <Name>{data.name_kr}</Name>
          <StarIcon
            src={isFavorite(data.id) ? "/img/general/star-on.svg" : "/img/general/star-off-24.svg"}
            onClick={handleToggleFavorite}
            alt={isFavorite(data.id) ? "즐겨찾기" : "즐겨찾기 해제"}
          />
        </TitleContainer>
        <InfoContainer>
          <HeaderDataList>
            <HeaderDataText>Price</HeaderDataText>
            <HeaderDataText>Rate</HeaderDataText>
            <HeaderDataText>Like</HeaderDataText>
          </HeaderDataList>
        </InfoContainer>
      </HeaderContainer>
      <HLine />
      <MenusContainer>
        {data.menus.map((menu) => {
          const isUnliked = unlikedMenuIds.has(menu.id);
          return (
            <MenuRow key={menu.id} $isUnliked={isUnliked}>
              <MenuName>
                {menu.name_kr}
                {menu.etc && menu.etc.find((e) => e === "No meat") && (
                  <NoMeat src={"/img/no-meat.svg"} alt="채식 메뉴" />
                )}
              </MenuName>
              <Dots src={"/img/dots.svg"} />
              <MenuDataSection>
                <Price>{menu.price ? formatPrice(menu.price) : "-"}</Price>
                <Rate>{menu.score ? menu.score.toFixed(1) : "-"}</Rate>
                <LikeBox>
                  <HeartIcon
                    src={isUnliked ? "/img/general/heart-off.svg" : "/img/general/heart-on.svg"}
                    onClick={(e) => handleUnlikeClick(e, menu.id)}
                    alt={isUnliked ? "찜 취소됨" : "찜 해제"}
                  />
                </LikeBox>
              </MenuDataSection>
            </MenuRow>
          );
        })}
      </MenusContainer>
    </Container>
  );
});

export default LikedMenuCard;

const Container = styled.div`
  ${LoadingAnimation}
  display: flex;
  padding: 24px 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  background: var(--SemanticColor-Background-Secondary, #ffffff);
  border-radius: 10px;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 18px 16px;
    border: solid 1px #e8e8e8;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 1 auto;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const Name = styled.div`
  color: var(--Color-Foundation-gray-900, #262728);
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: 16px;
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);
  flex: 1 1 auto;
  min-width: 0;
  word-wrap: break-word;
  word-break: break-word;

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);
    font-size: 16px;
  }
`;

const StarIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-shrink: 0;
  margin-left: auto;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const HeaderDataList = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 16px;
    width: 100%;
    justify-content: flex-end;
  }
`;

const HeaderDataText = styled.p`
  color: var(--Color-Foundation-orange-500, #ff9522);
  text-align: center;
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);
  margin: 0;

  &:nth-child(1) {
    width: 58px;
  }
  &:nth-child(2) {
    width: 42px;
  }
  &:nth-child(3) {
    width: 30px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: fit-content !important;
  }
`;

const HLine = styled.div`
  height: 1px;
  align-self: stretch;
  background: var(--Color-Foundation-orange-500, #ff9522);
  width: 100%;

  @media (min-width: 769px) {
    height: 2px;
  }
`;

const MenusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const MenuRow = styled.div<{ $isUnliked?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: ${(props) => (props.$isUnliked ? 0.4 : 1)};
  transition: opacity 0.2s ease-in-out;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const MenuName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--Color-Foundation-gray-900, #262728);
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);
  flex: 1 1 auto;
  min-width: 0;
  word-wrap: break-word;
  word-break: break-word;

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);
  }
`;

const NoMeat = styled.img`
  width: 19px;
  height: 17px;
  flex-shrink: 0;
`;

const Dots = styled.img`
  width: 40px;
  height: 1px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuDataSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  color: var(--Color-Foundation-gray-900, #262728);
  text-align: center;
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);
    width: fit-content;
    min-width: 28px;
  }
`;

const Rate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  color: var(--Color-Foundation-gray-900, #262728);
  text-align: center;
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);
    width: fit-content;
    min-width: 23px;
  }
`;

const LikeBox = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;
`;
