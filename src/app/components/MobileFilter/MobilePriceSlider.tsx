import Slider from "rc-slider";
import styled from "styled-components";
import MobilePicket from "./MobilePicket";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRICE_FILTER_OPTIONS } from "constants/filterOptions";

interface MobilePriceSliderProps {
  priceRange?: [number, number];
  onPriceRangeChange?: ([priceMin, priceMax]: [number, number]) => void;
}

const { val_zero, min, max, val_infinity, step } = PRICE_FILTER_OPTIONS;

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

  useEffect(() => {
    if (picketRef.current && sliderRef.current) {
      setPicketWidth(picketRef.current.offsetWidth);
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    setPriceRange(initialPriceRange);
  }, [initialPriceRange]);

  const priceText = useMemo(() => {
    const minTxt = `${priceMin}원`;
    const maxTxt = `${priceMax}원`;
    if (priceMin <= val_zero && val_infinity <= priceMax) {
      return "가격 범위 없음";
    }

    if (priceMin <= val_zero) {
      return `${maxTxt} 이하`;
    }

    if (val_infinity <= priceMax) {
      return `${minTxt} 이상`;
    }

    return `${minTxt} ~ ${maxTxt}`;
  }, [priceMin, priceMax]);

  const leftMin = ((priceMin - val_zero) / (val_infinity - val_zero)) * 100;
  const leftMax = ((priceMax - val_zero) / (val_infinity - val_zero)) * 100;
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
        min={val_zero}
        max={val_infinity}
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
    background-color: var(--Main-Orange, #ff9522);
  }

  .rc-slider-rail {
    background-color: #dbdbdb;
  }

  .rc-slider-handle {
    width: 18px;
    height: 18px;
    margin-top: -7px;
    background-color: var(--Main-Orange, #ff9522);
    border: none;
    box-shadow: none;
  }
`;
