import Slider from "rc-slider";
import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import MobilePicket from "./MobilePicket";

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

  useEffect(() => {
    setPriceMax(filterList.priceMax);
  }, [filterList.priceMax]);

  useEffect(() => {
    setPriceMin(filterList.priceMin);
  }, [filterList.priceMin]);

  const handleOnReset = () => {
    setFilterList({
      ...filterList,
      priceMax: defaultFilters.priceMax,
      priceMin: defaultFilters.priceMin,
    });
    onClose();
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} slideBar={false}>
      <MobileFilterText>가격</MobileFilterText>
      <SliderWrapper>
        <MobilePicket text={priceText} />
        <StyledSlider
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
      </SliderWrapper>
      <FilterActionSection marginBottom="45">
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

const SliderWrapper = styled.div`
  position: relative;
  height: 77.5px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const StyledSlider = styled(Slider)`
  .rc-slider-track {
    background-color: var(--Main-Orange, #ff9522);
  }

  .rc-slider-rail {
    background-color: #dbdbdb;
  }

  .rc-slider-handle {
    width: 24px;
    height: 24px;
    margin-top: -10px;
    background-color: var(--Main-Orange, #ff9522);
    border: none;
    box-shadow: none;
  }
`;
