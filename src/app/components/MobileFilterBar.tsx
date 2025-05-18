import UseFilter from "hooks/UseFilter";
import Image from "next/image";
import styled from "styled-components";
import MobileFilterDistanceBottomSheet from "./MobileFilter/MobileFilterDistanceBottomSheet";
import { useState } from "react";
import MobileFilterPriceBottomSheet from "./MobileFilter/MobileFilterPriceBottomSheet";
import MobileFilterRatingBottomSheet from "./MobileFilter/MobileFilterRatingBottomSheet";
import MobileFilterBottomSheet from "./MobileFilter/MobileFilterBottomSheet";
import FilterIcon from "assets/icons/filter.svg";
import DownArrowIcon from "assets/icons/down-arrow.svg";

export default function MobileFilterBar() {
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
    changeFilterOption({
      isAvailableOnly: !filterList.isAvailableOnly,
    });
  };

  const handleOnClickIsReview = () => {
    changeFilterOption({
      isReview: !filterList.isReview,
    });
  };

  return (
    <>
      <Container>
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
        <Button
          isActive={isSet.priceMin || isSet.priceMax}
          onClick={() => setFilterState("price", true)}
        >
          <ButtonText isActive={isSet.priceMin || isSet.priceMax}>
            {isSet.priceMin || isSet.priceMax
              ? `${filterList.priceMin}원 ~ ${
                  isFinite(filterList.priceMax) ? `${filterList.priceMax}원` : ""
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
        <Button isActive={isSet.ratingMin} onClick={() => setFilterState("rating", true)}>
          <ButtonText isActive={isSet.ratingMin}>
            {isSet.ratingMin ? `평점 ${filterList.ratingMin} 이상` : "최소 평점"}
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
  padding: 0 9px 17px 9px;
  box-sizing: border-box;
  gap: 5px;
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
