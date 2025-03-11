import Slider from "rc-slider";
import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import MobilePicket from "./MobilePicket";

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

  useEffect(() => {
    setLength(filterList.length);
  }, [filterList.length]);

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

  const handleSliderChange = (value: number) => {
    setLength(value);
  };

  const min = 200;
  const max = 1050;

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} slideBar={false}>
      <MobileFilterText>거리</MobileFilterText>
      <div style={{ height: 65.5 }} />
      <SliderWrapper>
        {/* 움직이는 Picket */}
        <StyledSlider
          min={min}
          max={max}
          step={50}
          value={length}
          defaultValue={max}
          onChange={handleSliderChange}
          handleRender={(node, props) => {
            const left = ((props.value - min) / (max - min)) * 100;
            return (
              <div style={{ position: "relative" }}>
                <MobilePicket left={left} text={distanceText} />
                {node}
              </div>
            );
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
  height: 67px;
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
