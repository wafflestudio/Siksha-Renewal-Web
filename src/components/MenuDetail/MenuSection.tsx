import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReviewImageSwiper from "./ReviewImageSwiper";
import { MenuType } from "pages/menu/[menuId]";
import Likes from "./Likes";
import ReviewDistribution from "./ReviewDistribution";
import { getRestaurantList } from "utils/api/restaurants";
import { getReviewScore } from "utils/api/reviews";
import { useRouter } from "next/router";

interface MenuSectionProps {
  menu: MenuType;
  reviewsTotalCount: number;
  images: string[];
  handleReviewPostButtonClick: () => void;
}

export default function MenuSection({
  menu,
  reviewsTotalCount,
  images,
  handleReviewPostButtonClick,
}: MenuSectionProps) {
  const router = useRouter();

  const [restaurantName, setRestaurantName] = useState("");
  const [reviewDistribution, setReviewDistribution] = useState<number[]>([]);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => setIsAccordionOpen(!isAccordionOpen);
  const [isOverflow, setIsOverflow] = useState(false);
  const menuTitleDivRef = useRef<HTMLDivElement>(null);

  const SWIPER_IMAGES_LIMIT = 5;

  useEffect(() => {
    Promise.all([getRestaurantList(), getReviewScore(menu.id)])
      .then(([restaurantListData, reviewScoreData]) => {
        const restaurantName = restaurantListData.find(
          (restaurant) => restaurant.id === menu.restaurant_id,
        );
        if (restaurantName) setRestaurantName(restaurantName.nameKr);
        setReviewDistribution(reviewScoreData);
      })
      .catch((e) => {
        console.error(e);
        router.push("/");
      });
  }, [menu]);

  useEffect(() => {
    if (menuTitleDivRef.current) {
      const { current } = menuTitleDivRef;
      const { offsetWidth, scrollWidth } = current;
      setIsOverflow(offsetWidth < scrollWidth);
    }
  }, [menuTitleDivRef.current]);

  return (
    <MenuContainer>
      {images.length > 0 && (
        <ReviewImageSwiper
          menuId={menu.id}
          images={images}
          swiperImagesLimit={SWIPER_IMAGES_LIMIT}
          imageCount={images.length}
        />
      )}
      <MenuInfoContainer>
        <MenuHeader>
          <MenuTitleContainer>
            <MenuTitleWrapper>
              <MenuTitle isOpen={isAccordionOpen} ref={menuTitleDivRef}>
                {menu.name_kr}
              </MenuTitle>
              <MenuTitleAccordionButton
                isOpen={isAccordionOpen}
                isTitleLong={isOverflow}
                onClick={toggleAccordion}
              />
            </MenuTitleWrapper>
            <MenuSubTitle>{restaurantName}</MenuSubTitle>
          </MenuTitleContainer>
          <Likes menu={menu} />
        </MenuHeader>
        <HLine />
        <ReviewDistribution
          totalReviewCount={reviewsTotalCount}
          score={menu.score || 0}
          distribution={reviewDistribution}
        />
      </MenuInfoContainer>
      <MobileReviewPostButton onClick={handleReviewPostButtonClick}>
        나의 평가 남기기
      </MobileReviewPostButton>
    </MenuContainer>
  );
}

const MenuContainer = styled.section`
  position: relative;
  background-color: white;
  width: 1185px;
  height: 100%;
  @media (max-width: 768px) {
    flex-grow: 0;
    width: auto;
    min-width: 0;
    margin-left: 0;
  }
`;

const MenuInfoContainer = styled.div`
  padding: 41px 30px 26px 258px;
  width: 897px;
  margin-left: auto;
  @media (max-width: 768px) {
    padding: 18px 15px 16px 17px;
    width: auto;
    margin-left: 0;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: last baseline;
  padding-bottom: 13px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-bottom: 18px;
  }
`;

const MenuTitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuTitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 9.2px;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const MenuTitle = styled.div<{ isOpen: boolean }>`
  font-size: 40px;
  font-weight: 700;
  color: #ff9522;
  line-height: 45.4px;
  margin-right: 3px;
  margin-left: 7px;
  width: ${(props) => (props.isOpen ? "492px" : "auto")};
  max-width: 492px;
  text-overflow: ellipsis;
  white-space: ${(props) => (props.isOpen ? "normal" : "nowrap")};
  word-break: break-word;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0;
  }
`;

const MenuTitleAccordionButton = styled.button<{ isOpen: boolean; isTitleLong: boolean }>`
  display: ${(props) => (props.isTitleLong ? "inherit" : "none")};
  height: 45.4px;
  width: 21.75px;
  border: none;
  background-color: transparent;
  background-image: url(${({ isOpen }) => `img/${isOpen ? "up" : "down"}-arrow.orange.svg`});
  background-repeat: no-repeat;
  background-position-y: center;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuSubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #ff9522;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HLine = styled.div`
  width: 100%;
  height: 1px;
  background: #fe8c59;
  margin: auto;
`;

const MobileReviewPostButton = styled.button`
  display: none;
  position: inherit;
  background: #ff9522;
  width: 200px;
  height: 32px;
  color: white;
  font-size: 14px;
  font-weight: 800;
  line-height: 16px;
  text-align: center;
  margin: auto;
  margin-bottom: 16px;
  border: none;
  border-radius: 50px;
  padding: 8px 25px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
