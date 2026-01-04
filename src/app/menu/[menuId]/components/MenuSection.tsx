import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MenuType } from "app/menu/[menuId]/Menu";
import Likes from "./Likes";
import ReviewDistribution from "./ReviewDistribution";
import { getRestaurantList } from "utils/api/restaurants";
import { getReviewScore } from "utils/api/reviews";
import { useRouter } from "next/navigation";
import useIsMobile from "hooks/UseIsMobile";
import { formatDate, formatPrice } from "utils/FormatUtil";
import useError from "hooks/useError";
import Image from "next/image";
import PhotoReviewsSection from "./PhotoReviewsSection";
import Link from "next/link";

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

  const isMobile = useIsMobile();

  useEffect(() => {
    Promise.all([getRestaurantList(), getReviewScore(menu.id)])
      .then(([restaurantListData, reviewScoreData]) => {
        const restaurantName = restaurantListData.find(
          (restaurant) => restaurant.id === menu.restaurant_id,
        );
        if (restaurantName) setRestaurantName(restaurantName.nameKr);
        setReviewDistribution(reviewScoreData);
      })
      .catch(onHttpError);
  }, [menu]);

  return (
    <Container $isNotShow={isReviewListPageOpen && isMobile}>
      <MenuOverview>
        <MenuHeader>
          <RestaurantWrapper>
            <Image
              src={"/img/distance.svg"}
              alt="식당"
              width={20}
              height={20}
            />
            <Restaurant>{restaurantName}</Restaurant>
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
          <ReviewDistribution
            reviewsTotalCount={reviewsTotalCount}
            score={menu.score || 0}
            distribution={reviewDistribution}
          />
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
      <PhotoReviewsSection menuId={menu.id} images={images}/>
    </Container>
  );
}

const Container = styled.section<{ $isNotShow: boolean }>`
  border-radius: 10px;
  background-color: var(--Color-Foundation-base-white, #FFF);

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
  color: var(--Color-Foundation-orange-500, #FF9522);

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
  color: var(--Color-Foundation-gray-600, #989AA0);

  /* text-15/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-15, 15px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 22.5px */
`;

const MobileDivider = styled.div`
  display: none;
  background: var(--Color-Foundation-gray-100, #F2F3F4);
  width: 100%;
  height: 10px;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const MenuEvaluation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  background: var(--Color-Foundation-orange-500, #FF9522);
  cursor: pointer;

  color: var(--Color-Foundation-base-white, #FFF);

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
  }
`;
