import styled from "styled-components";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ReviewImageSwiper({ images, swiperImagesLimit, imageCount }: { images: string[], swiperImagesLimit: number, imageCount: number }) {
  const OPTIONS: EmblaOptionsType = { loop: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [isContainerSmaller, SetIsContainerSmaller] = useState<boolean>(false);

  useEffect(() => {
    if (emblaApi) {
      const viewportElement = emblaApi.rootNode();
      const containerElement = emblaApi.containerNode();
      const updateWidthComparison = () => {
        const viewportWidth = viewportElement.offsetWidth;
        const containerWidth = containerElement.scrollWidth;
        console.log("viewport:", viewportWidth);
        console.log("container:", containerWidth);
        SetIsContainerSmaller(viewportWidth + 4 >= containerWidth);
      }

      const resizeObserver = new ResizeObserver(updateWidthComparison);
      resizeObserver.observe(viewportElement);
      updateWidthComparison();
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [emblaApi]);

  const onPrevButtonClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Swiper>
      <SwiperViewport ref={emblaRef} isContainerSmaller={isContainerSmaller}>
        <SwiperContainer>
          {images.map((image, index) => (
            <ReviewImageContainer key={image}>
              {
                imageCount > swiperImagesLimit && index === (swiperImagesLimit - 1) &&
                <Link href="#">
                  <MoreImages>+{imageCount - swiperImagesLimit}</MoreImages>
                </Link>
              }
              <ReviewImage src={image} />
            </ReviewImageContainer>
          ))}
        </SwiperContainer>
      </SwiperViewport>
      <PrevButton type="button" onClick={onPrevButtonClick}>
        <Image src="/img/left-arrow-white.svg" alt="왼쪽 화살표" width={14} height={22} />
      </PrevButton>
      <NextButton type="button" onClick={onNextButtonClick}>
        <Image src="/img/right-arrow-white.svg" alt="오른쪽 화살표" width={14} height={22} />
      </NextButton>
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

const SwiperViewport = styled.div<{ isContainerSmaller: boolean }>`
  background-color: #f0f0f0;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${(props) =>
    props.isContainerSmaller
    && `
          display: flex;
          justify-content: center;
        `
  }
`;

const SwiperContainer = styled.div`
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  margin-left: calc(var(--slide-spacing) * -1);
`;

const transitionButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const PrevButton = styled(transitionButton)`
  left: 0;
  margin-left: 24px;
`;

const NextButton = styled(transitionButton)`
  right: 0;
  margin-right: 24px;
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

const MoreImages = styled.button`
  position: absolute;
  height: var(--slide-height);
  width: var(--slide-width);
  background: #D9D9D980;
  border: none;
  box-shadow: none;
  font-weight: 700;
  font-size: 40px;
  color: white;
  cursor: pointer;
`;