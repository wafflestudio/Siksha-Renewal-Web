'use client'

import styled from "styled-components";
import { useRouter } from "next/navigation";
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

export default function LikedMenuCard({ data, onUnlikeMenu }: LikedMenuCardProps) {
  const { toggleFavorite, isFavorite } = useFavorite();
  const router = useRouter();

  return (
    <>
      <DesktopContainer className={"a" + sanitizeCssSelector(data.code)}>
        <HeaderContainer>
          <TitleContainer>
            <Name>{data.name_kr}</Name>
            <TitleIconList>
              <ButtonIcon
                src={
                  isFavorite(data.id)
                    ? "/img/general/star-on.svg"
                    : "/img/general/star-off-24.svg"
                }
                onClick={() => toggleFavorite(data.id)}
                alt={isFavorite(data.id) ? "좋아요" : "좋아요 해제"}
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
              <MenuRow
                key={menu.id}
                onClick={() => router.push(`/menu/${menu.id}`)}
              >
                <MenuName>
                  {menu.name_kr}
                  {menu.etc && menu.etc.find((e) => e == "No meat") && (
                    <NoMeat src={"/img/no-meat.svg"} alt="채식 메뉴" />
                  )}
                </MenuName>
                <Dots src={"/img/dots.svg"} />
                <MenuDataSection>
                  <Price>{menu.price ? formatPrice(menu.price) : "-"}</Price>
                  <Rate>{menu.score ? menu.score.toFixed(1) : "-"}</Rate>
                  <LikeBox>
                    <HeartIcon
                      src="/img/general/heart-on.svg"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnlikeMenu(menu.id);
                      }}
                      alt="찜 해제"
                    />
                  </LikeBox>
                </MenuDataSection>
              </MenuRow>
            ))}
          </Menus>
        </MenuInfo>
      </DesktopContainer>
      <MobileContainer className={"a" + sanitizeCssSelector(data.code)}>
        <HeaderContainer>
          <TitleContainer>
            <Name>{data.name_kr}</Name>
            <TitleIconList>
              {isFavorite(data.id) ? (
                <ButtonIcon
                  src="/img/general/star-on.svg"
                  onClick={() => toggleFavorite(data.id)}
                  alt="좋아요"
                />
              ) : (
                <ButtonIcon
                  src="/img/general/star-off-24.svg"
                  onClick={() => toggleFavorite(data.id)}
                  alt=""
                />
              )}
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
            <MobileMenuRow
              key={menu.id}
              onClick={() => router.push(`/menu/${menu.id}`)}
            >
              <MenuName>
                {menu.name_kr}
                {menu.etc && menu.etc.find((e) => e == "No meat") && (
                  <NoMeat src={"/img/no-meat.svg"} alt="채식 메뉴" />
                )}
              </MenuName>
              <MobileMenuData>
                <MobilePrice>{menu.price ? formatPrice(menu.price) : "-"}</MobilePrice>
                <MobileRate>{menu.score ? menu.score.toFixed(1) : "-"}</MobileRate>
                <HeartIcon
                  src="/img/general/heart-on.svg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUnlikeMenu(menu.id);
                  }}
                  alt="찜 해제"
                />
              </MobileMenuData>
            </MobileMenuRow>
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
  color: var(--Color-Foundation-orange-500, #FF9522);
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

const MenuRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  align-items: flex-start;
  gap: 10px;

  @media (pointer: fine) {
    &:hover {
      background: #f5f5f5;
    }
  }
`;

const MobileMenuRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
  margin-bottom: 12px;
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
    font-weight: 400;
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

const Dots = styled.img`
  width: 40px;
  height: 22px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const MenuDataSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MobileMenuData = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  gap: 16px;
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  width: 58px;
  color: var(--Color-Foundation-gray-900, #262728);
  text-align: center;

  /* text-14/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 21px */
`;

const MobilePrice = styled.div`
  width: fit-content;
  min-width: 28px;
  display: flex;
  justify-content: flex-end;
  color: var(--Color-Foundation-base-black, #000);
  text-align: center;

  /* text-14/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 21px */
`;

const Rate = styled.div`
  display: flex;
  justify-content: center;
  width: 58px;
  height: 21px;
  font-weight: 400;
  font-size: 14px;
  color: var(--Color-Foundation-gray-900, #262728);
  font-style: normal;
  line-height: 150%; /* 21px */
  letter-spacing: -0.3px;

  @media (min-width: 769px) and (max-width: 901px) {
    display: none;
  }
`;

const MobileRate = styled.div`
  width: 23px;
  color: var(--Color-Foundation-base-black, #000);
  text-align: center;

  /* text-14/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 21px */
`;

const LikeBox = styled.div`
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 901px) {
    width: 58px;
  }
`;

const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 0;
`;
