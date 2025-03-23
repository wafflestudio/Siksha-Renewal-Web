import Slider from "rc-slider";
import styled from "styled-components";
import WebPicket from "./WebPicket";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRICE_FILTER_OPTIONS } from "constants/filterOptions";

interface WebPriceSliderProps {
  priceRange?: [number, number];
  onPriceRangeChange?: ([priceMin, priceMax]: [number, number]) => void;
}

const { val_zero, min, max, val_infinity, step } = PRICE_FILTER_OPTIONS;

export default function WebPriceSlider({
  priceRange: initialPriceRange = [min, max],
  onPriceRangeChange,
}: WebPriceSliderProps) {
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

  const priceMinForLeft = priceMin === 0 ? val_zero : priceMin;
  const priceMaxForLeft = priceMax === Infinity ? val_infinity : priceMax;

  const leftMin = ((priceMinForLeft - val_zero) / (val_infinity - val_zero)) * 100;
  const leftMax = ((priceMaxForLeft - val_zero) / (val_infinity - val_zero)) * 100;
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
      <WebPicket left={center} text={priceText} ref={picketRef} />
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
  width: 100%;
  display: flex;
  margin-top: 28px;
  gap: 6.5px;
`;

const StyledSlider = styled(Slider)`
  margin: auto 10px auto auto;
`;
