import styled from "styled-components";
import MobileBottomSheet from "./MobileBottomSheet";
import Button from "components/general/Button";
import useFilter from "hooks/useFilter";
import useIsExceptEmpty from "hooks/UseIsExceptEmpty";
import { useState, useEffect, useCallback, useMemo } from "react";
import Slider from "rc-slider";
import ButtonGroup from "./ButtonGroup";

interface MobileFilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterBottomSheet({ isOpen, onClose }: MobileFilterBottomSheetProps) {
  const { filterList, setFilterList, resetFilterList } = useFilter();
  const { isExceptEmpty, toggleIsExceptEmpty } = useIsExceptEmpty();
  const { length, priceMin, priceMax, ratingMin, isReview } = filterList;

  const [selectedFilters, setSelectedFilters] = useState({
    length,
    priceMin,
    priceMax,
    ratingMin,
    isReview,
    isExceptEmpty,
  });

  useEffect(() => {
    setSelectedFilters({
      length,
      priceMin,
      priceMax,
      ratingMin,
      isReview,
      isExceptEmpty,
    });
  }, [length, priceMin, priceMax, ratingMin, isReview, isExceptEmpty]);

  const resetFilter = useCallback(() => {
    resetFilterList();
    setSelectedFilters({
      length: Infinity,
      priceMin: 0,
      priceMax: Infinity,
      ratingMin: 0,
      isReview: false,
      isExceptEmpty: true,
    });
    if (!isExceptEmpty) toggleIsExceptEmpty();
  }, [resetFilterList, isExceptEmpty, toggleIsExceptEmpty]);

  const onApplyFilter = useCallback(() => {
    setFilterList({
      length: selectedFilters.length > 1000 ? Infinity : selectedFilters.length,
      priceMin: selectedFilters.priceMin,
      priceMax: selectedFilters.priceMax > 15000 ? Infinity : selectedFilters.priceMax,
      ratingMin: selectedFilters.ratingMin,
      isReview: selectedFilters.isReview,
    });
    if (isExceptEmpty !== selectedFilters.isExceptEmpty) toggleIsExceptEmpty();
    onClose();
  }, [setFilterList, selectedFilters, isExceptEmpty, toggleIsExceptEmpty]);

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

  const distanceText = useMemo(() => {
    if (selectedFilters.length > 1000) return "1km 이상";
    return selectedFilters.length === 1000 ? "1km 이내" : `${selectedFilters.length}m 이내`;
  }, [selectedFilters.length]);

  const priceText = useMemo(() => {
    const minTxt = `${selectedFilters.priceMin}원`;
    const maxTxt =
      selectedFilters.priceMax > 15000 ? "15000원 이상" : `${selectedFilters.priceMax}원`;
    return `${minTxt} ~ ${maxTxt}`;
  }, [selectedFilters.priceMin, selectedFilters.priceMax]);

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose}>
      <MobileFilterHeader>필터 </MobileFilterHeader>
      <FilterContentWrapper>
        <FilterContent>
          <MobileFilterText>거리</MobileFilterText>
          <Slider
            min={200}
            max={1050}
            step={50}
            value={selectedFilters.length}
            defaultValue={1050}
            onChange={(value: number) => handleSliderChange(value)}
          />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>가격</MobileFilterText>
          <Slider
            range
            min={0}
            max={16000}
            step={1000}
            value={[selectedFilters.priceMin, selectedFilters.priceMax]}
            defaultValue={[2000, 8000]}
            onChange={([valueMin, valueMax]: [number, number]) =>
              handleSliderChange([valueMin, valueMax])
            }
          />{" "}
        </FilterContent>
        <FilterContent>
          <MobileFilterText>영업시간</MobileFilterText>
          <ButtonGroup
            items={[
              { label: "전체", id: "ALL" },
              { label: "영업 중", id: "AVAILABLE" },
            ]}
            selectedId={selectedFilters.isExceptEmpty ? "ALL" : "AVAILABLE"}
            onSelect={(id) => {
              handleButtonClick("isExceptEmpty", id === "ALL");
            }}
          />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>리뷰</MobileFilterText>
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
          <ButtonGroup
            items={[
              { label: "전체", id: "ALL" },
              {
                label: (
                  <div>
                    3.5
                    <StarIcon src="/img/general/star-on-orange.svg" />
                  </div>
                ),
                id: "3.5",
              },
              {
                label: (
                  <div>
                    4.0
                    <StarIcon src="/img/general/star-on-orange.svg" />
                  </div>
                ),
                id: "4",
              },
              {
                label: (
                  <div>
                    4.5
                    <StarIcon src="/img/general/star-on-orange.svg" />
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
        <FilterContent>
          <MobileFilterText>카테고리</MobileFilterText>
          <SkeletonForTest />
        </FilterContent>
      </FilterContentWrapper>
      <FilterActionSection>
        <Button
          variant="neutral"
          onClick={resetFilter}
          style={{
            width: "168px",
          }}
        >
          초기화
        </Button>
        <Button
          variant="primary"
          onClick={onApplyFilter}
          style={{
            width: "168px",
          }}
        >
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

const FilterActionSection = styled.div`
  display: flex;
  height: 111px;
  justify-content: space-between;
  align-items: center;
`;

const FilterContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100% - 111px);
  gap: 40px;
`;

const FilterContent = styled.div``;

const SkeletonForTest = styled.div`
  width: 100%;
  height: 34px;
  background-color: #f0f0f0;
`;

const MobileFilterHeader = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 14px;
  align-items: center;
`;

const MobileFilterText = styled.div`
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 14px;
`;
