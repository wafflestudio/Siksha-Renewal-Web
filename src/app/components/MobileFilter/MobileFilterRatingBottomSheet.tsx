import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonGroup from "./ButtonGroup";

interface MobileFilterRatingBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterRatingBottomSheet({
  isOpen,
  onClose,
}: MobileFilterRatingBottomSheetProps) {
  const { filterList, setFilterList, defaultFilters } = useFilter();
  const [ratingMin, setRatingMin] = useState(0);

  useEffect(() => {
    setRatingMin(filterList.ratingMin);
  }, [filterList.ratingMin]);

  const handleOnComplete = () => {
    setFilterList({
      ...filterList,
      ratingMin,
    });
    onClose();
  };

  const handleOnReset = () => {
    const defaultRatingMin = defaultFilters.ratingMin;
    setRatingMin(defaultRatingMin);
    setFilterList({
      ...filterList,
      ratingMin: defaultRatingMin,
    });
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} slideBar={false}>
      <MobileFilterText>최소 평점</MobileFilterText>
      <div style={{ height: 14.5 }} />
      <ButtonGroup
        items={[
          { label: "모두", id: "ALL" },
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
      <div style={{ height: 36 }} />
      <FilterActionSection marginBottom="45">
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
      <StarIcon src="/img/general/star-on-orange.svg" />
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
