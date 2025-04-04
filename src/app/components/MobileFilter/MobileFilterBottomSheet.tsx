import styled from "styled-components";
import MobileBottomSheet from "./MobileBottomSheet";
import Button from "components/general/Button";
import useFilter from "hooks/useFilter";
import { useState, useEffect, useCallback } from "react";
import ButtonGroup from "./ButtonGroup";
import MobileDistanceSlider from "./MobileDistanceSlider";
import MobilePriceSlider from "./MobilePriceSlider";
import {
  defaultFilters,
  DISTANCE_FILTER_OPTIONS,
  PRICE_FILTER_OPTIONS,
} from "constants/filterOptions";

interface MobileFilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterBottomSheet({ isOpen, onClose }: MobileFilterBottomSheetProps) {
  const { filterList, setFilterList, resetFilterList } = useFilter();
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

  const onApplyFilter = useCallback(() => {
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
    onClose();
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
    console.log(key, value);
    console.log(selectedFilters);
  }, []);

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose}>
      <MobileFilterHeader>필터 </MobileFilterHeader>
      <FilterContentWrapper>
        <FilterContent>
          <MobileFilterText>거리</MobileFilterText>
          <div style={{ height: 46.5 }} />
          <MobileDistanceSlider
            length={selectedFilters.length}
            onLengthChange={(value: number) => handleSliderChange(value)}
          />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>가격</MobileFilterText>
          <div style={{ height: 46.5 }} />
          <MobilePriceSlider
            priceRange={[selectedFilters.priceMin, selectedFilters.priceMax]}
            onPriceRangeChange={(value: [number, number]) => handleSliderChange(value)}
          />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>영업시간</MobileFilterText>
          <div style={{ height: 14.5 }} />
          <ButtonGroup
            items={[
              { label: "전체", id: "ALL" },
              { label: "영업 중", id: "AVAILABLE" },
            ]}
            selectedId={selectedFilters.isAvailableOnly ? "AVAILABLE" : "ALL"}
            onSelect={(id) => {
              handleButtonClick("isAvailableOnly", id === "AVAILABLE");
            }}
          />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>리뷰</MobileFilterText>
          <div style={{ height: 14.5 }} />
          <ButtonGroup
            items={[
              { label: "전체", id: "ALL" },
              { label: "리뷰 있음", id: "REVIEW" },
            ]}
            selectedId={selectedFilters.isReview ? "REVIEW" : "ALL"}
            onSelect={(id) => {
              handleButtonClick("isReview", id === "REVIEW");
            }}
          />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>최소 평점</MobileFilterText>
          <div style={{ height: 14.5 }} />
          <ButtonGroup
            items={[
              { label: "전체", id: "ALL" },
              {
                label: (
                  <div>
                    3.5
                    <StarIcon src="/img/general/star-on.svg" />
                  </div>
                ),
                id: "3.5",
              },
              {
                label: (
                  <div>
                    4.0
                    <StarIcon src="/img/general/star-on.svg" />
                  </div>
                ),
                id: "4",
              },
              {
                label: (
                  <div>
                    4.5
                    <StarIcon src="/img/general/star-on.svg" />
                  </div>
                ),
                id: "4.5",
              },
            ]}
            selectedId={selectedFilters.ratingMin === 0 ? "ALL" : String(selectedFilters.ratingMin)}
            onSelect={(id) => {
              if (id === "ALL") {
                handleButtonClick("ratingMin", 0);
                return;
              }
              handleButtonClick("ratingMin", Number(id));
            }}
          />
        </FilterContent>
      </FilterContentWrapper>
      <FilterActionSection marginBottom="54" marginTop="19">
        <Button variant="neutral" onClick={resetFilter}>
          초기화
        </Button>
        <Button variant="primary" onClick={onApplyFilter}>
          적용
        </Button>
      </FilterActionSection>
    </MobileBottomSheet>
  );
}

const StarIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 4px;
`;

export const FilterActionSection = styled.div<{ marginBottom: string; marginTop?: string }>`
  display: flex;
  padding-bottom: ${(props) => `${props.marginBottom}px`};
  padding-top: ${(props) => `${props.marginTop ?? 0}px`};
  justify-content: space-between;
  /* box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.05); */
`;

const FilterContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: auto;
  gap: 40px;
`;

const FilterContent = styled.div``;

const MobileFilterHeader = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 14px;
  align-items: center;
`;

export const MobileFilterText = styled.div`
  font-size: 16px;
  font-weight: 800;
`;
