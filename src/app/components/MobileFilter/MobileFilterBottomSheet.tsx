import styled from "styled-components";
import MobileBottomSheet from "./MobileBottomSheet";
import Button from "components/general/Button";

interface MobileFilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterBottomSheet({ isOpen, onClose }: MobileFilterBottomSheetProps) {
  const onApplyFilter = () => {
    onClose();
  };

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
      <FilterActionSection>
        <Button
          variant="neutral"
          onClick={() => {}}
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
