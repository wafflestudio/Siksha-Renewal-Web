import Slider from "rc-slider";
import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useMemo, useState } from "react";
import styled from "styled-components";

interface MobileFilterDistanceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterDistanceBottomSheet({
  isOpen,
  onClose,
}: MobileFilterDistanceBottomSheetProps) {
  const { filterList, setFilterList, defaultFilters } = useFilter();
  const [length, setLength] = useState(200);

  const distanceText = useMemo(() => {
    if (length > 1000) return "1km 이상";
    return length === 1000 ? "1km 이내" : `${length}m 이내`;
  }, [length]);

  const handleOnComplete = () => {
    setFilterList({
      ...filterList,
      length: length,
    });
    onClose();
  };

  const handleOnReset = () => {
    setFilterList({
      ...filterList,
      length: defaultFilters.length,
    });
    onClose();
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose}>
      <PicketBox>
        <PicketText>{distanceText}</PicketText>
        <PicketBottom src={"/img/picket-bottom.svg"} />
      </PicketBox>
      <MobileFilterText>거리</MobileFilterText>
      <Slider
        min={200}
        max={1050}
        step={50}
        value={length}
        defaultValue={1050}
        onChange={(value: number) => setLength(value)}
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

const PicketText = styled.div`
  display: flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: var(--Color-Foundation-gray-100, #f2f3f4);
  color: var(--Color-Foundation-gray-800, #4c4d50);

  text-align: center;
  font-size: var(--Font-size-11, 11px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 15.4px */
`;

const PicketBottom = styled.img`
  width: 6px;
  height: 5px;
  fill: var(--Color-Foundation-gray-100, #f2f3f4);
`;

const PicketBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
