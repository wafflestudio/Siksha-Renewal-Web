import UseFilter from "hooks/UseFilter";
import Image from "next/image";
import styled from "styled-components";
import MobileFilterDistanceBottomSheet from "./MobileFilter/MobileFilterDistanceBottomSheet";
import { useState } from "react";
import MobileFilterPriceBottomSheet from "./MobileFilter/MobileFilterPriceBottomSheet";
import MobileFilterRatingBottomSheet from "./MobileFilter/MobileFilterRatingBottomSheet";
import MobileFilterBottomSheet from "./MobileFilter/MobileFilterBottomSheet";
import FilterIcon from "assets/icons/filter.svg";

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
        <IconWrapper>
          <StyledFilterIcon aria-label="필터 아이콘" />
        </IconWrapper>
        {/* <Image
          src="/img/filter-icon.svg"
          alt="필터 아이콘"
          width={33.586}
          height={34}
          onClick={() => setFilterState("all", true)}
        /> */}
        <Button isActive={isSet.length} onClick={() => setFilterState("distance", true)}>
          <ButtonText isActive={isSet.length}>
            {isSet.length ? `${filterList.length}m 이내` : "거리"}
          </ButtonText>
          <Image
            src="/img/down-arrow-darkblue.svg"
            alt="아래 화살표"
            width={9.33}
            height={4}
            style={{ padding: "0 3.33px" }}
          />
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
          <Image
            src="/img/down-arrow-darkblue.svg"
            alt="아래 화살표"
            width={9.33}
            height={4}
            style={{ padding: "0 3.33px" }}
          />
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
          <Image
            src="/img/down-arrow-darkblue.svg"
            alt="아래 화살표"
            width={9.33}
            height={4}
            style={{ padding: "0 3.33px" }}
          />
        </Button>
        {/* <Button isActive={isSet.category}>
          <ButtonText isActive={isSet.category}>
            {isSet.category ? `${filterList.category.join(", ")}` : "카테고리"}
          </ButtonText>
          <Image
            src="/img/down-arrow-darkblue.svg"
            alt="아래 화살표"
            width={9.33}
            height={4}
            style={{ padding: "0 3.33px" }}
          />
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
  background: ${(props) =>
    props.isActive ? "var(--Color-Main-Active)" : "var(--Color-Foundation-base-white)"};

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
  width: 20;
  height: 20;
`;

const IconWrapper = styled.div`
  width: 33.59px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
