import Slider from "rc-slider";
import styled from "styled-components";
import WebPicket from "./WebPicket";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRICE_FILTER_OPTIONS } from "constants/filterOptions";

interface WebPriceSliderProps {
  priceRange?: [number, number];
  onPriceRangeChange?: ([priceMin, priceMax]: [number, number]) => void;
}

const { min, max, step } = PRICE_FILTER_OPTIONS;

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
  }, [priceRange]);

  useEffect(() => {
    setPriceRange(initialPriceRange);
  }, [initialPriceRange]);

  const priceText = useMemo(() => {
    const minTxt = priceMin <= min ? `0원` : `${priceMin}원`;
    const maxTxt = max <= priceMax ? `${PRICE_FILTER_OPTIONS.max}원 이상` : `${priceMax}원`;

    return `${minTxt} ~ ${maxTxt}`;
  }, [priceMin, priceMax]);

  const pickettailPos = useMemo(() => {
    const priceMinForLeft = priceMin === 0 ? min : priceMin;
    const priceMaxForLeft = priceMax === Infinity ? max : priceMax;

    const leftMin = ((priceMinForLeft - min) / (max - min)) * 100;
    const leftMax = ((priceMaxForLeft - min) / (max - min)) * 100;

    return (leftMin + leftMax) / 2;
  }, [priceMin, priceMax]);

  const picketbodyPos = useMemo(() => {
    const halfPicketPercent = (picketWidth / sliderWidth) * 50; // 피켓 절반 크기 비율
    const halfHandlePercent = (16 / sliderWidth) * 50; // 슬라이더 핸들 절반 크기 비율
  
    // 피켓이 슬라이더를 벗어나지 않도록 제한
    const maxLeft = 100 - halfPicketPercent + halfHandlePercent; // 슬라이더 오른쪽 끝 제한
    const minLeft = halfPicketPercent - halfHandlePercent; // 슬라이더 왼쪽 끝 제한
    return Math.max(minLeft, Math.min(pickettailPos, maxLeft));
  }, [picketWidth, sliderWidth, pickettailPos]);

  const handleSliderChange = ([valueMin, valueMax]: [number, number]) => {
    // 최소 간격 유지
    if (valueMax - valueMin < step) {
      if (valueMin === priceRange[0]) {
        valueMax = valueMin + step;
      } else {
        valueMin = valueMax - step;
      }
    }

    setPriceRange([valueMin, valueMax]);
    onPriceRangeChange?.([valueMin, valueMax]);
  };

  return (
    <SliderWrapper ref={sliderRef}>
      <WebPicket bodyPos={picketbodyPos} tailPos={pickettailPos} text={priceText} ref={picketRef} />
      <StyledSlider
        range
        min={min}
        max={max}
        step={step}
        value={[priceMin, priceMax]}
        defaultValue={[min, max]}
        onChange={handleSliderChange}
        allowCross={false}
      />
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  position: relative;
  width: 248px;
  display: flex;
  margin-top: 28px;
  margin-left: 4px;
  margin-right: 8px;
  gap: 6.5px;
`;

const StyledSlider = styled(Slider)`
`;
