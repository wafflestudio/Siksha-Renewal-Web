import Slider from "rc-slider";
import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useEffect, useMemo, useState } from "react";
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
  const [handleLeft, setHandleLeft] = useState(0);

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
    requestAnimationFrame(() => {
      const slider = document.querySelector(".rc-slider") as HTMLElement;
      const handle = document.querySelector(".rc-slider-handle") as HTMLElement;
      if (slider && handle) {
        const sliderRect = slider.getBoundingClientRect();
        const handleRect = handle.getBoundingClientRect();
        const left = handleRect.left - sliderRect.left;
        console.debug(left);
        setHandleLeft(left);
      }
    });
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} slideBar={false}>
      <MobileFilterText>거리</MobileFilterText>
      <SliderWrapper>
        {/* 움직이는 Picket */}
        <PicketBox left={handleLeft}>
          <PicketText>{distanceText}</PicketText>
          <PicketBottom src={"/img/picket-bottom.svg"} />
        </PicketBox>

        <StyledSlider
          min={200}
          max={1050}
          step={50}
          value={length}
          defaultValue={1050}
          onChange={handleSliderChange}
        />
      </SliderWrapper>
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

const PicketText = styled.div`
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: var(--Color-Foundation-gray-100, #f0f0f0);
  color: var(--Color-Foundation-gray-800, #707070);

  text-align: center;
  font-size: var(--Font-size-12, 12px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 15.4px */
`;

const PicketBottom = styled.img`
  width: 6px;
  height: 5px;
  fill: var(--Color-Foundation-gray-100, #f0f0f0);
`;

const PicketBox = styled.div<{ left: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* left: ${({ left }) => `${left}px`};
  top: -10px;
  position: absolute; */
`;
