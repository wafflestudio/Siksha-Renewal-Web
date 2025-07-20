import UseFilter from "hooks/UseFilter";
import useIsExceptEmpty from "hooks/UseIsExceptEmpty";
import "rc-slider/assets/index.css";
import "styles/slider.css";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  DISTANCE_FILTER_OPTIONS,
  PRICE_FILTER_OPTIONS,
  defaultFilters,
} from "constants/filterOptions";
import WebDistanceSlider from "./WebDistanceSlider";
import WebPriceSlider from "./WebPriceSlider";
import RefreshIcon from "assets/icons/refresh.svg";

export default function RestaurantFilter() {
  const { filterList, setFilterList, resetFilterList } = UseFilter();
  const { isExceptEmpty, toggleIsExceptEmpty } = useIsExceptEmpty();
  const { length, priceMin, priceMax, ratingMin, isReview, isAvailableOnly } = filterList;

  const [selectedFilters, setSelectedFilters] = useState({
    length,
    priceMin,
    priceMax,
    ratingMin,
    isReview,
    isAvailableOnly,
  });

  useEffect(() => {
    setSelectedFilters({
      length,
      priceMin,
      priceMax,
      ratingMin,
      isReview,
      isAvailableOnly,
    });
  }, [length, priceMin, priceMax, ratingMin, isReview, isAvailableOnly]);

  const resetFilter = useCallback(() => {
    resetFilterList();
    setSelectedFilters({
      length: Infinity,
      priceMin: 0,
      priceMax: Infinity,
      ratingMin: 0,
      isReview: false,
      isAvailableOnly: false,
    });
  }, [resetFilterList]);

  const applyFilter = useCallback(() => {
    setFilterList({
      length:
        selectedFilters.length === DISTANCE_FILTER_OPTIONS.val_infinity
          ? defaultFilters.length
          : selectedFilters.length,
      priceMin:
        selectedFilters.priceMin === PRICE_FILTER_OPTIONS.min
          ? defaultFilters.priceMin
          : selectedFilters.priceMin,
      priceMax:
        selectedFilters.priceMax === PRICE_FILTER_OPTIONS.max
          ? defaultFilters.priceMax
          : selectedFilters.priceMax,
      ratingMin: selectedFilters.ratingMin,
      isReview: selectedFilters.isReview,
      isAvailableOnly: selectedFilters.isAvailableOnly,
    });
  }, [setFilterList, selectedFilters]);

  const handleSliderChange = useCallback((value: number | [number, number]) => {
    setSelectedFilters((prev) => {
      if (Array.isArray(value)) {
        return { ...prev, priceMin: value[0], priceMax: value[1] };
      }
      return { ...prev, length: value };
    });
  }, []);

  const handleButtonClick = useCallback((key: string, value: boolean | number) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <Container>
      <Header>
        <Title>메뉴 필터</Title>
        <RefreshBox onClick={resetFilter}>
          <StyledRefreshIcon />
          <RefreshText>초기화</RefreshText>
        </RefreshBox>
      </Header>
      <Filter>
        <SliderBox>
          <SliderContent>
            <ContentBar gap={16} alignItems="end">
              <FilterText>거리</FilterText>
              <WebDistanceSlider
                length={selectedFilters.length}
                onLengthChange={handleSliderChange}
              />
            </ContentBar>
          </SliderContent>
          <SliderContent>
            <ContentBar gap={16} alignItems="end">
              <FilterText>가격</FilterText>
              <WebPriceSlider
                priceRange={[selectedFilters.priceMin, selectedFilters.priceMax]}
                onPriceRangeChange={handleSliderChange}
              />
            </ContentBar>
          </SliderContent>
        </SliderBox>
        <ContentBar gap={12}>
          <FilterText>영업시간</FilterText>
          <ButtonGroup>
            <FilterButton
              active={!selectedFilters.isAvailableOnly}
              onClick={() => handleButtonClick("isAvailableOnly", false)}
            >
              전체
            </FilterButton>
            <FilterButton
              active={selectedFilters.isAvailableOnly}
              onClick={() => handleButtonClick("isAvailableOnly", true)}
            >
              영업 중
            </FilterButton>
          </ButtonGroup>
        </ContentBar>
        <ContentBar gap={12}>
          <FilterText>리뷰 유무</FilterText>
          <ButtonGroup>
            <FilterButton
              active={!selectedFilters.isReview}
              onClick={() => handleButtonClick("isReview", false)}
            >
              전체
            </FilterButton>
            <FilterButton
              active={selectedFilters.isReview}
              onClick={() => handleButtonClick("isReview", true)}
            >
              리뷰 있음
            </FilterButton>
          </ButtonGroup>
        </ContentBar>
        <ContentBar gap={12}>
          <FilterText>최소 평점</FilterText>
          <ButtonGroup>
            <FilterButton
              active={![3.5, 4, 4.5].includes(selectedFilters.ratingMin)}
              onClick={() => handleButtonClick("ratingMin", 0)}
            >
              전체
            </FilterButton>
            <FilterButton
              active={selectedFilters.ratingMin === 3.5}
              onClick={() => handleButtonClick("ratingMin", 3.5)}
            >
              3.5
            </FilterButton>
            <FilterButton
              active={selectedFilters.ratingMin === 4}
              onClick={() => handleButtonClick("ratingMin", 4)}
            >
              4.0
            </FilterButton>
            <FilterButton
              active={selectedFilters.ratingMin === 4.5}
              onClick={() => handleButtonClick("ratingMin", 4.5)}
            >
              4.5
            </FilterButton>
          </ButtonGroup>
        </ContentBar>
      </Filter>
      <DecideButton onClick={applyFilter}>필터 적용하기</DecideButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  background-color: var(--SemanticColor-Background-Primary);
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Title = styled.h3`
  color: var(--Color-Foundation-gray-900, #262728);

  font-size: var(--Font-size-16, 16px);
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 22.4px */
`;

const RefreshBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const StyledRefreshIcon = styled(RefreshIcon)`
  width: 24px;
  height: 24px;
  color: var(--Color-Foundation-gray-600);
`;

const RefreshText = styled.span`
  color: var(--Color-Foundation-gray-800, #4c4d50);
  font-size: var(--Font-size-13, 13px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 18.2px */
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SliderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-self: stretch;
  gap: 4px;
`;

const ContentBar = styled.div<{ gap: number; alignItems?: string }>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems ?? "center"};
  justify-content: space-between;
  gap: ${(props) => props.gap}px;
`;

const FilterText = styled.span`
  width: 54px;
  flex-shrink: 0;
  color: var(--Color-Foundation-gray-900, #262728);
  font-size: var(--Font-size-14, 14px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */
`;

const ButtonGroup = styled.span`
  display: flex;
  width: 264px;
  height: 30px;
  padding: 4px;
  align-items: center;
  border-radius: 8px;
  background: var(--Color-Foundation-gray-100, #f2f3f4);
`;

const FilterButton = styled.button<{ active?: boolean }>`
  display: flex;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 4px;
  background: ${(props) =>
    props.active ? "var(--Color-Foundation-base-white, #FFF)" : "transparent"};

  color: ${(props) =>
    props.active
      ? "var(--Color-Foundation-gray-900, #262728)"
      : "var(--Color-Foundation-gray-600, #989AA0)"};
  font-size: var(--Font-size-12, 12px);
  font-weight: ${(props) =>
    props.active ? "var(--Font-weight-extrabold, 800)" : "var(--Font-weight-bold, 700)"};
  line-height: 140%;
  text-align: center;
`;

const DecideButton = styled.button`
  display: flex;
  height: 42px;
  padding: 0px 65px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--Color-Foundation-orange-500, #ff9522);

  color: var(--Color-Foundation-base-white-2, #fff);
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
`;
