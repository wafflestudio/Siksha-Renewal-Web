"use client";

import UseFilter from "hooks/UseFilter";
import Image from "next/image";
import styled from "styled-components";
import MobileFilterDistanceBottomSheet from "./MobileFilter/MobileFilterDistanceBottomSheet";
import { useEffect, useRef, useState } from "react";
import MobileFilterPriceBottomSheet from "./MobileFilter/MobileFilterPriceBottomSheet";
import MobileFilterRatingBottomSheet from "./MobileFilter/MobileFilterRatingBottomSheet";
import MobileFilterBottomSheet from "./MobileFilter/MobileFilterBottomSheet";
import { PRICE_FILTER_OPTIONS } from "constants/filterOptions";
import { formatPrice } from "utils/FormatUtil";
import { trackEvent } from "utils/MixPanel";
import { EventNames } from "constants/track";
import FilterIcon from "assets/icons/filter.svg";
import DownArrowIcon from "assets/icons/down-arrow.svg";

export default function MobileFilterBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      setIsScrolled(scrollRef.current.scrollLeft > 0);
    };

    const scrollEl = scrollRef.current;
    scrollEl?.addEventListener("scroll", handleScroll);

    return () => {
      scrollEl?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { filterList, isSet, changeFilterOption } = UseFilter();
  const [filters, setFilters] = useState({
    all: false,
    distance: false,
    price: false,
    rating: false,
    category: false,
  });
  const setFilterState = (filterName: keyof typeof filters, isOpen: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: isOpen,
    }));
  };

  const handleOnClickIsAvailableOnly = () => {
    const value = !filterList.isAvailableOnly;
    changeFilterOption({
      isAvailableOnly: value,
    });
    trackEvent({
      name: EventNames.INSTANT_FILTER_TOGGLED,
      props: {
        filter_type: "is_open_now",
        filter_value: value,
        page_name: "meal_list_page",
      },
    });
  };

  const handleOnClickIsReview = () => {
    const value = !filterList.isReview;
    changeFilterOption({
      isReview: value,
    });
    trackEvent({
      name: EventNames.INSTANT_FILTER_TOGGLED,
      props: {
        filter_type: "has_reviews",
        filter_value: value,
        page_name: "meal_list_page",
      },
    });
  };

  const handleMainFilterOpen = () => {
    setFilterState("all", true);
    trackEvent({
      name: EventNames.FILTER_MODAL_OPENED,
      props: {
        entry_point: "main_filter",
        page_name: "meal_list_page",
      },
    });
  };

  const handleDistanceFilterOpen = () => {
    setFilterState("distance", true);
    trackEvent({
      name: EventNames.FILTER_MODAL_OPENED,
      props: {
        entry_point: "distance_filter",
        page_name: "meal_list_page",
      },
    });
  };

  const handlePriceFilterOpen = () => {
    setFilterState("price", true);
    trackEvent({
      name: EventNames.FILTER_MODAL_OPENED,
      props: {
        entry_point: "price_filter",
        page_name: "meal_list_page",
      },
    });
  };

  const handleRatingFilterOpen = () => {
    setFilterState("rating", true);
    trackEvent({
      name: EventNames.FILTER_MODAL_OPENED,
      props: {
        entry_point: "rating_filter",
        page_name: "meal_list_page",
      },
    });
  };

  return (
    <>
      <Container ref={scrollRef}>
        <MobileFilterBottomSheet
          isOpen={filters.all}
          onClose={() => setFilterState("all", false)}
        />
        <MobileFilterDistanceBottomSheet
          isOpen={filters.distance}
          onClose={() => setFilterState("distance", false)}
        />
        <MobileFilterPriceBottomSheet
          isOpen={filters.price}
          onClose={() => setFilterState("price", false)}
        />
        <MobileFilterRatingBottomSheet
          isOpen={filters.rating}
          onClose={() => setFilterState("rating", false)}
        />
        {/* <MobileFilterCategoryBottomSheet
          isOpen={filters.category}
          onClose={() => setFilterState("category", false)}
        /> */}
        <IconBox>
          <StyledFilterIcon aria-label="필터 아이콘" onClick={() => setFilterState("all", true)} />
        </IconBox>
        <Button isActive={isSet.length} onClick={() => setFilterState("distance", true)}>
          <ButtonText isActive={isSet.length}>
            {isSet.length ? `${filterList.length}m 이내` : "거리"}
          </ButtonText>
          <StyledDownArrowIcon aria-label="아래 화살표" />
        </Button>
        <Button isActive={isSet.priceMin || isSet.priceMax} onClick={handlePriceFilterOpen}>
          <ButtonText isActive={isSet.priceMin || isSet.priceMax}>
            {isSet.priceMin || isSet.priceMax
              ? `${formatPrice(filterList.priceMin)}원 ~ ${
                  isFinite(filterList.priceMax)
                    ? `${formatPrice(filterList.priceMax)}원`
                    : `${formatPrice(PRICE_FILTER_OPTIONS.max)}원 이상`
                }`
              : "가격"}
          </ButtonText>
          <StyledDownArrowIcon aria-label="아래 화살표" />
        </Button>
        <Button isActive={isSet.isAvailableOnly} onClick={handleOnClickIsAvailableOnly}>
          {" "}
          {isSet.isAvailableOnly && (
            <Image src="img/check-gray.svg" alt="체크 아이콘" width={16} height={16} />
          )}
          <ButtonText isActive={isSet.isAvailableOnly}>영업 중</ButtonText>
        </Button>
        <Button isActive={isSet.isReview} onClick={handleOnClickIsReview}>
          {isSet.isReview && (
            <Image src="/img/check-gray.svg" alt="체크 아이콘" width={16} height={16} />
          )}
          <ButtonText isActive={isSet.isReview}>리뷰</ButtonText>
        </Button>
        <Button isActive={isSet.ratingMin} onClick={handleRatingFilterOpen}>
          <ButtonText isActive={isSet.ratingMin}>
            {isSet.ratingMin ? `평점 ${filterList.ratingMin.toFixed(1)} 이상` : "최소 평점"}
          </ButtonText>
          <StyledDownArrowIcon aria-label="아래 화살표" />
        </Button>
        {/* <Button isActive={isSet.category}>
          <ButtonText isActive={isSet.category}>
            {isSet.category ? `${filterList.category.join(", ")}` : "카테고리"}
          </ButtonText>
          <StyledDownArrowIcon aria-label="아래 화살표" />
        </Button> */}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0 8px 17px 0;
  box-sizing: border-box;
  gap: 5px;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterIconWrapper = styled.div`
  position: absolute;
  display: flex;
`;

const FilterIconGradient = styled.div<{ visible: boolean }>`
  width: 16px;
  height: 36px;
  background: linear-gradient(90deg, #f8f8f8 0%, rgba(248, 248, 248, 0) 100%);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const Button = styled.button<{ isActive?: boolean }>`
  display: flex;
  flex: 0 0 auto;
  height: 34px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 2px;

  border-radius: 30px;
  border: 1px solid
    ${(props) =>
      props.isActive ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-300)"};
  background-color: ${(props) =>
    props.isActive
      ? "var(--Color-Foundation-Tint-orange)"
      : "var(--Color-Foundation-base-white-5)"};

  font-family: NanumSquare_ac;
`;

const ButtonText = styled.span<{ isActive?: boolean }>`
  color: var(--Color-Foundation-base-black);
  leading-trim: both;
  text-edge: cap;
  font-size: 13px;
  font-style: normal;
  font-weight: ${(props) => (props.isActive ? 700 : 400)};
  line-height: 20px;
`;

const StyledFilterIcon = styled(FilterIcon)`
  color: var(--Color-Foundation-gray-500);
  width: 33.59px;
  height: 34px;
`;

const IconBox = styled.div<{ size?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => (size ? `${size}px` : "auto")};
  height: ${({ size }) => (size ? `${size}px` : "auto")};
`;

const StyledDownArrowIcon = styled(DownArrowIcon)`
  color: var(--Color-Foundation-gray-700);
  width: 16px;
  height: 6px;
`;
