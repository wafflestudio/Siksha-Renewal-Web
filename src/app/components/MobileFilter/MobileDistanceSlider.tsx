import Slider from "rc-slider";
import styled from "styled-components";
import MobilePicket from "./MobilePicket";
import { useEffect, useMemo, useRef, useState } from "react";

interface MobileDistanceSliderProps {
  length: number;
  onLengthChange?: (length: number) => void;
}

export default function MobileDistanceSlider({
  length: initialLength,
  onLengthChange,
}: MobileDistanceSliderProps) {
  const [length, setLength] = useState(initialLength);
  const min = 200;
  const max = 1050;

  const picketRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [picketWidth, setPicketWidth] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    if (picketRef.current && sliderRef.current) {
      setPicketWidth(picketRef.current.offsetWidth);
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    setLength(initialLength);
  }, [initialLength]);

  const distanceText = useMemo(() => {
    if (length > 1000) return "1km 이상";
    return length === 1000 ? "1km 이내" : `${length}m 이내`;
  }, [length]);

  let left = ((length - min) / (max - min)) * 100;
  const halfPicketPercent = (picketWidth / sliderWidth) * 50; // 피켓 절반 크기 비율

  // 피켓이 슬라이더를 벗어나지 않도록 제한
  const maxLeft = 100 - halfPicketPercent; // 슬라이더 오른쪽 끝 제한
  const minLeft = halfPicketPercent; // 슬라이더 왼쪽 끝 제한
  left = Math.max(minLeft, Math.min(left, maxLeft));

  const handleSliderChange = (value: number) => {
    onLengthChange?.(value);
    setLength(value);
  };

  return (
    <SliderWrapper ref={sliderRef}>
      <MobilePicket left={left} text={distanceText} ref={picketRef} />
      <StyledSlider
        min={min}
        max={max}
        step={50}
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
