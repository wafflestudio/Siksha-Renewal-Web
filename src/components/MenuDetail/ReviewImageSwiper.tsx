import styled from "styled-components";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import Image from "next/image";

export default function ReviewImageSwiper({ images }: { images: string[] }) {
  const OPTIONS: EmblaOptionsType = { align: 'start', loop: false };
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
        <Image src="/img/left-arrow-white.svg" alt="왼쪽 화살표" width={14} height={22} />
      </SwiperPrevButton>
      <SwiperNextButton type="button" onClick={onNextButtonClick}>
        <Image src="/img/right-arrow-white.svg" alt="오른쪽 화살표" width={14} height={22} />
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
  background-color: #f0f0f0;
  position: absolute;
  display: flex;
  justify-content: center;
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
  width: var(--slide-width);
  flex: 0 0 var(--slide-width);
  min-width: 0;
  padding-left: var(--slide-spacing);
`;

const ReviewImage = styled.img`
  object-fit: cover;
  height: var(--slide-height);
  width: 100%;
`;
