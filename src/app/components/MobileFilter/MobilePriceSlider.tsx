import Slider from "rc-slider";
import styled from "styled-components";
import MobilePicket from "./MobilePicket";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRICE_FILTER_OPTIONS, defaultFilters } from "constants/filterOptions";

interface MobilePriceSliderProps {
  priceRange?: [number, number];
  onPriceRangeChange?: ([priceMin, priceMax]: [number, number]) => void;
}

const { min, max, step } = PRICE_FILTER_OPTIONS;

export default function MobilePriceSlider({
  priceRange: initialPriceRange = [min, max],
  onPriceRangeChange,
}: MobilePriceSliderProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([min, max]);
  const [priceMin, priceMax] = priceRange;

  const picketRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [picketWidth, setPicketWidth] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (picketRef.current && sliderRef.current) {
      setPicketWidth(picketRef.current.offsetWidth);
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, [isMounted]);

  useEffect(() => {
    setPriceRange(initialPriceRange);
  }, [initialPriceRange]);

  const priceText = useMemo(() => {
    const minTxt = priceMin <= min ? `0원` : `${priceMin}원`;
    const maxTxt = max <= priceMax ? `${PRICE_FILTER_OPTIONS.max}원 이상` : `${priceMax}원`;

    return `${minTxt} ~ ${maxTxt}`;
  }, [priceMin, priceMax]);

  const priceMinForLeft = priceMin === 0 ? min : priceMin;
  const priceMaxForLeft = priceMax === Infinity ? max : priceMax;

  const leftMin = ((priceMinForLeft - min) / (max - min)) * 100;
  const leftMax = ((priceMaxForLeft - min) / (max - min)) * 100;
  let center = (leftMin + leftMax) / 2;

  const halfPicketPercent = (picketWidth / sliderWidth) * 50; // 피켓 절반 크기 비율

  // 피켓이 슬라이더를 벗어나지 않도록 제한
  const maxLeft = 100 - halfPicketPercent; // 슬라이더 오른쪽 끝 제한
  const minLeft = halfPicketPercent; // 슬라이더 왼쪽 끝 제한
  center = Math.max(minLeft, Math.min(center, maxLeft));

  const handleSliderChange = ([valueMin, valueMax]: [number, number]) => {
    setPriceRange([valueMin, valueMax]);
    onPriceRangeChange?.([valueMin, valueMax]);
  };

  return (
    <SliderWrapper ref={sliderRef}>
      <MobilePicket left={center} text={priceText} ref={picketRef} />
      <StyledSlider
        range
        min={min}
        max={max}
        step={step}
        value={[priceMin, priceMax]}
        defaultValue={[min, max]}
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
