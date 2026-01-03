import { useEffect, useState } from "react";
import styled from "styled-components";
import { MenuType } from "app/menu/[menuId]/Menu";
import Likes from "./Likes";
import ReviewDistribution from "./ReviewDistribution";
import { getRestaurantList } from "utils/api/restaurants";
import { getKeywordReviewScore, getReviewScore } from "utils/api/reviews";
import useIsMobile from "hooks/UseIsMobile";
import { formatDate, formatPrice } from "utils/FormatUtil";
import useError from "hooks/useError";
import PhotoReviewsSection from "./PhotoReviewsSection";
import KeywordReviewChart from "./KeywordReviewChart";
import { KeywordReviewScore } from "types";
import DistanceIcon from "assets/icons/distance.svg";

interface MenuSectionProps {
  menu: MenuType;
  reviewsTotalCount: number;
  images: string[];
  handleReviewPostButtonClick: () => void;
  isReviewListPageOpen: boolean;
}

export default function MenuSection({
  menu,
  reviewsTotalCount,
  images,
  handleReviewPostButtonClick,
  isReviewListPageOpen,
}: MenuSectionProps) {
  const { onHttpError } = useError();

  const [restaurantName, setRestaurantName] = useState("");
  const [reviewDistribution, setReviewDistribution] = useState<number[]>([]);
  const [keywordReviewScore, setKeywordReviewScore] = useState<KeywordReviewScore>({
    taste_keyword: "맛",
    taste_cnt: 0,
    taste_total: 0,
    price_keyword: "가격",
    price_cnt: 0,
    price_total: 0,
    food_composition_keyword: "음식구성",
    food_composition_cnt: 0,
    food_composition_total: 0,
  });

  const isMobile = useIsMobile();

  useEffect(() => {
    Promise.all([getRestaurantList(), getReviewScore(menu.id), getKeywordReviewScore(menu.id)])
      .then(([restaurantListData, reviewScoreData, keywordReviewScoreData]) => {
        const restaurantName = restaurantListData.find(
          (restaurant) => restaurant.id === menu.restaurant_id,
        );
        if (restaurantName) setRestaurantName(restaurantName.nameKr);
        setReviewDistribution(reviewScoreData);

        if (keywordReviewScore) setKeywordReviewScore(keywordReviewScoreData);
      })
      .catch(onHttpError);
  }, [menu]);

  return (
    <Container $isNotShow={isReviewListPageOpen && isMobile}>
      <MenuOverview>
        <MenuHeader>
          <RestaurantWrapper>
            <DistanceIcon color="var(--Color-Foundation-orange-500)" />
            <Restaurant>{restaurantName ?? "정보 없음"}</Restaurant>
          </RestaurantWrapper>
          <MenuInfoContainer>
            <MenuInfo>
              <MenuTitle>{menu.name_kr}</MenuTitle>
              <Price>{(menu.price ? formatPrice(menu.price) : "-") + "원"}</Price>
            </MenuInfo>
            <Likes menu={menu} />
          </MenuInfoContainer>
        </MenuHeader>

        <MobileDivider />

        <MenuEvaluation>
          <ReviewArrangement>
            <ReviewDistribution
              reviewsTotalCount={reviewsTotalCount}
              score={menu.score || 0}
              distribution={reviewDistribution}
            />
            <KeywordReviewChart data={keywordReviewScore} />
          </ReviewArrangement>
          {
            // formateDate -> "2021-08-01 (수)" 식으로 나옴
            // 따라서 "2021-08-01".split(" ")[0] -> "2021-08-01"로 가공해야하며 이는 menuDate 형식과 같음
            formatDate(new Date()).split(" ")[0] === menu.date && (
              <ReviewPostButton onClick={handleReviewPostButtonClick}>
                나의 평가 남기기
              </ReviewPostButton>
            )
          }
        </MenuEvaluation>
      </MenuOverview>
      <MobileDivider />
      <PhotoReviewsSection menuId={menu.id} images={images} />
    </Container>
  );
}

const Container = styled.section<{ $isNotShow: boolean }>`
  border-radius: 10px;
  background: var(--SemanticColor-Background-Secondary, #232323);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 50px;
  flex: 1 0 0;

  padding: 24px;
  align-self: stretch;

  @media (max-width: 768px) {
    flex-grow: 0;
    width: auto;
    height: auto;
    min-width: 0;
    margin-left: 0;
    padding: 0;
    gap: 0;
  }
  display: ${(props) => props.$isNotShow && `none`};
`;

const MenuOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  @media (max-width: 768px) {
    gap: 0;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  @media (max-width: 768px) {
    padding: 0 16px;
    height: 86px;
  }
`;

const RestaurantWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Restaurant = styled.div`
  color: var(--Color-Foundation-orange-500, #ff9522);

  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */
`;

const MenuInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;

  @media (max-width: 768px) {
    height: 100%;
    align-items: center;
    justify-content: space-around;
  }
`;

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  flex: 1 0 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuTitle = styled.div`
  align-self: stretch;
  color: var(--Color-Foundation-gray-900, #262728);

  /* text-20/ExtraBold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-20, 20px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 28px */
  @media (max-width: 768px) {
  }
`;

const Price = styled.div`
  color: var(--Color-Foundation-gray-600, #989aa0);

  /* text-15/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-15, 15px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 22.5px */
`;

const MobileDivider = styled.div`
  display: none;
  background: var(--Color-Foundation-gray-100, #f2f3f4);
  width: 100%;
  height: 10px;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const MenuEvaluation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`;

const ReviewPostButton = styled.button`
  display: flex;
  height: 42px;
  width: 100%;
  padding: 14px 65px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  background: var(--Color-Foundation-orange-500, #ff9522);
  cursor: pointer;

  color: var(--SemanticColor-Text-Button, #ffffff);

  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */

  @media (max-width: 768px) {
    width: 140px;
    padding: 10px 20px;
    align-self: center;
    border-radius: 50px;
    height: 36px;
  }
`;

const ReviewArrangement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 12px;
  }
`;
