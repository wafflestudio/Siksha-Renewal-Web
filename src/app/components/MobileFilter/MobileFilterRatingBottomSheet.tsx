import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useState } from "react";
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

  const handleOnComplete = () => {
    setFilterList({
      ...filterList,
      ratingMin,
    });
    onClose();
  };

  const handleOnReset = () => {
    setFilterList({
      ...filterList,
      ratingMin: defaultFilters.ratingMin,
    });
    onClose();
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose}>
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
        selectedId={ratingMin === 0 ? "ALL" : String(ratingMin)}
        onSelect={(id) => {
          if (id === "ALL") {
            setRatingMin(0);
            return;
          }
          setRatingMin(Number(id));
        }}
      />
      <FilterActionSection>
        <Button
          variant="neutral"
          onClick={handleOnReset}
          style={{
            width: "168px",
          }}
        >
          초기화
        </Button>
        <Button
          variant="primary"
          onClick={handleOnComplete}
          style={{
            width: "168px",
          }}
        >
          완료
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
