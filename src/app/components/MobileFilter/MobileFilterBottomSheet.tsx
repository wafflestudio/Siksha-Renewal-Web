import styled from "styled-components";
import MobileBottomSheet from "./MobileBottomSheet";

interface MobileFilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterBottomSheet({ isOpen, onClose }: MobileFilterBottomSheetProps) {
  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose}>
      <MobileFilterHeader>필터 </MobileFilterHeader>
      <FilterContentWrapper>
        <FilterContent>
          <MobileFilterText>거리</MobileFilterText>
          <SkeletonForTest />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>가격</MobileFilterText>
          <SkeletonForTest />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>영업시간</MobileFilterText>
          <SkeletonForTest />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>리뷰</MobileFilterText>
          <SkeletonForTest />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>최소 평점</MobileFilterText>
          <SkeletonForTest />
        </FilterContent>
        <FilterContent>
          <MobileFilterText>카테고리</MobileFilterText>
          <SkeletonForTest />
        </FilterContent>
      </FilterContentWrapper>
    </MobileBottomSheet>
  );
}

const FilterContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
