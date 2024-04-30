import styled from "styled-components";
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import Image from "next/image";

const SWIPER_ALIGNMENT_OFFSET = 90;
/**
 * swiper의 element 정렬 기준축 위치를 조정
 * 기준측이 element의 우측 모서리와 일치하도록 정렬
 * @param viewSize swiper 길이 (스크롤 방향 기준)
 * @param snapSize swiper 내 element 길이 (스크롤 방향 기준)
 * @param index 각 element의 index
 * @returns swiper의 좌측 모서리 기준 기준축의 위치
 */
const setAlignment = (viewSize: number, snapSize: number, index: number) => {
  return viewSize - SWIPER_ALIGNMENT_OFFSET;
};

export default function ReviewImageSwiper({images}: { images: string[]; }) {
  const OPTIONS: EmblaOptionsType = { align: setAlignment, loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const onPrevButtonClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Swiper>
      <SwiperViewport ref={emblaRef}>
        <SwiperContainer>
          {images.map((image, index) => (
            <ReviewImageContainer key={index}>
              <ReviewImage src={image} />
            </ReviewImageContainer>
          ))}
        </SwiperContainer>
      </SwiperViewport>
      <SwiperPrevButton type="button" onClick={onPrevButtonClick}>
        <Image src="/img/left-arrow-white.svg" alt="왼쪽 화살표" />
      </SwiperPrevButton>
      <SwiperNextButton type="button" onClick={onNextButtonClick}>
        <Image src="/img/right-arrow-white.svg" alt="오른쪽 화살표" />
      </SwiperNextButton>
    </Swiper>
  );
}

const Swiper = styled.div`
  position: relative;
  height: var(--slide-height);
  background-color: white;
  @media (max-width: 768px) {
    display: none;
  }

  --slide-height: 438px;
  --slide-width: 417px;
  --slide-spacing: 4px;
`;

const SwiperViewport = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
`;

const SwiperContainer = styled.div`
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
  margin-left: calc(var(--slide-spacing) * -1);
`;

const SwiperPrevButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SwiperNextButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ReviewImageContainer = styled.div`
  height: var(--slide-height);
  flex: 0 0 var(--slide-width);
  min-width: 0;
  padding-left: var(--slide-spacing);
`;

const ReviewImage = styled.img`
  object-fit: cover;
  height: var(--slide-height);
  width: 100%;
`;