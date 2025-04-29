import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import UseFilter from "hooks/UseFilter";
import Button from "components/general/Button";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonGroup from "./ButtonGroup";
import { defaultFilters } from "constants/filterOptions";

interface MobileFilterRatingBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterRatingBottomSheet({
  isOpen,
  onClose,
}: MobileFilterRatingBottomSheetProps) {
  const { filterList, changeFilterOption } = UseFilter();
  const [ratingMin, setRatingMin] = useState(0);

  useEffect(() => {
    setRatingMin(filterList.ratingMin);
  }, [filterList.ratingMin]);

  const handleOnComplete = () => {
    changeFilterOption({
      ratingMin,
    });
    onClose();
  };

  const handleOnReset = () => {
    const defaultRatingMin = defaultFilters.ratingMin;
    setRatingMin(defaultRatingMin);
    changeFilterOption({
      ratingMin: defaultRatingMin,
    });
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} showHandle={false}>
      <MobileFilterText>최소 평점</MobileFilterText>
      <div style={{ height: 20.5 }} />
      <ButtonGroup
        items={[
          { label: "전체", id: "ALL" },
          {
            label: <RatingContent value="3.5" />,
            id: "3.5",
          },
          {
            label: <RatingContent value="4.0" />,
            id: "4",
          },
          {
            label: <RatingContent value="4.5" />,
            id: "4.5",
          },
        ]}
        selectedId={ratingMin === 0 ? "ALL" : String(ratingMin)}
        onSelect={(id) => {
          if (id === "ALL") {
            setRatingMin(0);
            return;
          }
          setRatingMin(Number(id));
        }}
      />
      <div style={{ height: 35.7 }} />
      <FilterActionSection marginBottom="19">
        <Button variant="neutral" onClick={handleOnReset}>
          초기화
        </Button>
        <Button variant="primary" onClick={handleOnComplete}>
          완료
        </Button>
      </FilterActionSection>
    </MobileBottomSheet>
  );
}

const RatingContent = ({ value }: { value: string }) => {
  return (
    <RatingContentWrapper>
      {value}
      <StarIcon src="/img/general/star-on.svg" />
    </RatingContentWrapper>
  );
};

const RatingContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StarIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-bottom: 2px;
`;
