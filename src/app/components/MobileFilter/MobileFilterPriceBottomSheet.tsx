import Slider from "rc-slider";
import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useMemo, useState } from "react";
import styled from "styled-components";

interface MobileFilterPriceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterPriceBottomSheet({
  isOpen,
  onClose,
}: MobileFilterPriceBottomSheetProps) {
  const { filterList, setFilterList, defaultFilters } = useFilter();
  const [priceMin, setPriceMin] = useState(2000);
  const [priceMax, setPriceMax] = useState(8000);

  const priceText = useMemo(() => {
    const minTxt = `${priceMin}원`;
    const maxTxt = priceMax > 15000 ? "15000원 이상" : `${priceMax}원`;
    return `${minTxt} ~ ${maxTxt}`;
  }, [priceMin, priceMax]);

  const handleOnComplete = () => {
    setFilterList({
      ...filterList,
      priceMax,
      priceMin,
    });
    onClose();
  };

  const handleOnReset = () => {
    setFilterList({
      ...filterList,
      priceMax: defaultFilters.priceMax,
      priceMin: defaultFilters.priceMin,
    });
    onClose();
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose}>
      <PicketBox>
        <PicketText>{priceText}</PicketText>
        <PicketBottom src={"/img/picket-bottom.svg"} />
      </PicketBox>
      <MobileFilterText>가격</MobileFilterText>
      <Slider
        range
        min={0}
        max={16000}
        step={1000}
        value={[priceMin, priceMax]}
        defaultValue={[2000, 8000]}
        onChange={([valueMin, valueMax]: [number, number]) => {
          setPriceMin(valueMin);
          setPriceMax(valueMax);
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
