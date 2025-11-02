"use client";

import styled from "styled-components";
import { useState } from "react";
import { LoadingAnimation } from "styles/globalstyle";
import { sanitizeCssSelector } from "utils/FormatUtil";
import Menu from "app/components/Menu";
import { useDispatchContext } from "providers/ContextProvider";
import { RawMenu } from "types";

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

export default function LikedMenuCard({ data, onUnlikeMenu }: LikedMenuCardProps) {
  const { setInfoData, toggleShowInfo } = useDispatchContext();
  const [isFavorite, setIsFavorite] = useState(true); // Restaurant is favorited if it appears here

  // Convert LikedMenu to RawMenu format for Menu component
  const convertToRawMenu = (menu: LikedMenu): RawMenu => ({
    id: menu.id,
    name_kr: menu.name_kr,
    name_en: "",
    price: menu.price,
    score: menu.score,
    etc: menu.etc || [],
    is_liked: true, // All menus here are liked
    like_cnt: 0, // We don't have this data in liked menu response
    review_cnt: 0, // We don't have this data in liked menu response
    created_at: "",
    updated_at: "",
    restaurant_id: data.id,
    code: data.code,
    date: "",
    type: "",
  });

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <DesktopContainer className={"a" + sanitizeCssSelector(data.code)}>
        <HeaderContainer>
          <TitleContainer>
            <Name>{data.name_kr}</Name>
            <TitleIconList>
              <ButtonIcon
                src={"/img/info.svg"}
                onClick={() => {
                  setInfoData(data);
                  toggleShowInfo();
                }}
                alt="위치 정보"
              />
              <ButtonIcon
                src={isFavorite ? "/img/general/star-on.svg" : "/img/general/star-off-24.svg"}
                onClick={handleToggleFavorite}
                alt={isFavorite ? "좋아요" : "좋아요 해제"}
              />
            </TitleIconList>
          </TitleContainer>
          <InfoContainer>
            <HeaderDataList>
              <HeaderDataText>Price</HeaderDataText>
              <HeaderDataText disableWidth={900}>Rate</HeaderDataText>
              <HeaderDataText shrinkWidth={900}>Like</HeaderDataText>
            </HeaderDataList>
          </InfoContainer>
        </HeaderContainer>
        <HLine />
        <MenuInfo>
          <Menus>
            {data.menus.map((menu) => (
              <Menu menu={convertToRawMenu(menu)} key={menu.id} />
            ))}
          </Menus>
        </MenuInfo>
      </DesktopContainer>
      <MobileContainer className={"a" + sanitizeCssSelector(data.code)}>
        <HeaderContainer>
          <TitleContainer>
            <Name>{data.name_kr}</Name>
            <TitleIconList>
              <ButtonIcon
                src={"/img/info.svg"}
                onClick={() => {
                  setInfoData(data);
                  toggleShowInfo();
                }}
                alt="정보"
              />
              <ButtonIcon
                src={isFavorite ? "/img/general/star-on.svg" : "/img/general/star-off-24.svg"}
                onClick={handleToggleFavorite}
                alt={isFavorite ? "좋아요" : "좋아요 해제"}
              />
            </TitleIconList>
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
        <Menus>
          {data.menus.map((menu) => (
            <Menu menu={convertToRawMenu(menu)} key={menu.id} />
          ))}
        </Menus>
      </MobileContainer>
    </>
  );
}

const DesktopContainer = styled.div`
  ${LoadingAnimation}
  display: flex;
  padding: 24px 28px;
  margin-right: 16px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  background: var(--foundation-base-white);
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 0 24px 28px 0;
    display: none;
  }
`;

const MobileContainer = styled.div`
  ${LoadingAnimation}
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: white;
    border: solid 1px #e8e8e8;
    box-sizing: border-box;
    border-radius: 8px;
    width: 95vw;
    padding: 18px 14px 0;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 11px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 1000px) {
    gap: 6px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-width: 372px;
  flex-direction: row;
  align-self: stretch;
  justify-content: flex-end;

  @media (min-width: 1001px) {
    flex-grow: 1;
  }

  @media (max-width: 900px) {
    min-width: 100%;
  }

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const HeaderDataList = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const HeaderDataText = styled.p<{ disableWidth?: number; shrinkWidth?: number }>`
  width: 58px;
  color: var(--Color-Foundation-orange-500, #ff9522);
  text-align: center;

  /* text-13/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-13, 13px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 140%; /* 18.2px */

  margin: 0;

  @media ${(props) => `(max-width: ${props.shrinkWidth ?? 0}px)`} {
    width: 24px;
  }

  @media ${(props) => `(max-width: ${props.disableWidth ?? 0}px)`} {
    display: none;
  }

  @media (max-width: 768px) {
    width: fit-content;

    /* text-12/Regular */
    font-family: var(--Font-family-sans, NanumSquare);
    font-size: var(--Font-size-12, 12px);
    font-style: normal;
    font-weight: var(--Font-weight-regular, 400);
    line-height: 140%; /* 16.8px */
  }
`;

const ButtonIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;

  /* App버전을 참고한 디자인 */
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const Name = styled.div`
  color: var(--Color-Foundation-gray-900, #262728);
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;

  /* text-18/ExtraBold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-18, 18px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 25.2px */

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);

    /* text-16/ExtraBold */
    font-family: var(--Font-family-sans, NanumSquare);
    font-size: var(--Font-size-16, 16px);
    font-style: normal;
    font-weight: var(--Font-weight-extrabold, 800);
    line-height: 140%; /* 22.4px */
    letter-spacing: var(--Font-letter-spacing-0, -0.3px);
  }
`;

const TitleIconList = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const HLine = styled.div`
  height: 2px;
  align-self: stretch;
  background: var(--Color-Foundation-orange-500);
  margin: 8px 0 14px;

  @media (max-width: 768px) {
    width: calc(95vw - 32px);
    height: 1px;
  }
`;

const MenuInfo = styled.div`
  display: flex;
  padding-bottom: 12px;

  @media (min-width: 769px) {
    width: 100%;
    padding-bottom: 0;
  }
`;

const Menus = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (min-width: 769px) {
    gap: 10px;
    width: 100%;
  }
`;
