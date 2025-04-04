import Slider from "rc-slider";
import styled from "styled-components";
import MobilePicket from "./MobilePicket";
import { useEffect, useMemo, useRef, useState } from "react";
import { DISTANCE_FILTER_OPTIONS } from "constants/filterOptions";

interface MobileDistanceSliderProps {
  length: number;
  onLengthChange?: (length: number) => void;
}

const { min, max, val_infinity, step } = DISTANCE_FILTER_OPTIONS;

export default function MobileDistanceSlider({
  length: initialLength,
  onLengthChange,
}: MobileDistanceSliderProps) {
  const [length, setLength] = useState(initialLength);

  const picketRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [picketWidth, setPicketWidth] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  function updateDimensions() {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.clientWidth);
    }
    if (picketRef.current) {
      setPicketWidth(picketRef.current.clientWidth);
    }
  }

  // Calculate dimensions after mount and window resize
  useEffect(() => {    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const timeoutId = setTimeout(updateDimensions, 0);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    updateDimensions();
  }, [length]);

  useEffect(() => {
    setLength(initialLength);
  }, [initialLength]);

  const distanceText = useMemo(() => {
    if (val_infinity <= length) {
      return `1km 이상`;
    }
    return length === 1000 ? "1km 이내" : `${length}m 이내`;
  }, [length]);

  const pickettailPos = useMemo(() => {
    const lengthForLeft = length === Infinity ? val_infinity : length;
    return ((lengthForLeft - min) / (val_infinity - min)) * 100;
  }, [length]);

  const picketbodyPos = useMemo(() => {
    const halfPicketPercent = (picketWidth / sliderWidth) * 50; // 피켓 절반 크기 비율
    const halfHandlePercent = (16 / sliderWidth) * 50; // 슬라이더 핸들 절반 크기 비율
  
    // 피켓이 슬라이더를 벗어나지 않도록 제한
    const maxLeft = 100 - halfPicketPercent + halfHandlePercent; // 슬라이더 오른쪽 끝 제한
    const minLeft = halfPicketPercent - halfHandlePercent; // 슬라이더 왼쪽 끝 제한
    return Math.max(minLeft, Math.min(pickettailPos, maxLeft));
  }, [picketWidth, sliderWidth, pickettailPos]);

  const handleSliderChange = (value: number) => {
    onLengthChange?.(value);
    setLength(value);
  };

  return (
    <SliderWrapper ref={sliderRef}>
      <MobilePicket bodyPos={picketbodyPos} tailPos={pickettailPos} text={distanceText} ref={picketRef} />
      <StyledSlider
        min={min}
        max={val_infinity}
        step={step}
        value={length}
        defaultValue={max}
        onChange={handleSliderChange}
      />
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin: 0 10px;
`;

const StyledSlider = styled(Slider)`
  .rc-slider-track {
    background-color: var(--Color-Foundation-orange-500, #ff9522);
  }

  .rc-slider-rail {
    background-color: #dbdbdb;
  }

  .rc-slider-handle {
    width: 18px;
    height: 18px;
    margin-top: -7px;
    background-color: var(--Color-Foundation-orange-500, #ff9522);
    border: none;
    box-shadow: none;
  }
`;
