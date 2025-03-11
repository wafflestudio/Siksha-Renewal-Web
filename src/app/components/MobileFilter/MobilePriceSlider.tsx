import Slider from "rc-slider";
import styled from "styled-components";
import MobilePicket from "./MobilePicket";
import { useEffect, useMemo, useRef, useState } from "react";

interface MobilePriceSliderProps {
  priceMin: number;
  priceMax: number;
  onPriceMaxChange?: (priceMax: number) => void;
  onPriceMinChange?: (priceMin: number) => void;
}

export default function MobilePriceSlider({
  priceMin: initialPriceMin,
  priceMax: initialPriceMax,
  onPriceMinChange,
  onPriceMaxChange,
}: MobilePriceSliderProps) {
  const [priceMin, setPriceMin] = useState(initialPriceMin);
  const [priceMax, setPriceMax] = useState(initialPriceMax);
  const min = 0;
  const max = 16000;

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
    setPriceMax(initialPriceMax);
  }, [initialPriceMax]);
  useEffect(() => {
    setPriceMin(initialPriceMin);
  }, [initialPriceMin]);

  const priceText = useMemo(() => {
    const minTxt = `${priceMin}원`;
    const maxTxt = priceMax > 15000 ? "15000원 이상" : `${priceMax}원`;
    return `${minTxt} ~ ${maxTxt}`;
  }, [priceMin, priceMax]);

  const leftMin = ((priceMin - min) / (max - min)) * 100;
  const leftMax = ((priceMax - min) / (max - min)) * 100;
  let center = (leftMin + leftMax) / 2;

  const halfPicketPercent = (picketWidth / sliderWidth) * 50; // 피켓 절반 크기 비율

  // 피켓이 슬라이더를 벗어나지 않도록 제한
  const maxLeft = 100 - halfPicketPercent; // 슬라이더 오른쪽 끝 제한
  const minLeft = halfPicketPercent; // 슬라이더 왼쪽 끝 제한
  center = Math.max(minLeft, Math.min(center, maxLeft));

  const handleSliderChange = ([valueMin, valueMax]: [number, number]) => {
    setPriceMin(valueMin);
    setPriceMax(valueMax);
    onPriceMinChange?.(valueMin);
    onPriceMaxChange?.(valueMax);
  };

  return (
    <SliderWrapper ref={sliderRef}>
      <MobilePicket left={center} text={priceText} ref={picketRef} />
      <StyledSlider
        range
        min={min}
        max={max}
        step={1000}
        value={[priceMin, priceMax]}
        defaultValue={[2000, 8000]}
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
